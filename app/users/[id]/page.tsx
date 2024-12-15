import { UserProfileType } from "@/types/user.interface";
import prisma from '@/lib/db';
import UserProfileForm from "@/components/UserProfileForm";
import { updateUserProfile } from "@/actions/actions";
import NotFound from "@/app/not-found";

export interface UserProfilePageParams {
    params: {
        id: string;
    };
}

export default async function UserProfilePage({ params }: Readonly<UserProfilePageParams>) {
    const userProfile: UserProfileType = await prisma.userProfile.findUnique({
        where: {
            id: Number(params.id),
        }
    });

    if (!userProfile) {
        return (
            <NotFound />
        )
    }

    return (
        <main className="container mx-auto my-20">
            <h1 className="mb-6 text-2xl font-bold text-primary uppercase">Edit User Profile</h1>
            <UserProfileForm id={params.id} userData={userProfile} action={updateUserProfile} />
        </main>
    );
}
