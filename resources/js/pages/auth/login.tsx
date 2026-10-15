import React from "react";
import { Head, useForm, Link } from "@inertiajs/react";
import {
    Button,
    Field,
    Input,
    Stack,
    Checkbox,
    Flex,
    IconButton,
    Link as ChakraLink,
    Image,
} from "@chakra-ui/react";

import Layout from "@/layouts/auth";
import { login } from "@/routes";
import password from "@/routes/password";
import { PasswordInput } from "@/components/ui/password-input";

export default function Page() {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: "",
        password: "",
        remember: false,
    });

    const submit = (e: React.SubmitEvent) => {
        e.preventDefault();

        post(login().url, {
            onFinish: () => reset("password"),
        });
    };

    return (
        <Layout
            title="Selamat Datang"
            subtitle="Silakan masuk ke akun Anda untuk melanjutkan"
        >
            <Head title="Login" />

            <form onSubmit={submit}>
                <Stack spaceY={4}>
                    {/* Email Field */}
                    <Field.Root invalid={!!errors.email}>
                        <Field.Label>Alamat Email</Field.Label>
                        <Input
                            type="email"
                            value={data.email}
                            onChange={(e) => setData("email", e.target.value)}
                        />
                        {errors.email && (
                            <Field.ErrorText>{errors.email}</Field.ErrorText>
                        )}
                    </Field.Root>

                    {/* Password Field */}
                    <Field.Root invalid={!!errors.password}>
                        <Field.Label>Kata Sandi</Field.Label>
                        <PasswordInput
                            value={data.password}
                            onChange={(e) =>
                                setData("password", e.target.value)
                            }
                        />
                        {errors.password && (
                            <Field.ErrorText>{errors.password}</Field.ErrorText>
                        )}
                    </Field.Root>

                    {/* Remember Me & Forgot Password */}
                    <Flex align="center" justify="space-between" fontSize="sm">
                        <Checkbox.Root
                            checked={data.remember}
                            onCheckedChange={(details) =>
                                setData("remember", !!details.checked)
                            }
                        >
                            <Checkbox.HiddenInput />
                            <Checkbox.Control />
                            <Checkbox.Label>Ingat saya</Checkbox.Label>
                        </Checkbox.Root>

                        {/* Navigasi Menggunakan Objek Objek Wayfinder */}
                        <ChakraLink
                            asChild
                            color="teal.600"
                            fontWeight="medium"
                        >
                            <Link href={password.request()}>Lupa sandi?</Link>
                        </ChakraLink>
                    </Flex>
                </Stack>

                <Stack spaceY={2} mt={4}>
                    <Button
                        type="submit"
                        colorPalette="teal"
                        loading={processing}
                        w="full"
                    >
                        Masuk
                    </Button>

                    <IconButton variant="subtle">
                        <Image
                            src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg"
                            height="18px"
                        />
                        Login dengan Google
                    </IconButton>
                </Stack>
            </form>
        </Layout>
    );
}
