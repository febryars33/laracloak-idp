import { Button, Container } from "@chakra-ui/react";
import { useForm, usePage } from "@inertiajs/react";
import { SubmitEvent } from "react";

interface Client {
    id: string;
    name: string;
    redirect: string;
}

interface User {
    id: number;
    email: string;
    name?: string;
    [key: string]: unknown;
}

interface PassportRequest {
    auth_token: string;
}

interface PageProps {
    client: Client;
    user: User;
    request: PassportRequest;
    [key: string]: unknown;
}

export default function Page() {
    const { client, request } = usePage<PageProps>().props;

    const urlParams = new URLSearchParams(window.location.search);
    const nonce = urlParams.get("nonce") || "";

    const {
        post,
        delete: destroy,
        processing,
    } = useForm({
        client_id: client.id,
        auth_token: request.auth_token,
    });

    const handleApprove = (e: SubmitEvent) => {
        e.preventDefault();
        const approveUrl = nonce
            ? `/oauth/authorize?nonce=${encodeURIComponent(nonce)}`
            : "/oauth/authorize";
        post(approveUrl);
    };

    const handleDeny = (e: SubmitEvent) => {
        e.preventDefault();
        destroy("/oauth/authorize");
    };

    return (
        <Container as="main">
            <form onSubmit={handleDeny}>
                <Button
                    type="submit"
                    variant="surface"
                    colorPalette="red"
                    disabled={processing}
                >
                    Tolak
                </Button>
            </form>

            <form onSubmit={handleApprove}>
                <Button
                    type="submit"
                    variant="surface"
                    colorPalette="green"
                    disabled={processing}
                >
                    {processing ? "Memproses..." : "Izinkan"}
                </Button>
            </form>
        </Container>
    );
}
