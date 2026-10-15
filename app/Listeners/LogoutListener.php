<?php

namespace App\Listeners;

use App\Models\User;
use App\Services\LogoutService;
use Illuminate\Auth\Events\Logout;

class LogoutListener
{
    public function __construct(
        protected LogoutService $service,
    ) {}

    /**
     * Handle the logout event.
     */
    public function handle(Logout $event): void
    {
        $user = $event->user;

        if ($user instanceof User) {
            $this->service->notify($user);
        }
    }
}
