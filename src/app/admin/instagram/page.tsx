import { createClient } from "@/lib/supabase/server";
import { InstagramManager } from "@/components/admin/InstagramManager";
import type { InstagramPost } from "@/lib/database.types";

export const metadata = {
  title: "Instagram Posts - Admin",
  description: "Manage Instagram feed posts",
};

export default async function InstagramAdminPage() {
  const supabase = await createClient();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const db = supabase as any;

  const { data: posts } = await db
    .from("instagram_posts")
    .select("*")
    .order("sort_order", { ascending: true });

  const instagramPosts = (posts || []) as InstagramPost[];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-brand-black">Instagram Feed</h1>
        <p className="mt-2 text-muted-foreground">
          Manage Instagram posts displayed on the homepage. Add new posts manually or sync from Instagram.
        </p>
      </div>

      <InstagramManager posts={instagramPosts} />
    </div>
  );
}
