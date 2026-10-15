<?php

namespace App\Http\Responses;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;
use Inertia\Inertia;
use Laravel\Fortify\Contracts\LoginResponse as Contracts;
use Override;
use Symfony\Component\HttpFoundation\Response;

class LoginResponse implements Contracts
{
    /**
     * Create an HTTP response that represents the object.
     *
     * @param  Request  $request
     * @return Response
     */
    #[Override]
    public function toResponse($request)
    {
        $intended = Session::get('url.intended');

        if ($intended && str_contains($intended, '/oauth/authorize')) {
            Session::forget('url.intended');

            return Inertia::location($intended);
        }

        return $request->wantsJson()
            ? response()->json(['two_factor' => false])
            : to_route('home');
    }
}
