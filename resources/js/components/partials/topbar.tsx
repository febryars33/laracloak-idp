import { Link, router, usePage } from "@inertiajs/react";
import {
    Avatar,
    Box,
    Button,
    Flex,
    Heading,
    HStack,
    IconButton,
    Image,
    Menu,
    Portal,
    Text,
} from "@chakra-ui/react";
import { ColorModeButton } from "../ui/color-mode";
import { LuMenu } from "react-icons/lu";
import profile from "@/routes/settings/profile";
import { logout } from "@/routes";

interface Props {
    onMenu: () => void;
}

export default function Topbar({ onMenu }: Props) {
    const {
        props,
        props: {
            auth: { user },
        },
    } = usePage();

    const signout = () => {
        router.post(logout());
    };

    return (
        <Box
            as="header"
            position="sticky"
            top="0"
            zIndex="sticky"
            bg="teal.700"
        >
            <Flex
                maxW="7xl"
                mx="auto"
                px={{ base: 4, md: 6 }}
                h="16"
                align="center"
                justify="space-between"
                gap="4"
            >
                <HStack gap="3" minW="0">
                    <IconButton
                        display={{ base: "inline-flex", lg: "none" }}
                        variant="ghost"
                        size="sm"
                        onClick={onMenu}
                        aria-label="Open navigation menu"
                    >
                        <LuMenu />
                    </IconButton>

                    <HStack gap="2" minW="0">
                        <Flex
                            w="9"
                            h="9"
                            flexShrink={0}
                            align="center"
                            justify="center"
                        >
                            <Image
                                src="https://cdn-smaspgri1bandung.febrian.site/build/assets/CpZzgicW.png"
                                alt={props.name}
                            />
                        </Flex>

                        <Box minW="0" display={{ base: "none", md: "block" }}>
                            <Heading
                                fontSize="md"
                                fontWeight="bold"
                                lineHeight="short"
                                colorPalette="yellow"
                                color="white"
                                truncate
                            >
                                {props.name}
                            </Heading>

                            <Text fontSize="xs" color="white">
                                Pusat Akun Tersentralisasi
                            </Text>
                        </Box>
                    </HStack>
                </HStack>

                <HStack gap={{ base: 1, sm: 2 }}>
                    {/* <Button
                        variant="ghost"
                        size="sm"
                        display={{ base: "none", sm: "inline-flex" }}
                    >
                        Help
                    </Button> */}

                    <ColorModeButton />

                    <Menu.Root>
                        <Menu.Trigger asChild>
                            <Button
                                variant="plain"
                                aria-label="Open account menu"
                            >
                                <Avatar.Root size="sm" colorPalette="teal">
                                    <Avatar.Fallback name={user.name} />
                                </Avatar.Root>

                                <Heading
                                    display={{ base: "none", md: "block" }}
                                    size="sm"
                                    lineHeight="short"
                                    color="white"
                                >
                                    {user.name}
                                </Heading>
                            </Button>
                        </Menu.Trigger>

                        <Portal>
                            <Menu.Positioner>
                                <Menu.Content minW="220px">
                                    <Box px="3" py="3">
                                        <Heading fontSize="sm">
                                            {user.name}
                                        </Heading>

                                        <Text fontSize="xs" color="fg.muted">
                                            {user.email}
                                        </Text>
                                    </Box>

                                    <Menu.Separator />

                                    <Menu.Item value="settings" asChild>
                                        <Link href={profile.index()}>
                                            Pengaturan
                                        </Link>
                                    </Menu.Item>

                                    <Menu.Item value="security" asChild>
                                        <Link href="#">Keamanan</Link>
                                    </Menu.Item>

                                    <Menu.Item value="help" asChild>
                                        <Link href="#">Pusat Bantuan</Link>
                                    </Menu.Item>

                                    <Menu.Separator />

                                    <Menu.Item
                                        value="logout"
                                        color="fg.error"
                                        onClick={signout}
                                    >
                                        Keluar
                                    </Menu.Item>
                                </Menu.Content>
                            </Menu.Positioner>
                        </Portal>
                    </Menu.Root>
                </HStack>
            </Flex>
        </Box>
    );
}
