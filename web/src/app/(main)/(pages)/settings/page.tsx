import ProfileForm from "@/components/forms/profile-form";
import { db } from "@/lib/db";
import React from "react";
import ProfilePicture from "./_components/profile-picture";
import { currentUser } from "@clerk/nextjs/server";

type Props = {};

const Settings = async (props: Props) => {
  const authUser = await currentUser();
  if (!authUser) return null;

  const user = await db.user.findUnique({ where: { clerkId: authUser.id } });

  const removeProfileImage = async () => {
    "use server";
    await db.user.update({
      where: { clerkId: authUser.id },
      data: { profileImage: "" },
    });
  };

  const uploadProfileImage = async (image: string) => {
    "use server";
    await db.user.update({
      where: { clerkId: authUser.id },
      data: { profileImage: image },
    });
  };

  const updateUserInfo = async (name: string) => {
    "use server";
    const updateUser = await db.user.update({
      where: {
        clerkId: authUser.id,
      },
      data: {
        name,
      },
    });
    return updateUser;
  };

  return (
    <div className="space-y-6 px-4 sm:px-margin-desktop py-8 max-w-5xl mx-auto">
      {/* Header Section */}
      <div className="mb-10">
        <h2 className="font-headline-lg text-headline-lg text-on-surface tracking-tight mb-2">Settings</h2>
        <p className="text-on-surface-variant font-body-lg">Manage your account preferences and profile.</p>
      </div>

      <div className="glass-panel rounded-3xl p-8 sm:p-12">
        <div className="mb-10 border-b border-border-subtle pb-6">
          <h3 className="font-headline-sm text-headline-sm text-primary">User Profile</h3>
          <p className="text-body-sm text-on-surface-variant mt-1">
            Add or update your information
          </p>
        </div>

        <div className="flex flex-col md:flex-row items-start gap-12">
          {/* Profile Picture */}
          <div className="flex-shrink-0 w-full md:w-auto">
            <ProfilePicture
              userImage={user?.profileImage || ""}
              onDelete={removeProfileImage}
              onUpload={uploadProfileImage}
            />
          </div>
          
          {/* Form */}
          <div className="flex-1 w-full max-w-md">
            <ProfileForm user={user} onUpdate={updateUserInfo} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
