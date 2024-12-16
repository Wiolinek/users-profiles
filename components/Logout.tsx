"use client";

import { logout } from "@/actions/auth";
import Button from "@/components/Button";

export default function Logout() {

    return (
        <Button
            customClass="p-3 sm:py-4 sm:px-8 w-fit mr-0 ml-auto rounded-md bg-primary border-primary text-sm text-white hover:bg-primary-hover hover:border-primary-hover uppercase"
            label="Logout"
            onClick={async () => {
                try {
                    await logout();
                } catch (error) {
                    console.error("Logout failed:", error);
                }
            }}
        />
    );
}
