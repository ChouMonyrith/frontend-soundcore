"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/components/ui/dialog";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { Textarea } from "@/app/components/ui/textarea";
import { Settings, Loader2 } from "lucide-react";
import { updateProfile } from "@/app/services/profileService";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function EditProfileDialog({ user }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const [formData, setFormData] = useState({
    display_name: user?.name || "",
    bio: user?.bio || "",
    location: user?.location || "",
    website: user?.website || "",
    social_links: user?.socials || {},
  });

  const [files, setFiles] = useState({
    avatar: null,
    cover_image: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSocialChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      social_links: {
        ...prev.social_links,
        [name]: value,
      },
    }));
  };

  const handleFileChange = (e) => {
    const { name, files: selectedFiles } = e.target;
    if (selectedFiles?.[0]) {
      setFiles((prev) => ({
        ...prev,
        [name]: selectedFiles[0],
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const data = new FormData();
      data.append("display_name", formData.display_name);
      data.append("bio", formData.bio);
      data.append("location", formData.location);
      data.append("website", formData.website);

      // Append Social Links as JSON? Or individual fields?
      // Backend expects 'social_links' array.
      // Let's iterate and append as array/object structure if needed or just stringify if backend casts it,
      // but Laravel casts 'array', so key-value pairs might be better sent as social_links[twitter], etc.
      // Let's try appending individually.
      Object.keys(formData.social_links).forEach((key) => {
        if (formData.social_links[key]) {
          data.append(`social_links[${key}]`, formData.social_links[key]);
        }
      });

      if (files.avatar) {
        data.append("avatar", files.avatar);
      }
      if (files.cover_image) {
        data.append("cover_image", files.cover_image);
      }

      await updateProfile(data);
      toast.success("Profile updated successfully");
      setIsOpen(false);
      router.refresh();
      window.location.reload();
    } catch (error) {
      console.error(error);
      if (error.response?.data?.errors) {
        const errors = error.response.data.errors;
        Object.values(errors)
          .flat()
          .forEach((msg) => toast.error(msg));
      } else {
        toast.error("Failed to update profile");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="bg-black/20 backdrop-blur-md border-white/10 text-white hover:bg-black/40 border-none"
        >
          <Settings className="w-4 h-4 mr-2" /> Settings
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-neutral-900 border-neutral-800 text-neutral-100 sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 mt-4">
          <div className="space-y-4">
            {/* Text Fields */}
            <div className="grid gap-2">
              <Label htmlFor="display_name">Display Name</Label>
              <Input
                id="display_name"
                name="display_name"
                value={formData.display_name}
                onChange={handleChange}
                placeholder="Your Name"
                className="bg-neutral-950 border-neutral-800 focus:ring-violet-500"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                id="bio"
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                placeholder="Tell us about yourself"
                className="bg-neutral-950 border-neutral-800 focus:ring-violet-500 min-h-[100px]"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="City, Country"
                  className="bg-neutral-950 border-neutral-800 focus:ring-violet-500"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="website">Website</Label>
                <Input
                  id="website"
                  name="website"
                  value={formData.website}
                  onChange={handleChange}
                  placeholder="https://..."
                  className="bg-neutral-950 border-neutral-800 focus:ring-violet-500"
                />
              </div>
            </div>

            {/* Social Links */}
            <div className="space-y-3">
              <Label>Social Links</Label>
              <div className="grid grid-cols-2 gap-4">
                <Input
                  name="twitter"
                  value={formData.social_links?.twitter || ""}
                  onChange={handleSocialChange}
                  placeholder="Twitter URL"
                  className="bg-neutral-950 border-neutral-800"
                />
                <Input
                  name="instagram"
                  value={formData.social_links?.instagram || ""}
                  onChange={handleSocialChange}
                  placeholder="Instagram URL"
                  className="bg-neutral-950 border-neutral-800"
                />
                <Input
                  name="youtube"
                  value={formData.social_links?.youtube || ""}
                  onChange={handleSocialChange}
                  placeholder="YouTube URL"
                  className="bg-neutral-950 border-neutral-800"
                />
              </div>
            </div>

            {/* File Uploads */}
            <div className="space-y-4 pt-4 border-t border-neutral-800">
              <Label>Profile Images</Label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label
                    htmlFor="avatar"
                    className="block mb-2 text-xs text-neutral-400"
                  >
                    Avatar
                  </Label>
                  <div className="flex items-center gap-4">
                    <div className="relative w-full">
                      <Input
                        id="avatar"
                        name="avatar"
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="bg-neutral-950 border-neutral-800 text-sm file:text-violet-400 file:bg-neutral-900 file:border-0 file:rounded-md file:mr-4 file:px-4 file:py-2 hover:file:bg-neutral-800 cursor-pointer"
                      />
                    </div>
                  </div>
                </div>
                <div>
                  <Label
                    htmlFor="cover_image"
                    className="block mb-2 text-xs text-neutral-400"
                  >
                    Cover Image
                  </Label>
                  <div className="relative w-full">
                    <Input
                      id="cover_image"
                      name="cover_image"
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="bg-neutral-950 border-neutral-800 text-sm file:text-violet-400 file:bg-neutral-900 file:border-0 file:rounded-md file:mr-4 file:px-4 file:py-2 hover:file:bg-neutral-800 cursor-pointer"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-4">
            <Button
              type="submit"
              disabled={isLoading}
              className="bg-violet-600 hover:bg-violet-700 text-white min-w-[100px]"
            >
              {isLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                "Save Changes"
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
