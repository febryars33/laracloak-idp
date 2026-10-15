import { createInertiaApp } from "@inertiajs/react";
import React from "react";
import { Provider } from "./components/ui/provider";

const appName = import.meta.env.VITE_APP_NAME || "Laravel";

void createInertiaApp({
    title: (title) => (title ? `${title} - ${appName}` : appName),
    progress: false,
    withApp(app) {
        return (
            <React.StrictMode>
                <Provider>{app}</Provider>
            </React.StrictMode>
        );
    },
});
