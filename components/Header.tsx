import Link from "next/link";
import { auth } from "@/auth";
import Logout from "@/components//Logout";

export default async function Header() {
    const session = await auth();

    return (
        <header className="container flex justify-between mx-auto p-4 w-full">
            <Link
                href="/users"
                className="p-3 sm:py-4 sm:px-8 w-fit border-2 border-primary rounded-md text-sm text-primary font-semibold hover:font-medium hover:bg-primary-hover hover:text-white uppercase"
            >
                Home
            </Link>
            <div className="flex gap-6 items-end">
                <span className="hidden sm:inline">{session?.user?.email || ""}</span>
                <Logout />
            </div>

        </header>
    );
}
