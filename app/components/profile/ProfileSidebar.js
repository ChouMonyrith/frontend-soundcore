import { Twitter, Instagram, Globe, Layers } from "lucide-react";

export default function ProfileSidebar({ bio }) {
  return (
    <>
      <div className="bg-neutral-900/30 backdrop-blur-md border border-white/5 rounded-3xl p-6">
        <h3 className="text-white font-semibold mb-3">About</h3>
        <p className="text-neutral-400 text-sm leading-relaxed mb-6">{bio}</p>
        <div className="flex gap-4">
          <SocialButton icon={Twitter} />
          <SocialButton icon={Instagram} />
          <SocialButton icon={Globe} />
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

function SocialButton({ icon: Icon }) {
  return (
    <button className="w-10 h-10 rounded-full bg-neutral-800 flex items-center justify-center text-neutral-400 hover:bg-white hover:text-black transition-all">
      <Icon className="w-4 h-4" />
    </button>
  );
}
