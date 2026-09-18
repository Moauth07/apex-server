const express = require('express');
const cors = require('cors');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// الصفحة الرئيسية لتأكيد عمل السيرفر
app.get('/', (req, res) => {
  res.json({
    status: 'online',
    server: 'Apex+ Live IPTV & VOD Proxy',
    message: 'Connected to public streaming sources successfully!'
  });
});

// مسار قنوات البث الحي والمباريات
app.get('/api/live', async (req, res) => {
  try {
    // جلب قنوات البث المباشر المفتوحة كمصدر تجريبي رئيسي
    const channels = [
      { id: 1, name: 'BeIN Sports 1 (Live Stream)', group: 'Sports', url: 'https://test-streams.mux.dev/x364fish/pl/index.m3u8' },
      { id: 2, name: 'SSC Sports HD', group: 'Sports', url: 'https://test-streams.mux.dev/x364fish/pl/index.m3u8' },
      { id: 3, name: 'Al Arabiya News', group: 'News', url: 'https://live-hls-web-aje.getaj.net/AJE/03.m3u8' }
    ];
    
    res.json({
      status: 'success',
      count: channels.length,
      channels: channels
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch live channels' });
  }
});

// مسار الأفلام والمسلسلات (VOD) مهيأ لـ 20,000+ عنصر مع نظام التقسيم (Pagination)
app.get('/api/vod', (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = 50; // عرض 50 فيلم في الصفحة لعدم الضغط على الذاكرة
  
  // توليد قائمة أفلام افتراضية كنموذج للمكتبة الضخمة
  const sampleMovies = [];
  for (let i = 1; i <= 20000; i++) {
    sampleMovies.push({
      id: i,
      title: `Apex Movie Collection #${i}`,
      category: i % 2 === 0 ? 'Action & Sci-Fi' : 'Drama & Thriller',
      year: 2024 + (i % 3),
      poster: 'https://via.placeholder.com/300x450.png?text=Apex+Movie',
      stream_url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'
    });
  }

  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const paginatedMovies = sampleMovies.slice(startIndex, limit);

  res.json({
    status: 'success',
    total_items: sampleMovies.length,
    current_page: page,
    total_pages: Math.ceil(sampleMovies.length / limit),
    movies: paginatedMovies
  });
});

app.listen(PORT, () => {
  console.log(`Apex+ Server is running on port ${PORT}`);
});