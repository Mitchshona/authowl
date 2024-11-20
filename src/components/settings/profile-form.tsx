"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { fetchWithAuth } from "@/app/utils/api";
import SignatureSection from './signature-section';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from 'lucide-react';

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

interface ProfileFormProps {
  memberData: MemberData | null;
}

export default function ProfileForm({ memberData }: ProfileFormProps) {
  const [firstName, setFirstName] = useState<string>(memberData?.firstName || "");
  const [lastName, setLastName] = useState<string>(memberData?.lastName || "");
  const [signatures, setSignatures] = useState<Signature[]>([]);
  const [defaultSignatureId, setDefaultSignatureId] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (memberData) {
      setFirstName(memberData.firstName);
      setLastName(memberData.lastName);
      setSignatures(memberData.userSignatures);
      setDefaultSignatureId(memberData.defaultSignatureId);
    }
  }, [memberData]);

  const handleAddSignature = async (name: string): Promise<Signature | undefined> => {
    if (!memberData) return;

    setError(null);
    try {
      // First, create a new signature
      const signatureResponse = await fetchWithAuth<{ signatureId: number }>("http://34.118.195.238:8080/api/v1/member/signature", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          memberId: memberData.memberStatusId.toString(),
          signatureName: name
        }),
      });

      if (!signatureResponse || !signatureResponse.signatureId) {
        throw new Error("Failed to create signature");
      }

      const newSignature: Signature = {
        signatureId: signatureResponse.signatureId,
        signatureName: name
      };

      // Condition: If this is the first signature, also set it as the default signature
      if (signatures.length === 0) {
        const defaultResponse = await fetchWithAuth<{ message: string }>("http://34.118.195.238:8080/api/v1/member/defaultSignature", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            memberId: memberData.memberStatusId.toString(),
            signatureId: newSignature.signatureId
          }),
        });

        if (!defaultResponse || !defaultResponse.message) {
          throw new Error("Failed to set default signature");
        }

        setDefaultSignatureId(newSignature.signatureId);
      }

      setSignatures(prevSignatures => [...prevSignatures, newSignature]);
      return newSignature;
    } catch (error) {
      console.error("Error adding signature:", error);
      setError("Failed to add signature. Please try again later.");
    }
  };

  const handleRemoveSignature = async (signatureId: number): Promise<void> => {
    if (!memberData) return;

    setError(null);
    try {
      const response = await fetchWithAuth<{ message: string }>("http://34.118.195.238:8080/api/v1/member/signature", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ signatureId }),
      });

      if (response && response.message) {
        setSignatures(prevSignatures => prevSignatures.filter(sig => sig.signatureId !== signatureId));
        if (defaultSignatureId === signatureId) {
          setDefaultSignatureId(null);
        }
      }
    } catch (error) {
      console.error("Error removing signature:", error);
      setError("Failed to remove signature. Please try again later.");
    }
  };

  return (
    <div className="space-y-[16px]">
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      <div className="flex flex-col gap-[20px] bg-[#FDFDFD] py-3 px-5 rounded-tr-[8px] rounded-b-[8px]">
        {/* Profile Headers */}
        <div className="flex flex-col gap-[5px] border-b-[1px] border-[#C3C9CD66] pb-4">
          <h2 className="typography-h4-semibold text-[#364A59]">Profile</h2>
          <p className="typography-body-medium-regular text-[#5E6E7A]">
            Update your personal details here
          </p>
        </div>

        {/* Name Fields */}
        <div className="grid grid-cols-[400px_1fr] border-b-[1px] border-[#C3C9CD66] pb-4">
          <Label className="typography-label-medium-medium text-[#364A59]">Name</Label>
          <div className="flex gap-[16px]">
            <div className="flex flex-col gap-[4px]">
              <span className="typography-label-small-caps-semibold uppercase text-[#5E6E7A]">
                given name
              </span>
              <Input
                placeholder="Given Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="typography-label-medium-regular text-[#5E6E7A]"
              />
            </div>
            <div className="flex flex-col gap-[4px]">
              <span className="typography-label-small-caps-semibold uppercase text-[#5E6E7A]">
                family name
              </span>
              <Input
                placeholder="Family Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="typography-label-medium-regular text-[#5E6E7A]"
              />
            </div>
          </div>
        </div>

        {/* Photo Upload */}
        <div className="grid grid-cols-[400px_1fr] border-b-[1px] border-[#C3C9CD66] pb-4">
          <div className="flex flex-col gap-[4px]">
            <Label className="typography-label-medium-medium text-[#364A59]">
              Your photo
            </Label>
            <p className="typography-label-medium-regular text-[#5E6E7A]">
              This will be displayed as your avatar.
            </p>
          </div>
          <div className="flex items-center gap-[12px]">
            <Avatar className="w-12 h-12">
              <AvatarImage src="/icons/Avatar.png" alt="Profile" />
              <AvatarFallback>JL</AvatarFallback>
            </Avatar>
            <Button
              variant="outline"
              size="sm"
              className="typography-button-small-semibold text-[#C92A2A] !bg-transparent !border-none !shadow-none"
            >
              Remove
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="typography-button-small-semibold text-[#1971C2] !bg-transparent !border-none !shadow-none"
            >
              Update
            </Button>
          </div>
        </div>

        {/* Signature */}
        <SignatureSection
          signatures={signatures}
          defaultSignatureId={defaultSignatureId}
          onAddSignature={handleAddSignature}
          onRemoveSignature={handleRemoveSignature}
        />

        {/* Access Type */}
        <div className="grid grid-cols-[400px_1fr]">
          <div className="flex flex-col gap-[4px]">
            <Label className="typography-label-medium-medium text-[#364A59] mb-2 block">
              Access type
            </Label>
            <p className="typography-label-medium-regular text-[#5E6E7A] mb-4">
              This determines the amount of access you get on the platform.
            </p>
          </div>
          <Select defaultValue="admin">
            <SelectTrigger className="w-full max-w-[200px]">
              <SelectValue placeholder="Select access type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="admin">Admin</SelectItem>
              <SelectItem value="user">User</SelectItem>
              <SelectItem value="viewer">Viewer</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="pt-4">
        <Button className="typography-button-medium-semibold bg-[#1971C2]">Save</Button>
      </div>
    </div>
  );
}