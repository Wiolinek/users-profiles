import { addUserProfile } from "@/actions/actions";
import UserProfileForm from "@/components/UserProfileForm";

export default function NewUserProfilePage() {
    return (
        <main className="container mx-auto my-20">
            <h1 className="mb-6 text-2xl font-bold text-primary uppercase">Add New User Profile</h1>
            <UserProfileForm action={addUserProfile} />
        </main>
    );
}
