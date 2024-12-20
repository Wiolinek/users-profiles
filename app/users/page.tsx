import { UserProfileType } from "@/types/user.interface";
import Link from "next/link";
import prisma from '@/lib/db';
import { LuUserPlus } from "react-icons/lu";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import UserProfile from "@/components/UserProfile";
import NotFound from "@/app/not-found";

export default async function UserProfilesListPage() {
    const session = await auth();

    if (!session?.user) {
        redirect("/")
    }

    const userProfiles: UserProfileType[] = await prisma.userProfile.findMany();

    if (userProfiles.length === 0) {
        return (
            <NotFound />
        )
    }

    return (
        <main className="container mx-auto my-20 px-4">
            <div
                className="flex gap-4 w-full bg-primary text-white p-3 border-b-2 rounded-md text-sm uppercase"
            >
                <div className="flex gap-6 flex-grow">
                    <span className="hidden sm:flex p-2 w-[56px]">id</span>
                    <span className="flex p-2 flex-grow">First name _ last name</span>
                    <span className="hidden sm:flex p-2 w-[200px]">birth date</span>
                </div>
                <div className="flex justify-center items-center w-10 mr-0">
                    Edit
                </div>
            </div>
            <ul className="flex flex-col">
                {userProfiles.map((profile) => (
                    <UserProfile key={profile.id} userProfile={profile} />
                ))
                }
            </ul>
            <div className="mt-10 flex justify-end">
                <Link href="users/new-user" className="flex gap-3 p-3 sm:py-4 sm:px-8 w-full sm:w-fit rounded-md border-2 border-primary bg-primary text-sm text-white hover:bg-primary-hover hover:border-primary-hover uppercase">
                    <LuUserPlus size={20} />
                    Add new user profile
                </Link>
            </div>
        </main>
    );
}
