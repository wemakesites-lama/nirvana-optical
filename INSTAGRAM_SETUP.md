# Instagram Feed Setup Guide

Your Instagram feed is set up for **@nirvana_optical**!

## 🎯 Quick Start: Add Posts Manually

### Method 1: Using Admin Dashboard (Easiest)

1. **Visit Admin Panel**
   - Go to: http://localhost:3001/admin/instagram
   - Login if needed

2. **Add a Post**
   - Click "Add New Post"
   - Upload image (download from your Instagram first)
   - Add caption, likes, comments
   - Set Instagram post URL in "Permalink" field
   - Click "Add Post"

3. **Get Instagram Post URLs**
   - Visit https://www.instagram.com/nirvana_optical/
   - Click on a post
   - Copy the URL (e.g., `https://www.instagram.com/p/ABC123/`)

---

## 🤖 Method 2: Bulk Import Script

### Prerequisites
```bash
npm install tsx
```

### Steps

1. **Download Images**
   - Save your Instagram images to `/public/instagram/`
   - Name them: `post-1.jpg`, `post-2.jpg`, etc.

2. **Update Script**
   - Edit `scripts/add-instagram-posts.ts`
   - Add your post data to the `posts` array

3. **Run Script**
   ```bash
   npx tsx scripts/add-instagram-posts.ts
   ```

---

## 🔗 Method 3: Instagram API Integration (Advanced)

For automatic syncing, you'll need to set up Instagram Basic Display API:

### Requirements
- Instagram Business or Creator account
- Facebook Developer account
- App ID and App Secret

### Setup Steps

1. **Create Facebook App**
   - Go to: https://developers.facebook.com/
   - Create new app → Business → Instagram Basic Display

2. **Configure Instagram Basic Display**
   - Add Instagram tester account
   - Generate access token

3. **Add Environment Variables**
   ```bash
   INSTAGRAM_ACCESS_TOKEN=your_token_here
   INSTAGRAM_USER_ID=your_user_id
   ```

4. **Create API Route**
   - I can help create an API route to fetch and sync posts automatically
   - Just let me know when you have the credentials!

---

## 📝 Quick Tips

### Getting Engagement Numbers
1. Open Instagram app
2. Click on a post
3. View insights (Business/Creator accounts only)
4. Note likes and comments

### Recommended Posts to Feature
- New eyewear arrivals
- Customer testimonials (with permission)
- Store events
- Behind-the-scenes content
- Product showcases

---

## 🎨 Current Setup

- **Username**: @nirvana_optical
- **Profile Link**: https://www.instagram.com/nirvana_optical
- **Display Limit**: 6 posts on homepage
- **Location**: Between Testimonials and CTA section

---

## ❓ Need Help?

- Update Instagram handle: Edit `src/components/shared/InstagramFeed.tsx`
- Change display count: Update `limit(6)` in `src/app/(public)/page.tsx`
- Modify grid layout: Edit InstagramFeed component grid classes

---

**Current Status**: ✅ Feed is live at http://localhost:3001
