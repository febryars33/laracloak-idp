import React, { useState } from "react";
import { Box, Container, Flex } from "@chakra-ui/react";
import Topbar from "@/components/partials/topbar";
import Navbar from "@/components/partials/navbar";
import Footer from "@/components/partials/footer";

export default function Layout({ children }: { children: React.ReactNode }) {
    const [open, setOpen] = useState(false);

    return (
        <Flex minH="100dvh" direction="column" bg="bg.panel" color="fg">
            <Topbar onMenu={() => setOpen(true)} />

            <Navbar open={open} onClose={() => setOpen(false)} />

            <Box as="main" flex="1" w="full" py={{ base: 6, md: 8 }}>
                <Container maxW="7xl" px={{ base: 4, md: 6 }}>
                    {children}
                </Container>
            </Box>

            <Footer />
        </Flex>
    );
}
