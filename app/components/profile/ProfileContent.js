import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/app/components/ui/tabs";
import { Grid3x3, List, Layers } from "lucide-react";
import ProfileSoundCard from "./ProfileSoundCard";

export default function ProfileContent({ sounds }) {
  return (
    <Tabs defaultValue="sounds" className="w-full">
      <div className="flex items-center justify-between mb-6">
        <TabsList className="bg-neutral-900/50 border border-white/5 rounded-full p-1 h-12">
          <TabsTrigger
            value="sounds"
            className="rounded-full px-6 h-10 text-neutral-400 data-[state=active]:bg-neutral-800 data-[state=active]:text-white transition-all"
          >
            Sounds
          </TabsTrigger>
          <TabsTrigger
            value="collections"
            className="rounded-full px-6 h-10 text-neutral-400 data-[state=active]:bg-neutral-800 data-[state=active]:text-white transition-all"
          >
            Collections
          </TabsTrigger>
          <TabsTrigger
            value="liked"
            className="rounded-full px-6 h-10 text-neutral-400 data-[state=active]:bg-neutral-800 data-[state=active]:text-white transition-all"
          >
            Liked
          </TabsTrigger>
        </TabsList>

        <div className="hidden md:flex bg-neutral-900/50 rounded-lg p-1 border border-white/5">
          <button className="p-2 rounded bg-neutral-800 text-white shadow-sm">
            <Grid3x3 className="w-4 h-4" />
          </button>
          <button className="p-2 rounded text-neutral-500 hover:text-white">
            <List className="w-4 h-4" />
          </button>
        </div>
      </div>

      <TabsContent value="sounds" className="mt-0">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {sounds.map((sound) => (
            <ProfileSoundCard key={sound.id} sound={sound} />
          ))}
        </div>
      </TabsContent>

      <TabsContent value="collections">
        <div className="text-center py-20 bg-neutral-900/30 rounded-3xl border border-white/5 border-dashed">
          <Layers className="w-10 h-10 text-neutral-600 mx-auto mb-4" />
          <h3 className="text-white font-medium mb-1">No collections public</h3>
          <p className="text-neutral-500 text-sm">
            This user hasn&apos;t created any public collections yet.
          </p>
        </div>
      </TabsContent>
    </Tabs>
  );
}
