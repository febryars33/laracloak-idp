import React, { useState } from "react";
import {
    Box,
    Container,
    Flex,
    Heading,
    Separator,
    Stack,
} from "@chakra-ui/react";
import Topbar from "@/components/partials/topbar";
import Navbar from "@/components/partials/navbar";
import Footer from "@/components/partials/footer";

// 1. Definisikan tipe untuk menu navigasi settings
interface NavItem {
    id: string;
    label: string;
}

// 2. Data menu navigasi (DRY & Mudah di-extend)
const SETTINGS_MENU: NavItem[] = [
    { id: "personal", label: "Informasi Personal" },
    { id: "password", label: "Password & Security" },
    { id: "notifications", label: "Notifications" },
    { id: "billing", label: "Billing & Plans" },
];

interface SettingsLayoutProps {
    children: React.ReactNode;
    activeMenu?: string;
    onMenuChange?: (menuId: string) => void;
}

export default function SettingsLayout({
    children,
    activeMenu = "personal",
    onMenuChange,
}: SettingsLayoutProps) {
    const [open, setOpen] = useState<boolean>(false);

    return (
        <Flex minH="100dvh" direction="column" bg="bg.panel" color="fg">
            {/* Main Header / Topbar Area */}
            <Topbar onMenu={() => setOpen(true)} />
            <Navbar open={open} onClose={() => setOpen(false)} />

            {/* Main Content Area */}
            <Box as="main" flex="1" w="full" py={{ base: 6, md: 8 }}>
                <Container maxW="7xl" px={{ base: 4, md: 6 }}>
                    {/* Header Settings ala GitHub */}
                    <Box mb={6}>
                        <Heading size="2xl" letterSpacing="tight">
                            Pengaturan
                        </Heading>
                    </Box>
                    <Separator mb={6} />

                    {/* Layout Split: Sidebar & Main Content Area */}
                    <Flex direction={{ base: "column", md: "row" }} gap={8}>
                        {/* Sidebar Navigation */}
                        <Box as="nav" w={{ base: "full", md: "240px" }}>
                            <Stack
                                gap={1}
                                direction={{ base: "row", md: "column" }}
                                overflowX="auto"
                            >
                                {SETTINGS_MENU.map((item) => {
                                    const isActive = item.id === activeMenu;
                                    return (
                                        <Box
                                            key={item.id}
                                            as="button"
                                            onClick={() =>
                                                onMenuChange?.(item.id)
                                            }
                                            textAlign="left"
                                            whiteSpace="nowrap"
                                            w="full"
                                            px={3}
                                            py={2}
                                            textStyle="sm"
                                            fontWeight={
                                                isActive ? "medium" : "normal"
                                            }
                                            rounded="md"
                                            bg={
                                                isActive
                                                    ? "bg.muted"
                                                    : "transparent"
                                            }
                                            color={isActive ? "fg" : "fg.muted"}
                                            _hover={{
                                                bg: isActive
                                                    ? "bg.muted"
                                                    : "bg.subtle",
                                                color: "fg",
                                            }}
                                            _focusVisible={{
                                                outline: "2px solid",
                                                outlineColor: "focusRing",
                                            }}
                                            transition="all 0.2s"
                                        >
                                            {item.label}
                                        </Box>
                                    );
                                })}
                            </Stack>
                        </Box>

                        {/* Settings Form/Content View */}
                        <Box flex="1" maxW={{ md: "4xl" }} w="full">
                            {children}
                        </Box>
                    </Flex>
                </Container>
            </Box>

            <Footer />
        </Flex>
    );
}
