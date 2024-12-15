import Link from "next/link";

export default async function Header() {

    return (
        <header className="container flex mx-auto py-4">
            <Link href="/users" className="py-4 px-8 w-fit border-2 border-primary rounded-md text-sm text-primary font-semibold hover:font-medium hover:bg-primary-hover hover:text-white uppercase">
                Home
            </Link>
            <button className="py-4 px-8 w-fit mr-0 ml-auto rounded-md bg-primary text-sm text-white hover:bg-primary-hover uppercase">Logout</button>
        </header>
    );
}
