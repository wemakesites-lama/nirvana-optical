import type { Metadata } from "next";
import { PageHeader } from "@/components/shared/PageHeader";
import { GalleryGrid } from "@/components/shared/GalleryGrid";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "Eyewear Collection",
  description:
    "Browse our collection of designer frames, sunglasses from Damar Optical brands, and CooperVision contact lenses at Nirvana Optical Mahikeng.",
};

async function getGalleryImages() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("gallery_images")
    .select("*")
    .order("sort_order", { ascending: true });

  if (error) {
    console.error("Error fetching gallery images:", error);
    return [];
  }

  return data ?? [];
}

export default async function GalleryPage() {
  const images = await getGalleryImages();

  return (
    <>
      <PageHeader
        title="Our Collection"
        subtitle="Explore our curated range of frames, sunglasses, and CooperVision contact lenses."
      />

      <section className="px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="sr-only">Browse Our Eyewear</h2>
          <GalleryGrid images={images} />
        </div>
      </section>
    </>
  );
}
