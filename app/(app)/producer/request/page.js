"use client";

import { PublicHeader } from "@/app/components/layout/PublicHeader";
import { Button } from "@/app/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { Textarea } from "@/app/components/ui/textarea";
import { useAuth } from "@/app/contexts/AuthContext";
import producerService from "@/app/services/producerService";
import { Mic2, Music, Sparkles } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export default function ProducerRequestPage() {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    display_name: "",
    bio: "",
    avatar_path: "",
    sales_count: 0,
    status: "pending",
    cover_image_path: "",
    social_links: {
      soundcloud: "",
      spotify: "",
      youtube: "",
      instagram: "",
      twitter: "",
      facebook: "",
    },
    location: "",
    website: "",
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.startsWith("social_links.")) {
      const socialKey = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        social_links: {
          ...prev.social_links,
          [socialKey]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (files && files.length > 0) {
      setFormData((prev) => ({
        ...prev,
        [name]: files[0],
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = new FormData();
      payload.append("display_name", formData.display_name);
      payload.append("bio", formData.bio);
      payload.append("location", formData.location);
      payload.append("website", formData.website);

      if (formData.avatar_path instanceof File) {
        payload.append("avatar", formData.avatar_path);
      }
      if (formData.cover_image_path instanceof File) {
        payload.append("cover_image", formData.cover_image_path);
      }

      payload.append("social_links", JSON.stringify(formData.social_links));

      await producerService.requestProducerStatus(payload);
      toast.success("Request Submitted", {
        description:
          "Your request to become a producer has been submitted successfully.",
      });
      //   router.push("/");
    } catch (error) {
      console.error("Failed to submit request:", error);
      toast.error("Submission Failed", {
        description:
          error.response?.data?.message ||
          "Something went wrong. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col font-sans relative overflow-hidden">
      {/* Header */}
      <PublicHeader />

      {/* Main Content Area */}
      <div className="flex-1 flex items-center justify-center p-4 relative">
        {/* Background Ambience */}
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-violet-600/10 rounded-full blur-[120px]"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px]"></div>
        </div>

        <Card className="w-full max-w-lg bg-neutral-900/50 border-white/10 backdrop-blur-xl shadow-2xl relative z-10">
          <CardHeader className="space-y-4">
            <div className="w-14 h-14 bg-linear-to-br from-violet-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-violet-500/20 mb-2">
              <Mic2 className="w-7 h-7 text-white" />
            </div>
            <div>
              <CardTitle className="text-2xl md:text-3xl font-bold text-white">
                Become a Producer
              </CardTitle>
              <CardDescription className="text-neutral-400 mt-2 text-base">
                Join our community of creators. Set up your profile to start
                selling your sounds on SoundCore.
              </CardDescription>
            </div>
          </CardHeader>

          {!user.producer_profile ? (
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label
                    htmlFor="display_name"
                    className="text-neutral-300 font-medium"
                  >
                    Artist / Display Name
                  </Label>
                  <div className="relative">
                    <Music className="absolute left-3 top-3 h-4 w-4 text-neutral-500" />
                    <Input
                      id="display_name"
                      name="display_name"
                      placeholder="e.g. Bass Master"
                      value={formData.display_name}
                      onChange={handleChange}
                      required
                      className="pl-10 bg-neutral-950/50 border-white/10 text-white placeholder:text-neutral-600 h-11 focus-visible:ring-violet-500 focus-visible:border-violet-500"
                    />
                  </div>
                  <p className="text-xs text-neutral-500">
                    This is the name that will be displayed on your profile and
                    products.
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bio" className="text-neutral-300 font-medium">
                    Bio
                  </Label>
                  <Textarea
                    id="bio"
                    name="bio"
                    placeholder="Tell us about your style, equipment, and experience..."
                    value={formData.bio}
                    onChange={handleChange}
                    rows={5}
                    className="bg-neutral-950/50 border-white/10 text-white placeholder:text-neutral-600 resize-none focus-visible:ring-violet-500 focus-visible:border-violet-500"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label
                      htmlFor="location"
                      className="text-neutral-300 font-medium"
                    >
                      Location
                    </Label>
                    <Input
                      id="location"
                      name="location"
                      placeholder="e.g. Los Angeles, CA"
                      value={formData.location}
                      onChange={handleChange}
                      className="bg-neutral-950/50 border-white/10 text-white placeholder:text-neutral-600 focus-visible:ring-violet-500 focus-visible:border-violet-500"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="website"
                      className="text-neutral-300 font-medium"
                    >
                      Website
                    </Label>
                    <Input
                      id="website"
                      name="website"
                      type="url"
                      placeholder="https://your-site.com"
                      value={formData.website}
                      onChange={handleChange}
                      className="bg-neutral-950/50 border-white/10 text-white placeholder:text-neutral-600 focus-visible:ring-violet-500 focus-visible:border-violet-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label
                      htmlFor="avatar_path"
                      className="text-neutral-300 font-medium"
                    >
                      Avatar
                    </Label>
                    <Input
                      id="avatar_path"
                      name="avatar_path"
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="bg-neutral-950/50 border-white/10 text-white file:text-white file:bg-neutral-800 file:border-0 file:rounded-md file:mr-4 file:px-2 file:py-1 cursor-pointer focus-visible:ring-violet-500 focus-visible:border-violet-500"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="cover_image_path"
                      className="text-neutral-300 font-medium"
                    >
                      Cover Image
                    </Label>
                    <Input
                      id="cover_image_path"
                      name="cover_image_path"
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="bg-neutral-950/50 border-white/10 text-white file:text-white file:bg-neutral-800 file:border-0 file:rounded-md file:mr-4 file:px-2 file:py-1 cursor-pointer focus-visible:ring-violet-500 focus-visible:border-violet-500"
                    />
                  </div>
                </div>

                <div className="space-y-4 pt-4 border-t border-white/10">
                  <Label className="text-neutral-300 font-medium text-lg">
                    Social Links
                  </Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {Object.keys(formData.social_links).map((platform) => (
                      <div key={platform} className="space-y-2">
                        <Label
                          htmlFor={`social_links.${platform}`}
                          className="text-neutral-400 capitalize text-sm"
                        >
                          {platform}
                        </Label>
                        <Input
                          id={`social_links.${platform}`}
                          name={`social_links.${platform}`}
                          placeholder={`Your ${platform} URL`}
                          value={formData.social_links[platform]}
                          onChange={handleChange}
                          className="bg-neutral-950/50 border-white/10 text-white placeholder:text-neutral-600 focus-visible:ring-violet-500 focus-visible:border-violet-500"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-2 flex gap-3">
                  <Link href="/" className="flex-1">
                    <Button
                      variant="outline"
                      type="button"
                      className="w-full h-11 border-white/10 text-neutral-300 hover:bg-white/5 hover:text-white bg-transparent"
                    >
                      Cancel
                    </Button>
                  </Link>
                  <Button
                    type="submit"
                    className="flex-1 h-11 bg-violet-600 hover:bg-violet-500 text-white font-semibold shadow-lg shadow-violet-500/25"
                    disabled={loading}
                  >
                    {loading ? (
                      "Submitting..."
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4 mr-2" /> Submit Request
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          ) : (
            <CardContent>
              <p className="text-neutral-400 mt-2 text-base">
                You have already requested to become a producer.
              </p>
            </CardContent>
          )}
        </Card>
      </div>
    </div>
  );
}
