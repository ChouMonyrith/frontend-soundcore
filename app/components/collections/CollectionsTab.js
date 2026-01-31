"use client";

import { useEffect, useState, useCallback } from "react";
import {
  getCollections,
  getUserCollections,
} from "@/app/services/collectionService";
import { Loader2 } from "lucide-react";
import { CollectionDialog } from "./CollectionDialog";
import { EmptyCollections } from "./EmptyCollections";
import { CollectionCard } from "./CollectionCard";

export function CollectionsTab({ isProducer, profileId }) {
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newCollectionOpen, setNewCollectionOpen] = useState(false);

  const fetchCollections = useCallback(async () => {
    try {
      setLoading(true);
      let data;
      if (isProducer) {
        data = await getCollections();
      } else if (profileId) {
        data = await getUserCollections(profileId);
      }
      setCollections(data || []);
    } catch (error) {
      console.error("Error fetching collections:", error);
    } finally {
      setLoading(false);
    }
  }, [isProducer, profileId]);

  useEffect(() => {
    fetchCollections();
  }, [profileId, fetchCollections]);

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <Loader2 className="w-8 h-8 animate-spin text-neutral-500" />
      </div>
    );
  }

  // If viewing another user's profile and they have no collections
  if (!isProducer && collections.length === 0) {
    return (
      <div className="text-center py-20 bg-neutral-900/30 rounded-3xl border border-white/5 border-dashed">
        <h3 className="text-white font-medium mb-1">No public collections</h3>
        <p className="text-neutral-500 text-sm">
          This user hasn&apos;t created any collections yet.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-white">Your Collections</h2>

        {/* Only Producers (Owners) can see the Create Button */}
        {isProducer && (
          <CollectionDialog
            open={newCollectionOpen}
            onOpenChange={setNewCollectionOpen}
            onSuccess={fetchCollections}
            mode="create"
          />
        )}
      </div>

      {collections.length === 0 ? (
        <EmptyCollections onCreate={() => setNewCollectionOpen(true)} />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {collections.map((collection) => (
            <CollectionCard key={collection.id} collection={collection} />
          ))}
        </div>
      )}
    </div>
  );
}
