import { Head, Link } from "@inertiajs/react";
import { Button, Field, Input, Stack } from "@chakra-ui/react";

import Layout from "@/layouts/auth";
import { login } from "@/routes";
import { toaster } from "@/components/ui/toaster";

export default function Page() {
    return (
        <Layout
            title="Lupa Password"
            subtitle="Masukkan email Anda untuk menerima link reset password"
        >
            <Head title="Lupa Password" />

            <form>
                <Stack spaceY={4}>
                    {/* Email Field */}
                    <Field.Root>
                        <Field.Label>Alamat Email</Field.Label>
                        <Input type="email" />
                    </Field.Root>
                </Stack>

                <Stack spaceY={2} mt={4}>
                    {/* Submit Button */}
                    <Button
                        colorPalette="teal"
                        w="full"
                        onClick={() => {
                            toaster.create({
                                title: "Terjadi Kesalahan",
                                description:
                                    "Maaf, saat ini Lupa Password hanya dapat dilakukan oleh Operator Sekolah.",
                                closable: true,
                                type: "error",
                            });
                        }}
                    >
                        Kirim Link Pemulihan
                    </Button>
                    <Button variant="subtle" asChild>
                        <Link href={login()}>Kembali</Link>
                    </Button>
                </Stack>
            </form>
        </Layout>
    );
}
