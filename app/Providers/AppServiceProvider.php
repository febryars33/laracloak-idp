<?php

namespace App\Providers;

use App\Listeners\LogoutListener;
use App\Models\Passport\Client;
use Carbon\CarbonImmutable;
use Illuminate\Auth\Events\Logout;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Date;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Event;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\URL;
use Illuminate\Support\ServiceProvider;
use Illuminate\Validation\Rules\Password;
use Laravel\Passport\Passport;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Model::shouldBeStrict(! app()->isProduction());

        $this->configureDefaults();
        $this->https();

        Passport::useClientModel(Client::class);
        Passport::authorizationView('auth.authorize');
        Passport::tokensCan(config('openid.passport.tokens_can'));

        Event::listen(Logout::class, LogoutListener::class);

        $this->administrator();
    }

    /**
     * Configure default behaviors for production-ready applications.
     */
    protected function configureDefaults(): void
    {
        Date::use(CarbonImmutable::class);

        DB::prohibitDestructiveCommands(
            app()->isProduction(),
        );

        Password::defaults(fn (): ?Password => app()->isProduction()
            ? Password::min(12)
                ->mixedCase()
                ->letters()
                ->numbers()
                ->symbols()
                ->uncompromised()
            : null,
        );
    }

    protected function administrator()
    {
        Gate::before(function ($user) {
            return $user->hasRole('administrator') ? true : null;
        });
    }

    protected function https()
    {
        if (app()->isProduction()) {
            URL::forceScheme('https');
        }
    }
}
