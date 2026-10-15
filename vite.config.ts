import inertia from "@inertiajs/vite";
import { wayfinder } from "@laravel/vite-plugin-wayfinder";
import babel from "@rolldown/plugin-babel";
import react, { reactCompilerPreset } from "@vitejs/plugin-react";
import laravel from "laravel-vite-plugin";
import { bunny } from "laravel-vite-plugin/fonts";
import { defineConfig, lazyPlugins } from "vite-plus";

export default defineConfig(({ isSsrBuild }) => {
    return {
        plugins: lazyPlugins(() => [
            laravel({
                input: ["resources/js/app.tsx"],
                refresh: true,
                fonts: [
                    bunny("Poppins", {
                        weights: [400, 500, 600, 700],
                    }),
                    bunny("Rubik", {
                        weights: [400, 500, 600, 700],
                    }),
                ],
            }),
            inertia(),
            react(),
            babel({
                presets: [reactCompilerPreset()],
            }),
            wayfinder({
                formVariants: true,
            }),
        ]),
        server: {
            watch: {
                ignored: [
                    "**/.agents/**",
                    "**/.claude/**",
                    "**/.cursor/**",
                    "**/.junie/**",
                    "**/vendor/**",
                ],
            },
        },
        lint: {
            ignorePatterns: [
                "vendor/**",
                "node_modules/**",
                "public/**",
                "bootstrap/ssr/**",
                "resources/js/actions/**",
                "resources/js/components/ui/*",
                "resources/js/routes/**",
                "resources/js/wayfinder/**",
            ],
            options: {
                denyWarnings: true,
                typeAware: true,
            },
        },
        fmt: {
            printWidth: 80,
            tabWidth: 4,
            singleQuote: true,
            semi: true,
            singleAttributePerLine: false,
            htmlWhitespaceSensitivity: "css",
            ignorePatterns: [
                ".github/**",
                "composer.json",
                "resources/js/components/ui/*",
                "resources/views/mail/*",
            ],
        },
        build: {
            manifest: "manifest.json",

            sourcemap: false,

            cssCodeSplit: true,

            reportCompressedSize: false,

            chunkSizeWarningLimit: 1000,

            rollupOptions: {
                output: {
                    entryFileNames: isSsrBuild ? "ssr.js" : "assets/[hash].js",
                    chunkFileNames: isSsrBuild
                        ? "chunks/[hash].js"
                        : "assets/[hash].js",
                    assetFileNames: ({ names }) => {
                        const ext = names?.[0]?.split(".").pop();
                        return isSsrBuild
                            ? `assets/[hash].${ext}`
                            : `assets/[hash].${ext}`;
                    },

                    manualChunks: isSsrBuild
                        ? undefined
                        : (id) => {
                              if (id.includes("node_modules")) {
                                  if (id.includes("react")) return "react";
                                  if (id.includes("@chakra-ui"))
                                      return "chakra";
                                  if (id.includes("@inertiajs"))
                                      return "inertia";
                                  return "vendor";
                              }
                          },
                },
            },
        },
    };
});
