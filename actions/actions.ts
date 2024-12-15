"use server";

import prisma from "@/lib/db";

export async function addUserProfile(formData: FormData) {
  const firstName = formData.get("firstName") as string;
  const lastName = formData.get("lastName") as string;
  const birthDate = formData.get("birthDate") as string;
  const photo = formData.get("photo") as string;
  const richText = formData.get("richText") as string;

  if (!firstName || !lastName || !birthDate || !photo || !richText) {
    throw new Error("All fields are required.");
  }

  try {
    await prisma.userProfile.create({
      data: {
        firstName,
        lastName,
        birthDate: new Date(birthDate),
        photo,
        richText,
      },
    });
  } catch (error) {
    console.error("Error saving user profile:", error);
    throw new Error("Failed to save user profile.");
  }
}

export async function updateUserProfile(formData: FormData, id: string) {
  const userId = Number(id);
  const firstName = formData.get("firstName") as string;
  const lastName = formData.get("lastName") as string;
  const birthDate = formData.get("birthDate") as string;
  const photo = formData.get("photo") as string;
  const richText = formData.get("richText") as string;

  if (!firstName || !lastName || !birthDate || !photo || !richText) {
    throw new Error("All fields are required.");
  }

  try {
    await prisma.userProfile.update({
      where: { id: userId },
      data: {
        firstName,
        lastName,
        birthDate: new Date(birthDate),
        photo,
        richText,
      },
    });
  } catch (error) {
    console.error("Error saving user profile:", error);
    throw new Error("Failed to save user profile.");
  }
}

export async function deleteUserProfile(id: string) {
  const userId = Number(id)
  try {
    await prisma.userProfile.delete({
      where: { id: userId }
    });
  } catch (error) {
    console.error("Error deleting user profile:", error);
    throw new Error("Failed to delete user profile.");
  }
}