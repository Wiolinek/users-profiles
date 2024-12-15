import { UserProfileType } from "@/types/user.interface";
import Link from "next/link";
import { LuPencil } from "react-icons/lu";
import dayjs from "dayjs";

export interface UserProfileProps {
    userProfile: UserProfileType;
}

export default function UserProfile({ userProfile }: Readonly<UserProfileProps>) {
    const { id, firstName, lastName, birthDate } = userProfile;

    return (
        <li
            className="flex gap-4 w-full list-none p-3 border-b-2 text-lg"
        >
            <div className="flex gap-6 flex-grow">
                <p className="flex p-2 border-r-2 w-[56px]">{id}</p>
                <p className="flex p-2 flex-grow">{firstName} {lastName}</p>
                <p className="flex p-2 w-[200px]">{dayjs(birthDate).format("YYYY-MM-DD")}</p>
            </div>
            <Link href={`/users/${id}`} className="flex justify-center items-center w-10 mr-0 border-2 rounded-md hover:bg-gray-200">
                <LuPencil />
            </Link>
        </li>
    );
}
