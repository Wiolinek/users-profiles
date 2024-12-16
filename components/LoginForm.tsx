"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Button from "@/components/Button";
import { login } from "@/actions/auth";
import { LuEye, LuEyeOff } from "react-icons/lu";

export default function LoginForm() {
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState<string>("");
    const router = useRouter();

    const handleSubmit = async (formData: FormData) => {
        setError("");
        try {
            const result = await login(formData);
            if (result) {
                router.push("/users");
            }
        } catch (err) {
            setError((err as Error).message);
            setTimeout(() => {
                setError("");
            }, 3000);
        }
    };

    return (
        <form
            action={handleSubmit}
            className="flex flex-col mt-14 text-sm"
        >
            <div className="flex flex-col gap-6">
                <label className="flex flex-col gap-2 uppercase">
                    Email Address
                    <input
                        name="email"
                        type="email"
                        required
                        className="border-2 rounded-md p-2"
                    />
                </label>
                <label className="flex flex-col gap-2 uppercase">
                    Password
                    <div className="relative">
                        <input
                            name="password"
                            type={showPassword ? 'text' : 'password'}
                            required
                            className="border-2 rounded-md p-2 w-full"
                        />
                        <button
                            type="button"
                            className="absolute inset-y-0 bottom-0 right-0 flex items-center px-3"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ?
                                <LuEyeOff size={20} className="bg-white" />
                                :
                                <LuEye size={20} className="bg-white" />
                            }
                        </button>
                    </div>
                </label>
            </div>
            <p className="text-red mt-3 h-5">{error}</p>
            <Button
                type="submit"
                customClass="flex justify-center gap-3 py-4 px-8 mt-6 rounded-md bg-primary text-white hover:bg-primary-hover disabled:bg-gray-200 disabled:text-black uppercase"
                label="Login"
            />
        </form >
    );
}
