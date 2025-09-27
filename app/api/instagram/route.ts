import { NextResponse } from 'next/server';

// Simple in-memory cache
type CacheRecord = { data: any[]; ts: number } | null;
let CACHE: CacheRecord = null;

// Placeholder Instagram feed data (used when env vars are missing or API fails)
const MOCK_INSTAGRAM_POSTS = [
  {
    id: '1',
    image_url:
      'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800&h=800&fit=crop&crop=center',
    caption:
      'Fresh out of the oven! Our signature chocolate chip cookies are ready to make your day sweeter 🍪✨',
    permalink: 'https://www.instagram.com/p/DLP4xUtMZTf/?img_index=1',
    timestamp: '2024-09-06T10:30:00+0000',
    like_count: 124,
    comments_count: 8,
  },
  {
    id: '2',
    image_url:
      'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=800&h=800&fit=crop&crop=center',
    caption:
      "Custom birthday cake perfection! 🎂 Nothing makes us happier than celebrating life's special moments with you.",
    permalink: 'https://www.instagram.com/p/DPF28JgDBQT/',
    timestamp: '2024-09-05T14:15:00+0000',
    like_count: 89,
    comments_count: 12,
  },
  {
    id: '3',
    image_url:
      'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800&h=800&fit=crop&crop=center',
    caption:
      'Behind the scenes: Our bakers start at 5 AM to bring you the freshest pastries every morning! 👨‍🍳💪',
    permalink: 'https://www.instagram.com/p/DPFFnBvEflk/',
    timestamp: '2024-09-04T06:45:00+0000',
    like_count: 156,
    comments_count: 15,
  },
  {
    id: '4',
    image_url:
      'https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=800&h=800&fit=crop&crop=center',
    caption:
      'Apple season is here! 🍎 Try our famous apple cinnamon muffins made with locally sourced apples.',
    permalink: 'https://www.instagram.com/p/DO9H_wUiVqB/',
    timestamp: '2024-09-03T11:20:00+0000',
    like_count: 92,
    comments_count: 6,
  },
  {
    id: '5',
    image_url:
      'https://images.unsplash.com/photo-1557925923-cd4648e211a0?w=800&h=800&fit=crop&crop=center',
    caption:
      'Weekend special: Artisan sourdough bread! 🍞 Limited quantities available. Get yours while they last!',
    permalink: 'https://www.instagram.com/p/DO3ZTEUDSpD/?img_index=1',
    timestamp: '2024-09-02T08:00:00+0000',
    like_count: 78,
    comments_count: 4,
  },
  {
    id: '6',
    image_url:
      'https://images.unsplash.com/photo-1571115764595-644a1f56a55c?w=800&h=800&fit=crop&crop=center',
    caption:
      'Cupcake decorating class was a success! 🧁 Thanks to everyone who joined us for a sweet afternoon of creativity.',
    permalink: 'https://www.instagram.com/p/DOHkTfOCanw/',
    timestamp: '2024-09-01T16:30:00+0000',
    like_count: 134,
    comments_count: 18,
  },
];

function present(v?: string | null) {
  return typeof v === 'string' && v.trim().length > 0;
}

function mapMediaItem(i: any) {
  const mediaType = i.media_type as string | undefined;
  const imageUrl = mediaType === 'VIDEO' ? i.thumbnail_url : i.media_url;
  return {
    id: String(i.id),
    image_url: imageUrl,
    caption: i.caption || '',
    permalink: i.permalink,
    timestamp: i.timestamp,
    like_count: typeof i.like_count === 'number' ? i.like_count : 0,
    comments_count: typeof i.comments_count === 'number' ? i.comments_count : 0,
  };
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const limitParam = parseInt(url.searchParams.get('limit') || '6', 10);
  const limit = Number.isFinite(limitParam) && limitParam > 0 ? Math.min(limitParam, 12) : 6;

  const token = process.env.INSTAGRAM_GRAPH_TOKEN;
  const userId = process.env.IG_USER_ID || process.env.INSTAGRAM_USER_ID;
  const graphVersion = process.env.FACEBOOK_GRAPH_VERSION || 'v18.0';
  const cacheSeconds = parseInt(process.env.INSTAGRAM_CACHE_SECONDS || '600', 10);
  const disableFallback = (process.env.INSTAGRAM_DISABLE_FALLBACK || 'false').toLowerCase() === 'true';

  // If we have cached data and it's fresh, serve it
  if (CACHE && Date.now() - CACHE.ts < cacheSeconds * 1000) {
    return NextResponse.json({ data: CACHE.data.slice(0, limit), success: true, cached: true });
  }

  // Use Instagram Graph API if credentials are present
  if (present(token) && present(userId)) {
    try {
      const fields = [
        'id',
        'caption',
        'media_url',
        'permalink',
        'timestamp',
        'media_type',
        'thumbnail_url',
        // like_count/comments_count require permissions; if not available they will be undefined
        'like_count',
        'comments_count',
      ].join(',');
      const apiUrl = `https://graph.facebook.com/${graphVersion}/${userId}/media?fields=${encodeURIComponent(
        fields
      )}&limit=${limit}&access_token=${encodeURIComponent(token!)}`;

      const res = await fetch(apiUrl, { cache: 'no-store' });
      if (!res.ok) {
        const text = await res.text();
        console.error('Instagram Graph API error:', res.status, text);
        if (disableFallback) {
          return NextResponse.json(
            { success: false, error: 'Instagram API request failed', status: res.status },
            { status: 502 }
          );
        }
        return NextResponse.json({ data: MOCK_INSTAGRAM_POSTS.slice(0, limit), success: true, mock: true });
      }

      const json = await res.json();
      const items = Array.isArray(json.data) ? json.data : [];
      const mapped = items.map(mapMediaItem);

      // Cache and return
      CACHE = { data: mapped, ts: Date.now() };
      return NextResponse.json({ data: mapped.slice(0, limit), success: true });
    } catch (error) {
      console.error('Instagram API error:', error);
      if (disableFallback) {
        return NextResponse.json({ error: 'Failed to fetch Instagram posts', success: false }, { status: 500 });
      }
      return NextResponse.json({ data: MOCK_INSTAGRAM_POSTS.slice(0, limit), success: true, mock: true });
    }
  }

  // No credentials present: return mock data (non-breaking default)
  return NextResponse.json({ data: MOCK_INSTAGRAM_POSTS.slice(0, limit), success: true, mock: true });
}
