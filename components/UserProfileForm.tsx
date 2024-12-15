"use client";

import { UserProfileType } from "@/types/user.interface";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { LuTrash2, LuSend } from "react-icons/lu";
import dayjs from "dayjs";
import { deleteUserProfile } from "@/actions/actions";
import Link from "next/link";

export interface UserProfileFormProps {
    id?: string;
    userData?: UserProfileType;
    action: (formData: FormData, id: string) => Promise<void>;
}

export default function UserProfileForm({ id, userData, action }: Readonly<UserProfileFormProps>) {
    const pathname = usePathname();

    const deleteUserProfileHandler = (id: string) => {
        deleteUserProfile(id);
        window.location.href = '/users';
    }

    const handleFormSubmit = async (
        formData: FormData,
        action: (formData: FormData, id: string) => Promise<void>,
        id: string
    ) => {
        await action(formData, id);
        window.location.href = '/users';
    };

    return (
        <form
            action={async (formData: FormData) => handleFormSubmit(formData, action, id!)}
            encType="multipart/form-data"
            className="flex flex-col mt-14 text-sm uppercase"
        >
            <div className="flex gap-6 mb-14">
                <div className="flex flex-col gap-6 w-1/2">
                    <label className="flex flex-col gap-2">
                        First name
                        <input
                            name="firstName"
                            type="text"
                            required
                            className="border-2 rounded-md p-2"
                            defaultValue={userData?.firstName || ""}
                        />
                    </label>
                    <label className="flex flex-col gap-2">
                        Last name
                        <input
                            name="lastName"
                            type="text"
                            required
                            className="border-2 rounded-md p-2"
                            defaultValue={userData?.lastName || ""}
                        />
                    </label>
                    <label className="flex flex-col gap-2">
                        Birth date
                        <input
                            name="birthDate"
                            type="date"
                            required
                            defaultValue={userData?.birthDate ? dayjs(userData.birthDate).format("YYYY-MM-DD") : ""}
                            max={dayjs().format("YYYY-MM-DD")}
                            className="border-2 rounded-md p-2 w-[200px]"
                        />
                    </label>
                    <label className="flex flex-col gap-2">
                        Photo URL
                        <input
                            name="photo"
                            type="text"
                            required
                            className="border-2 rounded-md p-2"
                            defaultValue={userData?.photo || ""}
                        />
                        <span className="text-sm flex gap-1 lowercase">Chose from
                            <Link href="https://picsum.photos/images" target="_blank" rel="noopener noreferrer" className="text-md text-primary font-bold uppercase hover:underline">
                                here
                            </Link>
                        </span>
                        {userData?.photo && (
                            <Image
                                className="w-full h-auto object-cover overflow-hidden"
                                src={userData.photo}
                                alt={`${userData.firstName} ${userData.lastName}`}
                                width={300}
                                height={126}
                            />
                        )}
                    </label>
                </div>
                <label className="flex flex-col gap-2 w-1/2">
                    Description
                    <textarea
                        name="richText"
                        required
                        className="border-2 rounded-md p-2 w-full"
                        defaultValue={userData?.richText || ""}
                    ></textarea>
                </label>
            </div>
            <div className="flex justify-between w-full">
                {pathname !== "/new-user" && (
                    <button
                        type="button"
                        className="flex gap-3 py-4 px-8 w-fit rounded-md bg-red text-white hover:bg-red-hover uppercase"
                        onClick={() => deleteUserProfileHandler(id!)}
                    >
                        <LuTrash2 size={20} />
                        Delete user profile
                    </button>
                )}
                <button
                    type="submit"
                    className="flex gap-3 py-4 px-8 w-fit mr-0 ml-auto rounded-md bg-primary text-white hover:bg-primary-hover uppercase"
                >
                    <LuSend size={19} />
                    {pathname === "/new-user" ? "Save" : "Update"}
                </button>
            </div>
        </form>
    );
}
