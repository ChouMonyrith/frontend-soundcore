"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import producerService from "@/app/services/producerService";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Textarea } from "@/app/components/ui/textarea";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/app/components/ui/card";
import { Label } from "@/app/components/ui/label";
import { toast } from "sonner";
import { Mic2, Music, Sparkles } from "lucide-react";
import Link from "next/link";
import { PublicHeader } from "@/app/components/layout/PublicHeader";

export default function ProducerRequestPage() {
  const [formData, setFormData] = useState({
    display_name: "",
    bio: "",
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await producerService.requestProducerStatus(formData);
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
        </Card>
      </div>
    </div>
  );
}
