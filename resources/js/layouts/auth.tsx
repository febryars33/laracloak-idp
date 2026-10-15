import React from "react";
import {
    Box,
    Flex,
    Center,
    Heading,
    Text,
    Stack,
    Image,
} from "@chakra-ui/react";
import { ColorModeButton } from "@/components/ui/color-mode";
import { Toaster } from "@/components/ui/toaster";

interface AuthLayout {
    children: React.ReactNode;
    title?: string;
    subtitle?: string;
}

export default function Layout({ children, title, subtitle }: AuthLayout) {
    return (
        <>
            {/* Tombol Toggle Tema: Diposisikan absolut di pojok kanan atas layar */}
            <Box position="fixed" top="4" right="4" zIndex="popover">
                <ColorModeButton variant="subtle" />
            </Box>

            <Flex
                minH="100vh"
                direction={{ base: "column", md: "row" }}
                bg="bg.canvas"
            >
                {/* Sisi Kiri: Form Konten */}
                <Center flex="1" p={{ base: 6, md: 12 }}>
                    <Container maxW="md" p={0}>
                        <Stack spaceY={6} w="full">
                            <Box
                                display="flex"
                                justifyContent={{
                                    base: "center",
                                    md: "flex-start",
                                }}
                            >
                                <Image
                                    src="https://cdn-smaspgri1bandung.febrian.site/build/assets/CpZzgicW.png" // Sesuaikan dengan path file PNG Anda di folder public
                                    alt="Logo Aplikasi"
                                    h="20"
                                    fit="contain"
                                />
                            </Box>

                            {(title || subtitle) && (
                                <Stack
                                    textAlign={{ base: "center", md: "left" }}
                                >
                                    {title && (
                                        <Heading
                                            size="3xl"
                                            letterSpacing="tight"
                                        >
                                            {title}
                                        </Heading>
                                    )}
                                    {subtitle && (
                                        <Text color="fg.muted">{subtitle}</Text>
                                    )}
                                </Stack>
                            )}
                            {children}
                        </Stack>
                    </Container>
                </Center>

                {/* Sisi Kanan: Panel Info Banner (Hanya muncul di Desktop) */}
                <Box
                    flex="1"
                    bg="bg.muted"
                    position="relative"
                    display={{ base: "none", md: "flex" }}
                    alignItems="center"
                    justifyContent="center"
                >
                    <Stack spaceY={2} color="white" p={12} maxW="xl" zIndex={1}>
                        <Heading
                            size="4xl"
                            fontWeight="bold"
                            letterSpacing="tight"
                            color="bg.inverted"
                        >
                            Akses Terintegrasi
                        </Heading>
                        <Text fontSize="sm" color="bg.inverted">
                            Satu kredensial, akses instan ke seluruh ekosistem
                            aplikasi kerja Anda dengan aman tanpa perlu login
                            berulang kali.
                        </Text>
                    </Stack>
                </Box>
            </Flex>

            <Toaster />
        </>
    );
}

// Komponen Container Sederhana internal
const Container = ({ children, maxW, ...props }: any) => (
    <Box maxW={maxW} w="full" mx="auto" {...props}>
        {children}
    </Box>
);
