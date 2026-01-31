import React from "react";
import CollectionClient from "./CollectionClient";
import { getCollection } from "@/app/services/collectionService";
import { authService } from "@/app/services/authService";
import { notFound } from "next/navigation";

export default async function CollectionPage({ params }) {
  const { id } = await params;
  const { data } = await getCollection(id);

  // Fetch current user (if logged in) to check ownership
  let currentUser = null;
  try {
    const userRes = await authService.getUser();
    currentUser = userRes.data;
  } catch (error) {
    // User might not be logged in, ignore
  }

  if (!data) return notFound();

  return <CollectionClient collection={data} currentUser={currentUser} />;
}
