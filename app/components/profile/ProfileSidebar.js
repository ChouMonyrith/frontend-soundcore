import { Twitter, Instagram, Globe, Layers, Youtube } from "lucide-react";

export default function ProfileSidebar({ bio, social_links }) {
  console.log("Social Links", social_links);
  return (
    <>
      <div className="bg-neutral-900/30 backdrop-blur-md border border-white/5 rounded-3xl p-6">
        <h3 className="text-white font-semibold mb-3">About</h3>
        <p className="text-neutral-400 text-sm leading-relaxed mb-8">{bio}</p>
        <div>
          <h3 className="text-neutral-400 font-medium mb-3">
            Other Social Links
          </h3>
        </div>
        <div className="flex gap-4">
          <SocialButton icon={Twitter} href={social_links.twitter} />
          <SocialButton icon={Instagram} href={social_links.instagram} />
          <SocialButton icon={Youtube} href={social_links.youtube} />
        </div>
      </div>

      <div className="bg-linear-to-br from-violet-900/20 to-indigo-900/20 border border-white/5 rounded-3xl p-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-violet-500/10 rounded-lg">
            <Layers className="w-5 h-5 text-violet-400" />
          </div>
          <div className="font-semibold text-white">Elite Author</div>
        </div>
        <p className="text-xs text-neutral-400">
          Top 5% of sellers this month.
        </p>
      </div>
    </>
  );
}

function SocialButton({ icon: Icon, href }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="w-10 h-10 rounded-full bg-neutral-800 flex items-center justify-center text-neutral-400 hover:bg-white hover:text-black transition-all"
    >
      <Icon className="w-6 h-6" />
    </a>
  );
}
