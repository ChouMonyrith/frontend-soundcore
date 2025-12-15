"use client";

import { useState } from "react";
import {
  Settings,
  CheckCircle2,
  MapPin,
  Link as LinkIcon,
  Calendar,
  UserPlus,
  MessageCircle,
  MoreHorizontal,
} from "lucide-react";
import { Button } from "@/app/components/ui/button";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/app/components/ui/avatar";

export default function ProfileHeader({ user }) {
  const [isFollowing, setIsFollowing] = useState(false);

  return (
    <>
      {/* Cover Image Section */}
      <div className="relative h-64 md:h-80 w-full overflow-hidden">
        <div className={`absolute inset-0 ${user.coverImage}`}></div>
        <div className="absolute inset-0 bg-linear-to-t from-neutral-950 via-neutral-950/20 to-transparent"></div>

        <div className="absolute top-4 right-4 md:top-8 md:right-8">
          <Button
            variant="outline"
            className="bg-black/20 backdrop-blur-md border-white/10 text-white hover:bg-black/40 border-none"
          >
            <Settings className="w-4 h-4 mr-2" /> Settings
          </Button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
        <div className="flex flex-col md:flex-row items-start gap-6 -mt-20">
          {/* Avatar */}
          <div className="relative group shrink-0 mx-auto md:mx-0">
            <div className="h-32 w-32 md:h-40 md:w-40 rounded-3xl p-1.5 bg-neutral-950 ring-4 ring-neutral-900/50">
              <Avatar className="h-full w-full rounded-2xl">
                <AvatarImage src="/path-to-image.jpg" />
                <AvatarFallback className="text-4xl font-bold bg-linear-to-br from-violet-500 to-indigo-600 text-white">
                  {user.avatar}
                </AvatarFallback>
              </Avatar>
            </div>
            <div className="absolute bottom-4 right-[-8px] md:right-[-4px] w-6 h-6 bg-neutral-950 rounded-full flex items-center justify-center">
              <div className="w-4 h-4 bg-emerald-500 rounded-full border-2 border-neutral-950"></div>
            </div>
          </div>

          {/* User Info & Actions */}
          <div className="flex-1 pt-2 md:pt-24 w-full text-center md:text-left">
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
              <div>
                <div className="flex items-center justify-center md:justify-start gap-2 mb-1">
                  <h1 className="text-3xl font-bold text-white tracking-tight">
                    {user.name}
                  </h1>
                  <CheckCircle2 className="w-5 h-5 text-blue-400 fill-blue-400/10" />
                </div>
                <div className="text-neutral-400 font-medium mb-4">
                  {user.handle}
                </div>

                <div className="flex flex-wrap justify-center md:justify-start items-center gap-4 text-sm text-neutral-400 mb-6">
                  <div className="flex items-center gap-1.5">
                    <BriefcaseIcon className="w-4 h-4 text-violet-400" />
                    <span>{user.role}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-neutral-500" />
                    <span>{user.location}</span>
                  </div>
                  <div className="flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer">
                    <LinkIcon className="w-4 h-4 text-neutral-500" />
                    <span className="text-violet-400">{user.website}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4 text-neutral-500" />
                    <span>Joined {user.joinDate}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-center md:justify-end gap-3">
                <Button
                  onClick={() => setIsFollowing(!isFollowing)}
                  className={`min-w-[120px] transition-all duration-300 ${
                    isFollowing
                      ? "bg-neutral-800 text-white hover:bg-neutral-700"
                      : "bg-white text-black hover:bg-neutral-200"
                  }`}
                >
                  {isFollowing ? (
                    "Following"
                  ) : (
                    <>
                      <UserPlus className="w-4 h-4 mr-2" /> Follow
                    </>
                  )}
                </Button>
                <Button
                  variant="outline"
                  className="border-white/10 text-neutral-300 hover:text-white hover:bg-white/5"
                >
                  <MessageCircle className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-neutral-400 hover:text-white"
                >
                  <MoreHorizontal className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function BriefcaseIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="14" x="2" y="7" rx="2" ry="2" />
      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
    </svg>
  );
}
