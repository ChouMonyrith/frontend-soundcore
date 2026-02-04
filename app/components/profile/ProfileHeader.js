"use client";

import { Button } from "@/app/components/ui/button";
import {
  Calendar,
  CheckCircle2,
  Link as LinkIcon,
  MapPin,
  MessageCircle,
  MoreHorizontal,
  User2Icon,
  UserPlus,
} from "lucide-react";
import Image from "next/image";
import EditProfileDialog from "./EditProfileDialog";

export default function ProfileHeader({ user, onFollow, isOwnProfile }) {
  console.log("User", user);
  return (
    <>
      <div className="relative h-64 md:h-80 w-full overflow-hidden bg-neutral-900">
        {user.cover_image ? (
          <Image
            src={user.cover_image}
            alt="Cover"
            width={1920}
            height={920}
            className="absolute inset-0 w-full h-full object-cover"
            unoptimized
          />
        ) : (
          <div className="absolute inset-0 bg-neutral-800"></div>
        )}
        <div className="absolute inset-0 bg-linear-to-t from-neutral-950 via-neutral-950/20 to-transparent"></div>

        {isOwnProfile && (
          <div className="absolute top-4 right-4 md:top-8 md:right-8">
            <EditProfileDialog user={user} />
          </div>
        )}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
        <div className="flex flex-col md:flex-row items-start gap-6 -mt-20">
          {/* Avatar */}
          <div className="relative group shrink-0 mx-auto md:mx-0">
            <div className="h-32 w-32 md:h-40 md:w-40 rounded-3xl p-1.5 bg-neutral-950 ring-4 ring-neutral-900/50">
              {user.avatar ? (
                <Image
                  src={user.avatar}
                  alt="Avatar"
                  fill
                  className="object-cover rounded-3xl"
                  unoptimized
                />
              ) : (
                <div className="h-32 w-32 md:h-40 md:w-40 rounded-3xl p-1.5 bg-neutral-950 ring-4 flex items-center justify-center">
                  <User2Icon className="w-12 h-12 text-neutral-400" />
                </div>
              )}
            </div>
            <div className="absolute bottom-4 right-4 md:right-[-4px] w-6 h-6 bg-neutral-950 rounded-full flex items-center justify-center">
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
                    <a>{user.role}</a>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-neutral-500" />
                    <span>{user.location}</span>
                  </div>
                  <div className="flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer">
                    <LinkIcon className="w-4 h-4 text-neutral-500" />
                    <a
                      href={user.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-violet-400"
                    >
                      {user.website}
                    </a>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4 text-neutral-500" />
                    <span>Joined {user.join_date || user.joinDate}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-center md:justify-end gap-3">
                {!isOwnProfile && (
                  <>
                    <Button
                      onClick={onFollow}
                      className={`min-w-[120px] transition-all duration-300 ${
                        user.is_following
                          ? "bg-neutral-800 text-white hover:bg-neutral-700"
                          : "bg-white text-black hover:bg-neutral-200"
                      }`}
                    >
                      {user.is_following ? (
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
                  </>
                )}
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
