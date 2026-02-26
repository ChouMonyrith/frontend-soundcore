import React from "react";
import CollectionClient from "./CollectionClient";
import { getCollection } from "@/app/services/collectionService";
import { getUser } from "@/app/services/authService";
import { notFound } from "next/navigation";

export default async function CollectionPage({ params }) {
  const { id } = await params;
  const { data } = await getCollection(id);

  let currentUser = null;
  try {
    const userRes = await getUser();
    currentUser = userRes.data;
  } catch (error) {}

  if (!data) return notFound();

  return <CollectionClient collection={data} currentUser={currentUser} />;
}
