'use client';

import { useState } from 'react';
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Pencil, Upload } from "lucide-react";

export default function ProfilePage() {
  const router = useRouter();
  const [fullName, setFullName] = useState("John Doe");
  const [bio, setBio] = useState("Add bio");
  const [profilePhoto, setProfilePhoto] = useState("/images/profil.png");
  const [banner, setBanner] = useState("/images/banner.png");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      router.push("/");
    }, 1000);
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
    <div className="w-full mx-auto flex flex-col items-center">
      {/* Banner */}
      <div className="relative w-full max-w-3xl h-48 rounded-lg overflow-hidden">
        <img src={banner} alt="Banner" className="w-full h-full object-cover" />
        <button className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md">
          <Pencil className="w-5 h-5 text-gray-600" />
        </button>
      </div>

      {/* Profile Photo */}
      <div className="relative w-32 h-32 max-w-3xl rounded-full overflow-hidden border-4 border-white -mt-16">
        <img src={profilePhoto} alt="Profile" className="w-full h-full object-cover" />
        <button className="absolute bottom-2 right-2 p-2 bg-white rounded-full shadow-md">
          <Upload className="w-5 h-5 text-gray-600" />
        </button>
      </div>

      {/* Profile Details */}
      <Card className="mt-4 p-6 text-center">
        <CardContent>
          <div className="flex items-center justify-center gap-2">
            <Input
              className="text-2xl font-bold text-center border-none focus:ring-0"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
            <Pencil className="w-5 h-5 cursor-pointer" />
          </div>
          <Textarea
            className="mt-2 text-center border-none focus:ring-0"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          />
        </CardContent>
      </Card>

      {/* Submit Button */}
      <div className="text-center mt-4 mb-4">
        <Button type="submit" disabled={isLoading} className="px-6 py-2 text-lg">{isLoading ? 'Chargement...' : "Save Changes"}</Button>
      </div>
    </div>
    </form>
  );
}
