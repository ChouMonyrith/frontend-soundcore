import { Button } from "@/app/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/app/components/ui/popover";
import { useCopyLink } from "@/app/hooks/useCopyLink";
import { useNativeShare } from "@/app/hooks/useNativeShare";
import { getSocialLink } from "@/app/lib/share";
import {
  Copy,
  Facebook,
  Link as LinkIcon,
  MessageCircle,
  Send,
  Share2,
  Twitter,
} from "lucide-react";

export function ShareButton({ sound }) {
  const { share } = useNativeShare();
  const { copy } = useCopyLink();

  const handleNativeShare = () => {
    share({
      title: sound.name,
      text: sound.description,
      url: sound.url || window.location.href,
    });
  };

  const handleCopyLink = () => {
    const url = sound.url || window.location.href;
    copy(url);
  };

  const handleSocialShare = (platform) => {
    const links = getSocialLink({
      url: sound.url || window.location.href,
      title: sound.name,
    });
    if (links && links[platform]) {
      window.open(links[platform], "_blank", "noopener,noreferrer");
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="text-neutral-400 hover:text-white hover:bg-white/10 gap-2"
        >
          <Share2 className="w-4 h-4" />
          <span className="hidden sm:inline">Share</span>
        </Button>
      </PopoverTrigger>

      <PopoverContent
        align="end"
        className="w-72 bg-neutral-900/95 backdrop-blur-xl border-white/10 text-neutral-100 shadow-2xl p-4 rounded-xl"
      >
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="font-semibold text-sm text-white">
              Share this sound
            </h4>
          </div>

          {/* Copy Link Section */}
          <div className="flex items-center gap-2 p-2 rounded-lg bg-neutral-950 border border-white/5">
            <div className="bg-neutral-800 p-1.5 rounded-md">
              <LinkIcon className="w-3 h-3 text-neutral-400" />
            </div>
            <input
              readOnly
              value={sound.url || "https://soundcore.com/..."}
              className="bg-transparent border-none text-xs text-neutral-400 w-full focus:outline-none truncate"
            />
            <Button
              size="icon"
              variant="ghost"
              className="h-7 w-7 hover:bg-white/10"
              onClick={handleCopyLink}
            >
              <Copy className="w-3.5 h-3.5 text-neutral-300" />
            </Button>
          </div>

          {/* Social Grid */}
          <div className="grid grid-cols-4 gap-2">
            <SocialBtn
              onClick={() => handleSocialShare("facebook")}
              icon={Facebook}
              label="Facebook"
              color="hover:bg-blue-600 hover:text-white"
            />
            <SocialBtn
              onClick={() => handleSocialShare("twitter")}
              icon={Twitter}
              label="Twitter"
              color="hover:bg-sky-500 hover:text-white"
            />
            <SocialBtn
              onClick={() => handleSocialShare("telegram")}
              icon={Send}
              label="Telegram"
              color="hover:bg-blue-400 hover:text-white"
            />
            <SocialBtn
              onClick={() => handleSocialShare("whatsapp")}
              icon={MessageCircle}
              label="WhatsApp"
              color="hover:bg-green-500 hover:text-white"
            />
          </div>

          {/* Native Share (Mobile) */}
          <Button
            variant="outline"
            className="w-full  border-white/10 text-neutral-700 hover:text-white hover:bg-white/5 h-9 text-xs"
            onClick={handleNativeShare}
          >
            More Options...
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}

function SocialBtn({ onClick, icon: Icon, label, color }) {
  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center justify-center gap-1.5 p-2 rounded-lg bg-neutral-800/50 border border-white/5 text-white transition-all duration-200 ${color}`}
      title={`Share on ${label}`}
    >
      <Icon className="w-5 h-5" />
    </button>
  );
}
