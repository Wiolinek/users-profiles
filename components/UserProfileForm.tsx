"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter, redirect } from "next/navigation";
import { LuTrash2, LuSend } from "react-icons/lu";
import dayjs from "dayjs";
import { deleteUserProfile } from "@/actions/actions";
import { UserProfileType } from "@/types/user.interface";
import Tiptap from "@/components/Tiptap";
import Button from "@/components//Button";

interface UserProfileFormProps {
    id?: string;
    userData?: UserProfileType;
    action: (formData: FormData, id: string) => Promise<void>;
}

export default function UserProfileForm({
    id,
    userData,
    action,
}: Readonly<UserProfileFormProps>) {
    const pathname = usePathname();
    const router = useRouter();
    const [richTextContent, setRichTextContent] = useState(userData?.richText || "");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    const deleteUserProfileHandler = async (id: string) => {
        setIsDeleting(true);

        try {
            await deleteUserProfile(id);
            setIsDeleting(false);
        } catch (error) {
            console.error("Submission failed:", error);
        } finally {
            router.push("/users");
        }
    };

    const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        const formData = new FormData(e.currentTarget);
        formData.append("richText", richTextContent);

        try {
            await action(formData, id!);
            setIsSubmitting(false);
        } catch (error) {
            console.error("Submission failed:", error);
        } finally {
            if (pathname !== "/users/new-user") {
                redirect("/users")
            } else {
                window.location.reload();
            }
        }
    };

    return (
        <form
            onSubmit={handleFormSubmit}
            encType="multipart/form-data"
            className="flex flex-col mt-14 text-sm"
        >
            <div className="flex flex-col sm:flex-row gap-6 mb-14">
                <div className="flex flex-col gap-6 sm:w-1/2">
                    <label className="flex flex-col gap-2 uppercase">
                        First name
                        <input
                            name="firstName"
                            type="text"
                            required
                            className="border-2 rounded-md p-2"
                            defaultValue={userData?.firstName || ""}
                        />
                    </label>
                    <label className="flex flex-col gap-2 uppercase">
                        Last name
                        <input
                            name="lastName"
                            type="text"
                            required
                            className="border-2 rounded-md p-2"
                            defaultValue={userData?.lastName || ""}
                        />
                    </label>
                    <label className="flex flex-col gap-2 uppercase">
                        Birth date
                        <input
                            name="birthDate"
                            type="date"
                            required
                            defaultValue={
                                userData?.birthDate
                                    ? dayjs(userData.birthDate).format("YYYY-MM-DD")
                                    : ""
                            }
                            max={dayjs().format("YYYY-MM-DD")}
                            className="border-2 rounded-md p-2 md:max-w-[240px]"
                        />
                    </label>
                    <label className="flex flex-col gap-2 uppercase">
                        Photo URL
                        <input
                            name="photo"
                            type="text"
                            required
                            className="border-2 rounded-md p-2"
                            defaultValue={userData?.photo || ""}
                        />
                        <span className="text-sm flex gap-1 lowercase">
                            Choose from
                            <Link
                                href="https://picsum.photos/images"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-md text-primary font-bold uppercase hover:underline"
                            >
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
                <label className="flex flex-col gap-2 sm:w-1/2 h-fit tiptap">
                    Description
                    <Tiptap
                        description={userData?.richText || ""}
                        onChange={setRichTextContent}
                    />
                </label>
            </div>
            <div className="flex flex-wrap gap-3 justify-between w-full">
                {pathname !== "/users/new-user" && (
                    <Button
                        customClass="flex justify-center gap-3 p-3 sm:py-4 sm:px-8 w-full sm:w-fit rounded-md bg-red text-white hover:bg-red-hover disabled:bg-gray-200 disabled:text-black uppercase"
                        onClick={() => deleteUserProfileHandler(id!)}
                        disabled={isDeleting}
                        label={isDeleting ? (
                            "Deleting..."
                        ) : (
                            <>
                                <LuTrash2 size={20} />
                                Delete profile
                            </>
                        )}
                    />
                )}
                <Button
                    type="submit"
                    customClass="flex justify-center gap-3 p-3 sm:py-4 sm:px-8 w-full sm:w-fit mr-0 ml-auto rounded-md bg-primary text-white hover:bg-primary-hover disabled:bg-gray-200 disabled:text-black uppercase"
                    disabled={isSubmitting}
                    label={isSubmitting ? (
                        "Sending data..."
                    ) : (
                        <>
                            <LuSend size={19} />
                            {pathname === "/users/new-user" ? "Save profile" : "Update profile"}
                        </>
                    )}
                />
            </div>
        </form>
    );
}
