import { Box, Container, Flex, Text } from "@chakra-ui/react";

export default function Footer() {
    return (
        <Box as="footer" bg="bg">
            <Container maxW="7xl" px={{ base: 4, md: 6 }} py="5">
                <Flex
                    direction={{ base: "column", sm: "row" }}
                    align={{ base: "flex-start", sm: "center" }}
                    justify="space-between"
                    gap="2"
                >
                    <Text fontSize="sm" color="fg.muted">
                        © {new Date().getFullYear()} Snairbef Technology
                    </Text>

                    <Text fontSize="sm" color="fg.muted">
                        Akses aman ke identitas digital Anda.
                    </Text>
                </Flex>
            </Container>
        </Box>
    );
}
