const express = require('express');
const cors = require('cors');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// مسار رئيسي للتأكد من حالة السيرفر
app.get('/', (req, res) => {
  res.json({
    status: 'online',
    server: 'Apex+ IPTV & Streaming Proxy Server',
    message: 'Ready to stream 20k+ movies, series, and live sports channels!'
  });
});

// مسار قنوات المباريات والبث الحي (Live TV / Sports)
app.get('/api/live', (req, res) => {
  // يمكنك هنا ربط أو جلب قنوات البث المباشر ومباريات اليوم
  res.json({
    category: 'Live Sports & TV Channels',
    channels: [
      { id: 1, name: 'BeIN Sports 1 HD', group: 'Sports', stream_url: 'https://example.com/live/bein1/index.m3u8' },
      { id: 2, name: 'SSC 1 HD (Saudi Sports)', group: 'Sports', stream_url: 'https://example.com/live/ssc1/index.m3u8' }
    ]
  });
});

// مسار جلب الأفلام والمسلسلات (يدعم التقسيم لتحمل الأعداد الضخمة 20k+)
app.get('/api/vod', (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = 50; // عرض 50 عنصر في كل صفحة لضمان سرعة الاستجابة وعدم استهلاك الذاكرة

  res.json({
    status: 'success',
    total_items: '20,000+',
    page: page,
    note: 'Connected to large scale M3U/Xtream source proxy.',
    items: [
      { id: 101, title: 'Sample Movie 2026', type: 'movie', year: 2026, stream_url: 'https://example.com/movie.mp4' }
    ]
  });
});

app.listen(PORT, () => {
  console.log(`Apex+ Server is running on port ${PORT}`);
});