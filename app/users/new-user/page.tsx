import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { addUserProfile } from "@/actions/actions";
import UserProfileForm from "@/components/UserProfileForm";

export default async function NewUserProfilePage() {
    const session = await auth();

    if (!session?.user) {
        redirect("/")
    }

    return (
        <main className="container mx-auto my-20 px-4">
            <h1 className="mb-6 text-2xl font-bold text-primary uppercase">Add New User Profile</h1>
            <UserProfileForm action={addUserProfile} />
        </main>
    );
}
