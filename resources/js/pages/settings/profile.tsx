import { Head, useForm, usePage } from "@inertiajs/react";
import {
    Box,
    Button,
    Code,
    Field,
    Fieldset,
    Flex,
    Heading,
    Input,
    InputGroup,
    Stack,
    Text,
} from "@chakra-ui/react";
import Layout from "@/layouts/settings";
import { LuMail, LuPhone, LuUser } from "react-icons/lu";
import { withMask } from "use-mask-input";
import React from "react";
import { update } from "@/routes/user-profile-information";
interface Props {
    title?: string;
    description?: string;
}
export default function Page({
    title = "Informasi Personal",
    description = "Add a short description for this page.",
}: Props) {
    const {
        props: {
            auth: { user },
        },
    } = usePage();

    const { data, setData, put, processing, errors, isDirty } = useForm({
        name: user.name,
        email: user.email,
        phone: "+6281108110811",
    });

    const submit = (event: React.SubmitEvent) => {
        event.preventDefault();
        put(update().url);
    };

    return (
        <Layout>
            <Head title={title} />

            <form onSubmit={submit}>
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

                    <Fieldset.Root>
                        <Fieldset.Content>
                            <Field.Root invalid={!!errors.name}>
                                <Field.Label>Nama Lengkap</Field.Label>
                                <InputGroup startElement={<LuUser />}>
                                    <Input
                                        type="text"
                                        name="name"
                                        value={data.name}
                                        variant="subtle"
                                        onChange={(e) =>
                                            setData("name", e.target.value)
                                        }
                                    />
                                </InputGroup>
                                {errors.name && (
                                    <Field.ErrorText>
                                        {errors.name}
                                    </Field.ErrorText>
                                )}
                            </Field.Root>

                            <Field.Root invalid={!!errors.email}>
                                <Field.Label>Alamat Email</Field.Label>
                                <InputGroup startElement={<LuMail />}>
                                    <Input
                                        type="email"
                                        value={data.email}
                                        name="email"
                                        readOnly
                                        disabled
                                        variant="subtle"
                                        onChange={(e) =>
                                            setData("email", e.target.value)
                                        }
                                    />
                                </InputGroup>
                                {errors.email && (
                                    <Field.ErrorText>
                                        {errors.email}
                                    </Field.ErrorText>
                                )}
                                <Field.HelperText>
                                    Silahkan hubungi operator untuk dapat
                                    mengubah alamat email.
                                </Field.HelperText>
                            </Field.Root>

                            <Field.Root>
                                <Field.Label>No. Telepon</Field.Label>
                                <InputGroup startElement={<LuPhone />}>
                                    <Input
                                        variant="subtle"
                                        value={data.phone}
                                        ref={withMask("9999-9999-9999[9]")}
                                        onChange={(e) =>
                                            setData("phone", e.target.value)
                                        }
                                    />
                                </InputGroup>
                            </Field.Root>
                        </Fieldset.Content>

                        <Button
                            type="submit"
                            colorPalette="pink"
                            alignSelf="flex-start"
                            loading={processing}
                            disabled={!isDirty || processing}
                        >
                            Ubah
                        </Button>
                    </Fieldset.Root>
                </Stack>
            </form>
        </Layout>
    );
}
