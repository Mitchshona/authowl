"use client";

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
import { Checkbox } from "@/components/ui/checkbox";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function Component() {
  return (
    <div className="space-y-[16px]">
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
          <Label className="typography-label-medium-medium">Name</Label>
          <div className="flex gap-[16px]">
            <div className="flex flex-col gap-[4px]">
              <span className="typography-label-small-caps-semibold uppercase text-[#5E6E7A]">
                given name
              </span>
              <Input
                placeholder="GIVEN NAME"
                defaultValue="John"
                className="typography-label-medium-regular text-[#5E6E7A]"
              />
            </div>
            <div className="flex flex-col gap-[4px]">
              <span className="typography-label-small-caps-semibold uppercase text-[#5E6E7A]">
                family name
              </span>
              <Input
                placeholder="FAMILY NAME"
                defaultValue="Lee"
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
        <div className="grid grid-cols-[400px_1fr] border-b-[1px] border-[#C3C9CD66] pb-4">
          <div className="flex flex-col gap-[4px]">
            <Label className="typography-label-medium-medium text-[#364A59]">
              Signature
            </Label>
            <p className="typography-label-medium-regular text-[#5E6E7A]">
              Create signatures for report sign offs.
            </p>
          </div>

          <div className="flex flex-col gap-[14px]">
            <Select defaultValue="signature1">
              <SelectTrigger className="w-full max-w-[200px]">
                <SelectValue placeholder="Select signature" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="signature1">Signature 1</SelectItem>
                <SelectItem value="signature2">Signature 2</SelectItem>
              </SelectContent>
            </Select>
            <div className="border rounded-lg p-4">
              <img
                src="/placeholder.svg?height=60&width=200"
                alt="Signature Preview"
                className="opacity-50"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="default" />
              <label
                htmlFor="default"
                className="typography-label-medium-regular text-[#5E6E7A]"
              >
                Set as default
              </label>
            </div>
          </div>
        </div>

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