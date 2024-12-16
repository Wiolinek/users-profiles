"use server";

import { signIn, signOut } from "@/auth";
import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function getUserByEmail(email: string) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    return user;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export async function login(formData: FormData) {
  const rawFormData = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  try {
    const result = await signIn("credentials", {
      ...rawFormData,
      redirect: false,
    });

    if (result?.error) {
      throw new Error(result.error);
    }

    return result;
  } catch (error: unknown) {
    if (error instanceof Error) {
      const errorCause = error.cause && typeof error.cause === "object" && "err" in error.cause
        ? (error.cause as { err: string }).err
        : error.message || "An unknown authentication error occurred.";
      throw new Error(errorCause);
    } else {
      throw new Error("An unknown error occurred");
    }
  } finally {
    revalidatePath("/users");
  }
}

export async function logout() {
  await signOut({ redirectTo: "/" });
  revalidatePath("/");
}

