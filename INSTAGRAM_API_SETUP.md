# Instagram API Integration Guide

## Prerequisites

1. **Instagram Account Type**: Business or Creator account
2. **Facebook Account**: Needed to create the app
3. **Facebook Page**: Must be connected to your Instagram account

---

## Step 1: Create Facebook App

1. Go to https://developers.facebook.com/
2. Click **"My Apps"** → **"Create App"**
3. Select **"Consumer"** as app type
4. Fill in:
   - **App Name**: "Nirvana Optical Website"
   - **Contact Email**: Your email
5. Click **"Create App"**

---

## Step 2: Set Up Instagram Basic Display

1. In your Facebook App dashboard, scroll down to **"Add Products"**
2. Find **"Instagram Basic Display"** → Click **"Set Up"**
3. Click **"Create New App"** in Instagram Basic Display settings
4. Go to **"Basic Display"** tab
5. Fill in:
   - **Valid OAuth Redirect URIs**:
     ```
     https://yourdomain.com/api/instagram/callback
     http://localhost:3001/api/instagram/callback
     ```
   - **Deauthorize Callback URL**: `https://yourdomain.com/api/instagram/deauth`
   - **Data Deletion Request URL**: `https://yourdomain.com/api/instagram/delete`

6. Click **"Save Changes"**

---

## Step 3: Add Instagram Testers

1. Go to **"Roles"** → **"Instagram Testers"**
2. Click **"Add Instagram Testers"**
3. Enter your Instagram username: **nirvana_optical**
4. Go to your Instagram app (or instagram.com)
5. Navigate to: **Settings** → **Apps and Websites** → **Tester Invites**
6. Accept the invitation

---

## Step 4: Generate Access Token

### Method 1: Using the Graph API Explorer (Quick)

1. Go to **Basic Display** → **User Token Generator**
2. Click **"Generate Token"** next to your Instagram account
3. Authorize the app
4. Copy the **Access Token** (starts with `IGQ...`)

### Method 2: Manual Authorization (Production)

1. Get your **Instagram App ID** and **App Secret** from the Basic Display tab
2. Visit this URL in your browser (replace `{app-id}` and `{redirect-uri}`):
   ```
   https://api.instagram.com/oauth/authorize
     ?client_id={app-id}
     &redirect_uri={redirect-uri}
     &scope=user_profile,user_media
     &response_type=code
   ```
3. After authorization, you'll get a `code` in the redirect URL
4. Exchange code for access token (see Step 5)

---

## Step 5: Add Credentials to Environment

Add to your `.env.local`:

```bash
# Instagram API
INSTAGRAM_APP_ID=your_app_id
INSTAGRAM_APP_SECRET=your_app_secret
INSTAGRAM_ACCESS_TOKEN=your_long_lived_token
INSTAGRAM_USER_ID=your_instagram_user_id
```

---

## Step 6: Exchange for Long-Lived Token

Short-lived tokens expire in 1 hour. Exchange for a long-lived token (60 days):

Run this command (replace values):
```bash
curl -X GET \
  "https://graph.instagram.com/access_token?grant_type=ig_exchange_token&client_secret={app-secret}&access_token={short-lived-token}"
```

The response will include a `access_token` that lasts 60 days.

---

## Step 7: Auto-Refresh Token

Long-lived tokens expire after 60 days but can be refreshed. I'll create a cron job to handle this automatically.

---

## Alternative: Instagram Graph API (For Business Accounts)

If you have an Instagram Business account connected to a Facebook Page:

1. Use **Graph API** instead of Basic Display
2. Get permanent tokens (no 60-day expiry)
3. More features (comments, replies, mentions)

**Setup**:
1. Use **Facebook Login** product instead
2. Connect your Instagram Business Account to Facebook Page
3. Request `instagram_basic` permission
4. Use Page Access Token

---

## Testing Your Connection

After setup, test with:
```bash
curl "https://graph.instagram.com/me/media?fields=id,caption,media_url,permalink,timestamp,like_count,comments_count&access_token={your-token}"
```

---

## Next Steps

After completing setup:
1. Add credentials to `.env.local`
2. Run the sync script I'll create
3. Set up automatic daily syncing
