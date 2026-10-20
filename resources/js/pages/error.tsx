import { home } from "@/routes";
import { Box, Button, VStack, EmptyState, Text } from "@chakra-ui/react";
import { Head, Link } from "@inertiajs/react";
import { LuCompass } from "react-icons/lu";

export default function Page() {
    return (
        <>
            <Head title="Halaman Tidak Ditemukan" />
            <Box
                as="main"
                display="flex"
                alignItems="center"
                justifyContent="center"
                minHeight="100vh"
                position="relative"
                overflow="hidden"
                px={4}
            >
                <Text
                    position="absolute"
                    fontSize={{ base: "12rem", md: "20rem" }}
                    fontWeight="black"
                    lineHeight="none"
                    color="border.muted/30"
                    userSelect="none"
                    zIndex={0}
                >
                    404
                </Text>

                {/* Konten Utama */}
                <EmptyState.Root size="lg" maxW="md" zIndex={1}>
                    <EmptyState.Content>
                        <EmptyState.Indicator color="colorPalette.solid">
                            <LuCompass size="2.5rem" />
                        </EmptyState.Indicator>

                        <VStack textAlign="center" spaceY={2} mt={4}>
                            <EmptyState.Title fontSize="2xl" fontWeight="bold">
                                Halaman Tidak Ditemukan
                            </EmptyState.Title>
                            <EmptyState.Description color="fg.muted">
                                Maaf, halaman yang Anda cari tidak ada atau
                                telah dipindahkan ke alamat lain.
                            </EmptyState.Description>
                        </VStack>

                        <Button asChild size="md" mt={6} fontWeight="medium">
                            <Link href={home()}>Kembali ke Beranda</Link>
                        </Button>
                    </EmptyState.Content>
                </EmptyState.Root>
            </Box>
        </>
    );
}
