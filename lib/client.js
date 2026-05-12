import { createClient } from "@sanity/client";
import { createImageUrlBuilder } from "@sanity/image-url";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;

export const hasSanityConfig = Boolean(projectId);

export const client = hasSanityConfig
  ? createClient({
      projectId,
      dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
      apiVersion: "2024-01-01",
      useCdn: true,
      token: process.env.SANITY_TOKEN,
    })
  : null;

const builder = client ? createImageUrlBuilder(client) : null;

export const urlFor = (source) => (builder ? builder.image(source) : { url: () => "" });
