import { InstagramSyncManager } from "@/components/admin/InstagramSyncManager";

export const metadata = {
  title: "Sync Instagram - Admin",
  description: "Sync posts from Instagram API",
};

export default function InstagramSyncPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-brand-black">Instagram API Sync</h1>
        <p className="mt-2 text-muted-foreground">
          Connect your Instagram account to automatically sync posts to your website.
        </p>
      </div>

      <InstagramSyncManager />
    </div>
  );
}
