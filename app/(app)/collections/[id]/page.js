import React from "react";
import CollectionClient from "./CollectionClient";
import { getCollection } from "@/app/services/collectionService";

export default async function CollectionPage({ params }) {
  const { id } = await params;
  const { data } = await getCollection(id);

  console.log("Collection:", data);

  if (!data) return notFound();

  return <CollectionClient collection={data} />;
}
