<?php

namespace App\Http\Controllers\OpenIDConnect;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class LogoutController extends Controller
{
    /**
     * Handle OpenID Connect RP-Initiated Logout.
     */
    public function __invoke(Request $request): RedirectResponse
    {
        $this->logout($request);

        $target = $request->query('post_logout_redirect_uri');
        $state = $request->query('state');

        if ($target) {
            return $this->redirect($target, $state);
        }

        return redirect()->route('login');
    }

    /**
     * Invalidate current user session.
     */
    protected function logout(Request $request): void
    {
        if (Auth::guard('web')->check()) {
            Auth::guard('web')->logout();

            $request->session()->invalidate();
            $request->session()->regenerateToken();
        }
    }

    /**
     * Redirect to client destination.
     */
    protected function redirect(string $target, ?string $state): RedirectResponse
    {
        if ($state) {
            $separator = str_contains($target, '?') ? '&' : '?';
            $target .= $separator.http_build_query(['state' => $state]);
        }

        return redirect()->away($target);
    }
}
