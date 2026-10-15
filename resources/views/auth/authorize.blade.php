<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Otorisasi Aplikasi - {{ config('app.name') }}</title>
    <style>
        body {
            font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
            background-color: #f7fafc;
            color: #2d3748;
            display: flex;
            align-items: center;
            justify-content: center;
            min-height: 100vh;
            margin: 0;
            padding: 1rem;
        }
        .card {
            background: #ffffff;
            border-radius: 0.75rem;
            box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
            max-width: 28rem;
            width: 100%;
            padding: 2rem;
            box-sizing: border-box;
        }
        .header {
            text-align: center;
            margin-bottom: 1.5rem;
        }
        .title {
            font-size: 1.25rem;
            font-weight: 700;
            color: #1a202c;
            margin: 0;
        }
        .subtitle {
            font-size: 0.875rem;
            color: #718096;
            margin-top: 0.5rem;
        }
        .client-name {
            color: #319795;
            font-weight: 600;
        }
        .scope-list {
            list-style: none;
            padding: 0;
            margin: 1.5rem 0;
            border-top: 1px solid #e2e8f0;
            border-bottom: 1px solid #e2e8f0;
            padding: 1rem 0;
        }
        .scope-item {
            font-size: 0.875rem;
            color: #4a5568;
            padding: 0.375rem 0;
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }
        .scope-bullet {
            width: 6px;
            height: 6px;
            background-color: #319795;
            border-radius: 50%;
            display: inline-block;
        }
        .actions {
            display: flex;
            gap: 0.75rem;
            margin-top: 1.5rem;
        }
        .btn {
            flex: 1;
            padding: 0.625rem 1rem;
            border-radius: 0.375rem;
            font-size: 0.875rem;
            font-weight: 600;
            cursor: pointer;
            border: none;
            text-align: center;
            transition: opacity 0.2s;
        }
        .btn-approve {
            background-color: #319795;
            color: #ffffff;
        }
        .btn-deny {
            background-color: #edf2f7;
            color: #4a5568;
        }
        .btn:hover {
            opacity: 0.9;
        }
    </style>
</head>
<body>
    <div class="card">
        <div class="header">
            <h1 class="title">Otorisasi Akses</h1>
            <p class="subtitle">
                Aplikasi <span class="client-name">{{ $client->name }}</span> meminta izin untuk mengakses akun Anda ({{ $user->email }}).
            </p>
        </div>

        @if (count($scopes) > 0)
            <div style="font-size: 0.875rem; font-weight: 600; color: #4a5568;">Izin yang diminta:</div>
            <ul class="scope-list">
                @foreach ($scopes as $scope)
                    <li class="scope-item">
                        <span class="scope-bullet"></span>
                        <span>{{ $scope->description }}</span>
                    </li>
                @endforeach
            </ul>
        @endif

        <div class="actions">
            <form method="POST" action="{{ route('passport.authorizations.deny') }}" style="flex: 1;">
                @csrf
                @method('DELETE')
                <input type="hidden" name="state" value="{{ $request->state }}">
                <input type="hidden" name="client_id" value="{{ $client->id }}">
                <input type="hidden" name="auth_token" value="{{ $authToken }}">
                <button type="submit" class="btn btn-deny" style="width: 100%;">Tolak</button>
            </form>

            <form method="POST" action="{{ route('passport.authorizations.approve') }}" style="flex: 1;">
                @csrf
                <input type="hidden" name="state" value="{{ $request->state }}">
                <input type="hidden" name="client_id" value="{{ $client->id }}">
                <input type="hidden" name="auth_token" value="{{ $authToken }}">
                <button type="submit" class="btn btn-approve" style="width: 100%;">Izinkan</button>
            </form>
        </div>
    </div>
</body>
</html>

