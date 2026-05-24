"use server";

import { db } from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";

/**
 * Fetch the current user's credit balance and tier from DB.
 */
export const getUserCredits = async () => {
  const user = await currentUser();
  if (!user) return null;

  const dbUser = await db.user.findUnique({
    where: { clerkId: user.id },
    select: { credits: true, tier: true },
  });

  return dbUser;
};

/**
 * Deduct one credit from the current user.
 * Returns { success: true } or { success: false, reason: "..." }
 */
export const deductCredit = async () => {
  const user = await currentUser();
  if (!user) return { success: false, reason: "Not authenticated" };

  const dbUser = await db.user.findUnique({
    where: { clerkId: user.id },
    select: { id: true, credits: true, tier: true },
  });

  if (!dbUser) return { success: false, reason: "User not found" };

  // Unlimited tier — never deduct
  if (dbUser.credits === "Unlimited" || dbUser.tier === "Unlimited") {
    return { success: true };
  }

  const current = parseInt(dbUser.credits, 10);
  if (isNaN(current) || current <= 0) {
    return { success: false, reason: "Insufficient credits" };
  }

  await db.user.update({
    where: { id: dbUser.id },
    data: { credits: String(current - 1) },
  });

  return { success: true };
};
