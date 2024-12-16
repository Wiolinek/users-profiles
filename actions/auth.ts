"use server";

import { signIn, signOut } from "@/auth";
import prisma from "@/lib/db";
import { AuthError } from "next-auth";
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
    redirectTo: "/users",
  };

  const existingUser = await getUserByEmail(formData.get("email") as string);
  console.log(existingUser);

  try {
    await signIn("credentials", rawFormData);
  } catch (error: unknown) {
    if (error instanceof AuthError) {
      if (error.type === "CredentialsSignin") {
        return { error: "Invalid credentials!" };
      } else {
        return { error: "Something went wrong!" };
      }
    }

    throw error;
  } finally {
    revalidatePath("/users");
  }
};

export async function logout() {
  await signOut({ redirectTo: "/" });
  revalidatePath("/");
}

