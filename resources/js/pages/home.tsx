import { Head, Link, usePage } from "@inertiajs/react";
import {
    Box,
    Button,
    Flex,
    Heading,
    Highlight,
    Separator,
    Stack,
    Text,
} from "@chakra-ui/react";
import Layout from "@/layouts/default";
import settings from "@/routes/settings";

interface Action {
    title: string;
    description: string;
    href: string;
    label: string;
}

const actions: Action[] = [
    {
        title: "Informasi Personal",
        description: "Manage your profile information and account preferences.",
        href: "/settings/profile",
        label: "Manage profile",
    },
    {
        title: "Connected applications",
        description:
            "Explore the applications and services connected to your account.",
        href: "/applications",
        label: "View applications",
    },
    {
        title: "Security",
        description:
            "Review your security settings and authentication options.",
        href: "/security",
        label: "Manage security",
    },
    {
        title: "Active sessions",
        description: "Review the sessions associated with your account.",
        href: "/sessions",
        label: "View sessions",
    },
];

function ActionRow({ item }: { item: Action }) {
    return (
        <Flex
            direction={{ base: "column", sm: "row" }}
            align={{ base: "stretch", sm: "center" }}
            justify="space-between"
            gap="4"
            py="5"
        >
            <Box flex="1" minW="0">
                <Heading size="sm" fontWeight="semibold">
                    {item.title}
                </Heading>

                <Text mt="1" color="fg.muted" fontSize="sm" lineHeight="tall">
                    {item.description}
                </Text>
            </Box>

            <Button asChild variant="subtle" size="sm" colorPalette="teal">
                <Link href={item.href}>{item.label}</Link>
            </Button>
        </Flex>
    );
}

export default function Page() {
    const {
        props,
        props: {
            auth: { user },
        },
    } = usePage();
    return (
        <Layout>
            <Head title="Beranda" />
            <Stack gap={{ base: 6, md: 8 }}>
                <Flex
                    direction={{ base: "column", sm: "row" }}
                    align={{ base: "flex-start", sm: "center" }}
                    justify="space-between"
                    gap="4"
                >
                    <Box>
                        <Heading
                            size={{ base: "xl", md: "2xl" }}
                            letterSpacing="tight"
                        >
                            <Highlight
                                query={user.name}
                                styles={{
                                    color: "orange",
                                    colorPalette: "orange",
                                    bg: "orange.subtle",
                                    px: "1",
                                    rounded: "sm",
                                }}
                            >
                                {`Selamat datang, ${user.name}`}
                            </Highlight>
                        </Heading>

                        <Text mt="2" color="fg.muted" maxW="xl">
                            Manage your account, access your applications, and
                            keep your digital identity up to date.
                        </Text>
                    </Box>

                    <Button asChild colorPalette="pink">
                        <Link href={settings.profile.index()}>
                            Edit profile
                        </Link>
                    </Button>
                </Flex>

                <Box
                    borderRadius="md"
                    bg="teal.50"
                    _dark={{
                        bg: "teal.950",
                    }}
                >
                    <Box px={{ base: 4, md: 6 }} py="5">
                        <Heading
                            size="md"
                            color="teal.600"
                            _dark={{
                                color: "teal.400",
                            }}
                        >
                            Your account
                        </Heading>

                        <Text mt="1" fontSize="sm" color="fg.muted">
                            A central place to manage your identity and account
                            preferences.
                        </Text>
                    </Box>

                    <Separator />

                    <Box px={{ base: 4, md: 6 }}>
                        {actions.map((item, index) => (
                            <Box key={item.href}>
                                <ActionRow item={item} />

                                {index < actions.length - 1 && <Separator />}
                            </Box>
                        ))}
                    </Box>
                </Box>

                <Box
                    p={{ base: 4, md: 5 }}
                    bg="teal.100"
                    borderRadius="md"
                    _dark={{
                        bg: "teal.900",
                    }}
                >
                    <Flex
                        direction={{ base: "column", sm: "row" }}
                        align={{ base: "flex-start", sm: "center" }}
                        justify="space-between"
                        gap="4"
                    >
                        <Box>
                            <Heading size="sm" colorPalette="teal">
                                Jaga keamanan akun Anda
                            </Heading>

                            <Text
                                mt="1"
                                fontSize="sm"
                                color="fg.muted"
                                lineHeight="tall"
                            >
                                Tinjau pengaturan keamanan dan opsi otentikasi
                                Anda secara berkala.
                            </Text>
                        </Box>

                        <Button
                            asChild
                            colorPalette="yellow"
                            variant="solid"
                            size="sm"
                        >
                            <Link href="#">Tinjau Keamanan</Link>
                        </Button>
                    </Flex>
                </Box>
            </Stack>
        </Layout>
    );
}
