import { Head } from "@inertiajs/react";
import { Box, Flex, Heading, Stack, Text } from "@chakra-ui/react";
import Layout from "@/layouts/settings";
interface Props {
    title?: string;
    description?: string;
}
export default function Page({
    title = "Informasi Personal",
    description = "Add a short description for this page.",
}: Props) {
    return (
        <Layout>
            <Head title={title} />

            <Stack gap={{ base: 6, md: 8 }}>
                <Flex
                    direction={{ base: "column", sm: "row" }}
                    align={{ base: "flex-start", sm: "center" }}
                    justify="space-between"
                    gap="4"
                >
                    <Box minW="0">
                        <Heading
                            size={{ base: "xl", md: "2xl" }}
                            letterSpacing="tight"
                        >
                            {title}
                        </Heading>
                        {description && (
                            <Text
                                mt="2"
                                color="fg.muted"
                                fontSize="sm"
                                lineHeight="tall"
                                maxW="2xl"
                            >
                                {description}
                            </Text>
                        )}
                    </Box>
                </Flex>

                {/* Add your page content here. */}
            </Stack>
        </Layout>
    );
}
