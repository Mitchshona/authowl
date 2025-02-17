"use client";

import { useState } from "react";
import ProfileForm from "./profile-form";
import SettingsTabs from "./settings-tabs";

interface Signature {
  signatureId: number;
  signatureName: string;
}

interface MemberData {
  email: string;
  firstName: string;
  lastName: string;
  memberStatusId: number;
  defaultSignatureId: number | null;
  organisationId: number;
  userSignatures: Signature[];
}

interface SettingsLayoutProps {
  memberData: MemberData | null;
}

export default function SettingsLayout({ memberData }: SettingsLayoutProps) {
  const [activeTab, setActiveTab] = useState("profile");

  return (
    <main className="flex-1 p-8">
      <div className="max-w-[952px]">
        <h1 className="typography-h3-bold mb-[20px] text-[#364A59]">Settings</h1>
        <div className="">
          <SettingsTabs activeTab={activeTab} onTabChange={setActiveTab} />
          {activeTab === "profile" && <ProfileForm memberData={memberData} />}
        </div>
      </div>
    </main>
  );
}