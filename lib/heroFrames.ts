import { readdir } from "node:fs/promises";
import path from "node:path";

import {
  HERO_FRAME_DIRECTORY,
  HERO_FRAME_PUBLIC_PATH,
} from "@/constants/heroScrollytelling";

const supportedImageExtensions = new Set([
  ".avif",
  ".webp",
  ".png",
  ".jpg",
  ".jpeg",
]);

const naturalSort = new Intl.Collator("en", {
  numeric: true,
  sensitivity: "base",
});

export async function getHeroFrameSources() {
  const framesDirectory = path.join(
    process.cwd(),
    "public",
    HERO_FRAME_DIRECTORY
  );

  const entries = await readdir(framesDirectory, { withFileTypes: true });

  return entries
    .filter((entry) => entry.isFile())
    .map((entry) => entry.name)
    .filter((fileName) =>
      supportedImageExtensions.has(path.extname(fileName).toLowerCase())
    )
    .sort((a, b) => naturalSort.compare(a, b))
    .map((fileName) => `${HERO_FRAME_PUBLIC_PATH}/${encodeURIComponent(fileName)}`);
}
