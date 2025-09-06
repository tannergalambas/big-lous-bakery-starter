import { NextResponse } from 'next/server';

// Placeholder Instagram feed data
const MOCK_INSTAGRAM_POSTS = [
  {
    id: '1',
    image_url: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=400&fit=crop&crop=center',
    caption: 'Fresh out of the oven! Our signature chocolate chip cookies are ready to make your day sweeter 🍪✨',
    permalink: 'https://www.instagram.com/p/mock1/',
    timestamp: '2024-09-06T10:30:00+0000',
    like_count: 124,
    comments_count: 8
  },
  {
    id: '2',
    image_url: 'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=400&h=400&fit=crop&crop=center',
    caption: 'Custom birthday cake perfection! 🎂 Nothing makes us happier than celebrating life\'s special moments with you.',
    permalink: 'https://www.instagram.com/p/mock2/',
    timestamp: '2024-09-05T14:15:00+0000',
    like_count: 89,
    comments_count: 12
  },
  {
    id: '3',
    image_url: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&h=400&fit=crop&crop=center',
    caption: 'Behind the scenes: Our bakers start at 5 AM to bring you the freshest pastries every morning! 👨‍🍳💪',
    permalink: 'https://www.instagram.com/p/mock3/',
    timestamp: '2024-09-04T06:45:00+0000',
    like_count: 156,
    comments_count: 15
  },
  {
    id: '4',
    image_url: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=400&h=400&fit=crop&crop=center',
    caption: 'Apple season is here! 🍎 Try our famous apple cinnamon muffins made with locally sourced apples.',
    permalink: 'https://www.instagram.com/p/mock4/',
    timestamp: '2024-09-03T11:20:00+0000',
    like_count: 92,
    comments_count: 6
  },
  {
    id: '5',
    image_url: 'https://images.unsplash.com/photo-1557925923-cd4648e211a0?w=400&h=400&fit=crop&crop=center',
    caption: 'Weekend special: Artisan sourdough bread! 🍞 Limited quantities available. Get yours while they last!',
    permalink: 'https://www.instagram.com/p/mock5/',
    timestamp: '2024-09-02T08:00:00+0000',
    like_count: 78,
    comments_count: 4
  },
  {
    id: '6',
    image_url: 'https://images.unsplash.com/photo-1571115764595-644a1f56a55c?w=400&h=400&fit=crop&crop=center',
    caption: 'Cupcake decorating class was a success! 🧁 Thanks to everyone who joined us for a sweet afternoon of creativity.',
    permalink: 'https://www.instagram.com/p/mock6/',
    timestamp: '2024-09-01T16:30:00+0000',
    like_count: 134,
    comments_count: 18
  }
];

export async function GET() {
  try {
    // In a real implementation, you would:
    // 1. Use Instagram Basic Display API or Instagram Graph API
    // 2. Authenticate with access tokens
    // 3. Fetch real posts from the Instagram account
    
    // For now, return mock data
    return NextResponse.json({
      data: MOCK_INSTAGRAM_POSTS,
      success: true
    });
  } catch (error) {
    console.error('Instagram API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch Instagram posts', success: false },
      { status: 500 }
    );
  }
}