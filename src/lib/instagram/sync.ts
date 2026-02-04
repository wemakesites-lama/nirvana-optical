/**
 * Instagram API integration for syncing posts
 */

interface InstagramMedia {
  id: string;
  caption?: string;
  media_url: string;
  permalink: string;
  timestamp: string;
  like_count?: number;
  comments_count?: number;
  media_type: 'IMAGE' | 'VIDEO' | 'CAROUSEL_ALBUM';
}

interface InstagramResponse {
  data: InstagramMedia[];
  paging?: {
    cursors: {
      before: string;
      after: string;
    };
    next?: string;
  };
}

export async function fetchInstagramPosts(limit: number = 6): Promise<InstagramMedia[]> {
  const accessToken = process.env.INSTAGRAM_ACCESS_TOKEN;

  if (!accessToken) {
    throw new Error('Instagram access token not configured');
  }

  const url = new URL('https://graph.instagram.com/me/media');
  url.searchParams.set('fields', 'id,caption,media_url,permalink,timestamp,like_count,comments_count,media_type');
  url.searchParams.set('access_token', accessToken);
  url.searchParams.set('limit', limit.toString());

  const response = await fetch(url.toString());

  if (!response.ok) {
    const error = await response.json();
    throw new Error(`Instagram API error: ${error.error?.message || 'Unknown error'}`);
  }

  const data: InstagramResponse = await response.json();

  // Filter to only images (not videos)
  return data.data.filter(post => post.media_type === 'IMAGE' || post.media_type === 'CAROUSEL_ALBUM');
}

export async function refreshLongLivedToken(): Promise<string> {
  const accessToken = process.env.INSTAGRAM_ACCESS_TOKEN;

  if (!accessToken) {
    throw new Error('Instagram access token not configured');
  }

  const url = new URL('https://graph.instagram.com/refresh_access_token');
  url.searchParams.set('grant_type', 'ig_refresh_token');
  url.searchParams.set('access_token', accessToken);

  const response = await fetch(url.toString());

  if (!response.ok) {
    const error = await response.json();
    throw new Error(`Token refresh error: ${error.error?.message || 'Unknown error'}`);
  }

  const data = await response.json();
  return data.access_token;
}
