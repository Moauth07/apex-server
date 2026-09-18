const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// عرض واجهة المستخدم
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// مسار البث الحي
app.get('/api/live', async (req, res) => {
  try {
    const channels = [
      { id: 1, name: 'العربية - Al Arabiya', group: 'أخبار', url: 'https://live-hls-web-aje.getaj.net/AJE/03.m3u8' },
      { id: 2, name: 'الحدث - Al Hadath', group: 'أخبار', url: 'https://live-hls-web-aje.getaj.net/AJE/03.m3u8' },
      { id: 3, name: 'بث رياضي تجريبي HD', group: 'رياضة', url: 'https://test-streams.mux.dev/x364fish/pl/index.m3u8' }
    ];
    res.json({ status: 'success', count: channels.length, channels: channels });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch live channels' });
  }
});

// مسار الأفلام (أفلام كاملة ذات مدة حقيقية)
app.get('/api/movies', (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 20; 
    const totalItems = 10000; 
    
    // قائمة أفلام مفتوحة المصدر كاملة (مدد حقيقية وليست 10 ثوانٍ)
    const fullMovies = [
      { title: 'Big Buck Bunny (Full Movie)', poster: 'https://upload.wikimedia.org/wikipedia/commons/c/c5/Big_buck_bunny_poster_big.jpg', url: 'https://test-streams.mux.dev/bigbuckbunny/bbb.m3u8' },
      { title: 'Sintel Open Movie (Full)', poster: 'https://upload.wikimedia.org/wikipedia/commons/8/8f/Sintel_poster.jpg', url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4' },
      { title: 'Tears of Steel Sci-Fi (Full)', poster: 'https://upload.wikimedia.org/wikipedia/commons/2/22/Tears_of_Steel_poster.jpg', url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4' },
      { title: 'Elephants Dream (Full)', poster: 'https://upload.wikimedia.org/wikipedia/commons/e/e8/Elephants_Dream_poster.jpg', url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4' }
    ];

    const startIndex = (page - 1) * limit;
    const endIndex = Math.min(startIndex + limit, totalItems);
    const paginatedMovies = [];

    for (let i = startIndex + 1; i <= endIndex; i++) {
      const template = fullMovies[(i - 1) % fullMovies.length];
      paginatedMovies.push({
        id: i,
        title: `${template.title} #${i}`,
        category: i % 2 === 0 ? 'أكشن ومغامرات' : 'خيال علمي',
        year: 2016 + (i % 9),
        poster: template.poster,
        stream_url: template.url
      });
    }

    res.json({
      status: 'success',
      total_items: totalItems,
      current_page: page,
      total_pages: Math.ceil(totalItems / limit),
      movies: paginatedMovies
    });
  } catch (error) {
    res.status(500).json({ status: 'error', message: 'Failed to load movies' });
  }
});

// مسار المسلسلات (حلقات كاملة)
app.get('/api/series', (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 20; 
    const totalItems = 10000; 
    
    const fullSeries = [
      { title: 'Cyberpunk Chronicles', poster: 'https://upload.wikimedia.org/wikipedia/commons/2/22/Tears_of_Steel_poster.jpg', url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4' },
      { title: 'Realm of Sintel', poster: 'https://upload.wikimedia.org/wikipedia/commons/8/8f/Sintel_poster.jpg', url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4' },
      { title: 'Bunny Adventures', poster: 'https://upload.wikimedia.org/wikipedia/commons/c/c5/Big_buck_bunny_poster_big.jpg', url: 'https://test-streams.mux.dev/bigbuckbunny/bbb.m3u8' }
    ];

    const startIndex = (page - 1) * limit;
    const endIndex = Math.min(startIndex + limit, totalItems);
    const paginatedSeries = [];

    for (let i = startIndex + 1; i <= endIndex; i++) {
      const template = fullSeries[(i - 1) % fullSeries.length];
      paginatedSeries.push({
        id: i,
        title: `${template.title} - S1 E${(i % 10) + 1}`,
        category: i % 2 === 0 ? 'دراما تلفزيونية' : 'إثارة وتشويق',
        year: 2018 + (i % 7),
        poster: template.poster,
        stream_url: template.url
      });
    }

    res.json({
      status: 'success',
      total_items: totalItems,
      current_page: page,
      total_pages: Math.ceil(totalItems / limit),
      series: paginatedSeries
    });
  } catch (error) {
    res.status(500).json({ status: 'error', message: 'Failed to load series' });
  }
});

app.listen(PORT, () => {
  console.log(`Apex+ Server is running on port ${PORT}`);
});