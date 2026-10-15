import { Link, usePage } from "@inertiajs/react";
import {
    Box,
    Button,
    Drawer,
    Flex,
    HStack,
    IconButton,
    Portal,
    Text,
    VStack,
} from "@chakra-ui/react";
import { blank, home } from "@/routes";
import { RouteDefinition } from "@/wayfinder";
import { LuX } from "react-icons/lu";

interface Item {
    label: string;
    href: RouteDefinition<"get"> | undefined;
}

interface Props {
    open: boolean;
    onClose: () => void;
}

const items: Item[] = [
    {
        label: "Beranda",
        href: home(),
    },
    {
        label: "Blank",
        href: blank(),
    },
    // {
    //     label: "Security",
    //     href: undefined,
    // },
    // {
    //     label: "Sessions",
    //     href: undefined,
    // },
    // {
    //     label: "Settings",
    //     href: undefined,
    // },
];

function NavItems({
    mobile = false,
    onNavigate,
}: {
    mobile?: boolean;
    onNavigate?: () => void;
}) {
    return (
        <>
            {items.map((item, index) => {
                return (
                    <Button
                        asChild
                        key={index}
                        variant="ghost"
                        justifyContent="flex-start"
                        px="3"
                        w={mobile ? "full" : "auto"}
                        onClick={onNavigate}
                    >
                        <Link href={item.href}>{item.label}</Link>
                    </Button>
                );
            })}
        </>
    );
}

export default function Navbar({ open, onClose }: Props) {
    const { props } = usePage();

    return (
        <>
            <Box
                as="nav"
                display={{ base: "none", lg: "block" }}
                aria-label="Main navigation"
                bg="bg.emphasized"
            >
                <Flex maxW="7xl" mx="auto" px="6" minH="12" align="center">
                    <HStack gap="1">
                        <NavItems />
                    </HStack>
                </Flex>
            </Box>

            <Drawer.Root
                open={open}
                onOpenChange={(details) => {
                    if (!details.open) {
                        onClose();
                    }
                }}
                placement="start"
                size="xs"
            >
                <Portal>
                    <Drawer.Backdrop />

                    <Drawer.Positioner>
                        <Drawer.Content>
                            <Drawer.Header>
                                <Flex align="center" justify="space-between">
                                    <Box>
                                        <Drawer.Title>
                                            {props.name}
                                        </Drawer.Title>

                                        <Text
                                            mt="1"
                                            fontSize="sm"
                                            color="fg.muted"
                                        >
                                            Pusat Akun Tersentralisasi
                                        </Text>
                                    </Box>

                                    <Drawer.CloseTrigger asChild>
                                        <IconButton
                                            variant="ghost"
                                            size="sm"
                                            aria-label="Close navigation menu"
                                        >
                                            <LuX />
                                        </IconButton>
                                    </Drawer.CloseTrigger>
                                </Flex>
                            </Drawer.Header>

                            <Drawer.Body>
                                <VStack
                                    align="stretch"
                                    gap="1"
                                    aria-label="Mobile navigation"
                                >
                                    <NavItems mobile onNavigate={onClose} />
                                </VStack>
                            </Drawer.Body>

                            {/* <Drawer.Footer>
                                <Text w="full" fontSize="xs" color="fg.muted">
                                    Account Center
                                </Text>
                            </Drawer.Footer> */}
                        </Drawer.Content>
                    </Drawer.Positioner>
                </Portal>
            </Drawer.Root>
        </>
    );
}
