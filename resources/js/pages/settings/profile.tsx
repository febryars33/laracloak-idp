import { Head, usePage } from "@inertiajs/react";
import {
    Box,
    Card,
    Field,
    Flex,
    Heading,
    Input,
    InputGroup,
    Separator,
    Stack,
    Text,
} from "@chakra-ui/react";
import Layout from "@/layouts/settings";
import { LuMail, LuPhone, LuUser } from "react-icons/lu";
import { withMask } from "use-mask-input";
interface Props {
    title?: string;
    description?: string;
}
export default function Page({
    title = "Informasi Personal",
    description = "Add a short description for this page.",
}: Props) {
    const {
        props,
        props: {
            auth: { user },
        },
    } = usePage();
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

                <Field.Root>
                    <Field.Label>Nama Lengkap</Field.Label>
                    <InputGroup startElement={<LuUser />}>
                        <Input type="text" value={user.name} variant="subtle" />
                    </InputGroup>
                </Field.Root>

                <Field.Root>
                    <Field.Label>Alamat Email</Field.Label>
                    <InputGroup startElement={<LuMail />}>
                        <Input
                            type="email"
                            value={user.email}
                            readOnly
                            disabled
                            variant="subtle"
                        />
                    </InputGroup>
                    <Field.HelperText>
                        Silahkan hubungi operator untuk dapat mengubah alamat
                        email.
                    </Field.HelperText>
                </Field.Root>

                <Field.Root>
                    <Field.Label>No. Telepon</Field.Label>
                    <InputGroup startElement={<LuPhone />}>
                        <Input
                            variant="subtle"
                            ref={withMask("9999-9999-9999[9]")}
                        />
                    </InputGroup>
                </Field.Root>
            </Stack>
        </Layout>
    );
}
