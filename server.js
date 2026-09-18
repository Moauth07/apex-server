const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

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

// روابط فيديو جديدة وسريعة التحميل ومضمونة التشغيل
const sampleVideos = [
  'https://www.w3schools.com/html/mov_bbb.mp4',
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4'
];

// قاعدة بيانات الأفلام
const realMoviesList = [
  { title: 'Inception', category: 'خيال علمي وإثارة', year: 2010, rating: '8.8', poster: 'https://image.tmdb.org/t/p/w500/edv5CZvWj09upOsy2Y6IwDhK8bt.jpg' },
  { title: 'Interstellar', category: 'مغامرة ومخاطرة', year: 2014, rating: '8.7', poster: 'https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg' },
  { title: 'The Dark Knight', category: 'أكشن وجريمة', year: 2008, rating: '9.0', poster: 'https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg' },
  { title: 'Avengers: Endgame', category: 'أكشن ومفاجآت', year: 2019, rating: '8.4', poster: 'https://image.tmdb.org/t/p/w500/or06FN3Dka5tukK1e9sl16pB3iy.jpg' },
  { title: 'Joker', category: 'دراما وجريمة', year: 2019, rating: '8.4', poster: 'https://image.tmdb.org/t/p/w500/udDclJoHjfjb8Ekgsd4FDteOkCU.jpg' },
  { title: 'Avatar: The Way of Water', category: 'خيال علمي', year: 2022, rating: '7.6', poster: 'https://image.tmdb.org/t/p/w500/t6HIqrRAclMCA60NsSmeqe9RmNV.jpg' }
];

// قاعدة بيانات المسلسلات والمواسم
const realSeriesList = [
  { 
    id: 1, title: 'Breaking Bad', category: 'دراما وجريمة', year: 2008, rating: '9.5', 
    poster: 'https://image.tmdb.org/t/p/w500/ggFHVNu6YYI5L9pCfOacjizRGt.jpg',
    seasons: [
      { season: 1, episodes: [{ ep: 1, title: 'الحلقة 1: البداية', url: sampleVideos[0] }, { ep: 2, title: 'الحلقة 2: القطة', url: sampleVideos[1] }, { ep: 3, title: 'الحلقة 3: أزمة', url: sampleVideos[2] }] },
      { season: 2, episodes: [{ ep: 1, title: 'الحلقة 1: العودة', url: sampleVideos[3] }, { ep: 2, title: 'الحلقة 2: مواجهة', url: sampleVideos[0] }] }
    ]
  },
  { 
    id: 2, title: 'Stranger Things', category: 'خيال علمي وغموض', year: 2016, rating: '8.7', 
    poster: 'https://image.tmdb.org/t/p/w500/49WJfeN0moxb9IPfGn8AIqMGskD.jpg',
    seasons: [
      { season: 1, episodes: [{ ep: 1, title: 'الحلقة 1: الاختفاء', url: sampleVideos[1] }, { ep: 2, title: 'الحلقة 2: الفتاة', url: sampleVideos[2] }] }
    ]
  }
];

// مسار الأفلام
app.get('/api/movies', (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = 20;
  const totalItems = 10000;
  const startIndex = (page - 1) * limit;
  const endIndex = Math.min(startIndex + limit, totalItems);
  const movies = [];

  for (let i = startIndex + 1; i <= endIndex; i++) {
    const template = realMoviesList[(i - 1) % realMoviesList.length];
    movies.push({
      id: i,
      title: `${template.title} (${i})`,
      category: template.category,
      year: template.year,
      rating: template.rating,
      poster: template.poster,
      stream_url: sampleVideos[i % sampleVideos.length]
    });
  }

  res.json({ total_items: totalItems, current_page: page, total_pages: Math.ceil(totalItems / limit), movies });
});

// مسار المسلسلات
app.get('/api/series', (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = 20;
  const totalItems = 10000;
  const startIndex = (page - 1) * limit;
  const endIndex = Math.min(startIndex + limit, totalItems);
  const series = [];

  for (let i = startIndex + 1; i <= endIndex; i++) {
    const template = realSeriesList[(i - 1) % realSeriesList.length];
    series.push({
      id: i,
      title: `${template.title} #${i}`,
      category: template.category,
      year: template.year,
      rating: template.rating,
      poster: template.poster,
      seasons: template.seasons
    });
  }

  res.json({ total_items: totalItems, current_page: page, total_pages: Math.ceil(totalItems / limit), series });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});