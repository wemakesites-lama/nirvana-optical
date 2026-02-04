"use client";

import { useState } from "react";
import Image from "next/image";
import { ImageUploader } from "./ImageUploader";
import type { InstagramPost } from "@/lib/database.types";

interface InstagramManagerProps {
  posts: InstagramPost[];
}

export function InstagramManager({ posts: initialPosts }: InstagramManagerProps) {
  const [posts, setPosts] = useState(initialPosts);
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    image_url: "",
    caption: "",
    permalink: "",
    like_count: 0,
    comment_count: 0,
    is_featured: false,
    is_active: true,
    sort_order: posts.length + 1,
  });

  const handleAdd = async () => {
    try {
      const response = await fetch("/api/admin/instagram", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const newPost = await response.json();
        setPosts([...posts, newPost]);
        setIsAdding(false);
        resetForm();
      }
    } catch (error) {
      console.error("Failed to add post:", error);
    }
  };

  const handleUpdate = async (id: string) => {
    try {
      const response = await fetch(`/api/admin/instagram/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const updatedPost = await response.json();
        setPosts(posts.map((p) => (p.id === id ? updatedPost : p)));
        setEditingId(null);
        resetForm();
      }
    } catch (error) {
      console.error("Failed to update post:", error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this post?")) return;

    try {
      const response = await fetch(`/api/admin/instagram/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setPosts(posts.filter((p) => p.id !== id));
      }
    } catch (error) {
      console.error("Failed to delete post:", error);
    }
  };

  const handleEdit = (post: InstagramPost) => {
    setFormData({
      image_url: post.image_url,
      caption: post.caption || "",
      permalink: post.permalink || "",
      like_count: post.like_count,
      comment_count: post.comment_count,
      is_featured: post.is_featured,
      is_active: post.is_active,
      sort_order: post.sort_order,
    });
    setEditingId(post.id);
    setIsAdding(false);
  };

  const resetForm = () => {
    setFormData({
      image_url: "",
      caption: "",
      permalink: "",
      like_count: 0,
      comment_count: 0,
      is_featured: false,
      is_active: true,
      sort_order: posts.length + 1,
    });
  };

  return (
    <div className="space-y-6">
      {/* Add New Button */}
      <div className="flex justify-between items-center">
        <button
          onClick={() => {
            setIsAdding(!isAdding);
            setEditingId(null);
            resetForm();
          }}
          className="rounded-lg bg-brand-green-500 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-green-600"
        >
          {isAdding ? "Cancel" : "Add New Post"}
        </button>
      </div>

      {/* Add/Edit Form */}
      {(isAdding || editingId) && (
        <div className="rounded-lg border border-gray-200 bg-white p-6">
          <h3 className="mb-4 text-lg font-semibold">
            {editingId ? "Edit Post" : "Add New Post"}
          </h3>

          <div className="space-y-4">
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Image
              </label>
              <ImageUploader
                value={formData.image_url}
                onChange={(url) => setFormData({ ...formData, image_url: url })}
                bucket="gallery"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Caption
              </label>
              <textarea
                value={formData.caption}
                onChange={(e) => setFormData({ ...formData, caption: e.target.value })}
                rows={3}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-brand-green-500 focus:outline-none focus:ring-1 focus:ring-brand-green-500"
                placeholder="Add a caption..."
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Instagram Link (Permalink)
              </label>
              <input
                type="url"
                value={formData.permalink}
                onChange={(e) => setFormData({ ...formData, permalink: e.target.value })}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-brand-green-500 focus:outline-none focus:ring-1 focus:ring-brand-green-500"
                placeholder="https://instagram.com/p/..."
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Likes
                </label>
                <input
                  type="number"
                  value={formData.like_count}
                  onChange={(e) =>
                    setFormData({ ...formData, like_count: parseInt(e.target.value) || 0 })
                  }
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-brand-green-500 focus:outline-none focus:ring-1 focus:ring-brand-green-500"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Comments
                </label>
                <input
                  type="number"
                  value={formData.comment_count}
                  onChange={(e) =>
                    setFormData({ ...formData, comment_count: parseInt(e.target.value) || 0 })
                  }
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-brand-green-500 focus:outline-none focus:ring-1 focus:ring-brand-green-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Sort Order
                </label>
                <input
                  type="number"
                  value={formData.sort_order}
                  onChange={(e) =>
                    setFormData({ ...formData, sort_order: parseInt(e.target.value) || 0 })
                  }
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-brand-green-500 focus:outline-none focus:ring-1 focus:ring-brand-green-500"
                />
              </div>
            </div>

            <div className="flex items-center gap-6">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={formData.is_featured}
                  onChange={(e) =>
                    setFormData({ ...formData, is_featured: e.target.checked })
                  }
                  className="h-4 w-4 rounded border-gray-300 text-brand-green-500 focus:ring-brand-green-500"
                />
                <span className="text-sm text-gray-700">Featured</span>
              </label>

              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={formData.is_active}
                  onChange={(e) =>
                    setFormData({ ...formData, is_active: e.target.checked })
                  }
                  className="h-4 w-4 rounded border-gray-300 text-brand-green-500 focus:ring-brand-green-500"
                />
                <span className="text-sm text-gray-700">Active</span>
              </label>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => (editingId ? handleUpdate(editingId) : handleAdd())}
                className="rounded-lg bg-brand-green-500 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-green-600"
              >
                {editingId ? "Update" : "Add"} Post
              </button>
              <button
                onClick={() => {
                  setIsAdding(false);
                  setEditingId(null);
                  resetForm();
                }}
                className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Posts Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <div
            key={post.id}
            className="group relative overflow-hidden rounded-lg border border-gray-200 bg-white"
          >
            <div className="relative aspect-square">
              <Image
                src={post.image_url}
                alt={post.caption || "Instagram post"}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
              {!post.is_active && (
                <div className="absolute inset-0 bg-gray-900/50 flex items-center justify-center">
                  <span className="rounded bg-white px-3 py-1 text-xs font-semibold text-gray-900">
                    Inactive
                  </span>
                </div>
              )}
            </div>

            <div className="p-4">
              <p className="line-clamp-2 text-sm text-gray-600">
                {post.caption || "No caption"}
              </p>
              <div className="mt-2 flex items-center gap-4 text-xs text-gray-500">
                <span>❤️ {post.like_count}</span>
                <span>💬 {post.comment_count}</span>
                {post.is_featured && (
                  <span className="rounded bg-brand-green-100 px-2 py-0.5 text-brand-green-700">
                    Featured
                  </span>
                )}
              </div>

              <div className="mt-4 flex gap-2">
                <button
                  onClick={() => handleEdit(post)}
                  className="flex-1 rounded bg-gray-100 px-3 py-1.5 text-xs font-semibold text-gray-700 hover:bg-gray-200"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(post.id)}
                  className="flex-1 rounded bg-red-50 px-3 py-1.5 text-xs font-semibold text-red-600 hover:bg-red-100"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {posts.length === 0 && !isAdding && (
        <div className="rounded-lg border-2 border-dashed border-gray-300 p-12 text-center">
          <svg
            className="mx-auto h-12 w-12 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">No Instagram posts</h3>
          <p className="mt-1 text-sm text-gray-500">
            Get started by adding your first Instagram post.
          </p>
          <button
            onClick={() => setIsAdding(true)}
            className="mt-4 rounded-lg bg-brand-green-500 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-green-600"
          >
            Add Post
          </button>
        </div>
      )}
    </div>
  );
}
