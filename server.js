const express = require('express');
const cors = require('cors');
const axios = require('axios');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// عرض واجهة المستخدم (index.html) مباشرة عند الدخول للرابط الرئيسي
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// مسار قنوات البث الحي والمباريات
app.get('/api/live', async (req, res) => {
  try {
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

// مسار الأفلام والمسلسلات (VOD) محسّن للعمل بسلاسة على السيرفر المجاني
app.get('/api/vod', (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 20; // عرض 20 عنصر في الصفحة للاستجابة السريعة
    const totalItems = 500; // إجمالي الأفلام التجريبية لضمان خفة السيرفر
    
    const sampleMovies = [];
    for (let i = 1; i <= totalItems; i++) {
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
    const paginatedMovies = sampleMovies.slice(startIndex, startIndex + limit);

    res.json({
      status: 'success',
      total_items: totalItems,
      current_page: page,
      total_pages: Math.ceil(totalItems / limit),
      movies: paginatedMovies
    });
  } catch (error) {
    res.status(500).json({ status: 'error', message: 'Failed to load VOD catalog' });
  }
});

app.listen(PORT, () => {
  console.log(`Apex+ Server is running on port ${PORT}`);
});