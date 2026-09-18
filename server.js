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

// روابط فيديو مستقرة 100% للتجربة والتشغيل الفوري
const sampleVideos = [
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4'
];

// قاعدة بيانات الأفلام الحقيقية
const realMoviesList = [
  { title: 'Inception', category: 'خيال علمي وإثارة', year: 2010, rating: '8.8', poster: 'https://image.tmdb.org/t/p/w500/edv5CZvWj09upOsy2Y6IwDhK8bt.jpg' },
  { title: 'Interstellar', category: 'مغامرة ومخاطرة', year: 2014, rating: '8.7', poster: 'https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg' },
  { title: 'The Dark Knight', category: 'أكشن وجريمة', year: 2008, rating: '9.0', poster: 'https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg' },
  { title: 'Avengers: Endgame', category: 'أكشن ومفاجآت', year: 2019, rating: '8.4', poster: 'https://image.tmdb.org/t/p/w500/or06FN3Dka5tukK1e9sl16pB3iy.jpg' },
  { title: 'Joker', category: 'دراما وجريمة', year: 2019, rating: '8.4', poster: 'https://image.tmdb.org/t/p/w500/udDclJoHjfjb8Ekgsd4FDteOkCU.jpg' },
  { title: 'Avatar: The Way of Water', category: 'خيال علمي', year: 2022, rating: '7.6', poster: 'https://image.tmdb.org/t/p/w500/t6HIqrRAclMCA60NsSmeqe9RmNV.jpg' }
];

// قاعدة بيانات المسلسلات (تحتوي على مواسم متعددة وحلقات حقيقية)
const realSeriesList = [
  { 
    id: 1, title: 'Breaking Bad', category: 'دراما وجريمة', year: 2008, rating: '9.5', 
    poster: 'https://image.tmdb.org/t/p/w500/ggFHVNu6YYI5L9pCfOacjizRGt.jpg',
    seasons: [
      { season: 1, episodes: [{ ep: 1, title: 'الحلقة 1: البداية', url: sampleVideos[0] }, { ep: 2, title: 'الحلقة 2: القطة', url: sampleVideos[1] }, { ep: 3, title: 'الحلقة 3: أزمة', url: sampleVideos[2] }] },
      { season: 2, episodes: [{ ep: 1, title: 'الحلقة 1: العودة', url: sampleVideos[3] }, { ep: 2, title: 'الحلقة 2: مواجهة', url: sampleVideos[0] }] },
      { season: 3, episodes: [{ ep: 1, title: 'الحلقة 1: خطر داهم', url: sampleVideos[1] }] }
    ]
  },
  { 
    id: 2, title: 'Stranger Things', category: 'خيال علمي وغموض', year: 2016, rating: '8.7', 
    poster: 'https://image.tmdb.org/t/p/w500/49WJfeN0moxb9IPfGn8AIqMGskD.jpg',
    seasons: [
      { season: 1, episodes: [{ ep: 1, title: 'الحلقة 1: الاختفاء', url: sampleVideos[2] }, { ep: 2, title: 'الحلقة 2: الفتاة', url: sampleVideos[3] }] },
      { season: 2, episodes: [{ ep: 1, title: 'الحلقة 1: العودة للعالم المقلوب', url: sampleVideos[0] }] }
    ]
  },
  { 
    id: 3, title: 'Game of Thrones', category: 'فانتازيا ومغامرة', year: 2011, rating: '9.2', 
    poster: 'https://image.tmdb.org/t/p/w500/u3bZgnGQ9T01sWNhyveQz0wH0Hl.jpg',
    seasons: [
      { season: 1, episodes: [{ ep: 1, title: 'الحلقة 1: الشتاء قادم', url: sampleVideos[1] }, { ep: 2, title: 'الحلقة 2: الملوك', url: sampleVideos[2] }] },
      { season: 2, episodes: [{ ep: 1, title: 'الحلقة 1: حرب الأقطاب', url: sampleVideos[3] }] }
    ]
  },
  { 
    id: 4, title: 'Money Heist', category: 'إثارة وجريمة', year: 2017, rating: '8.2', 
    poster: 'https://image.tmdb.org/t/p/w500/reEMJA1uzscCbkpeRJeTT2bjqUp.jpg',
    seasons: [
      { season: 1, episodes: [{ ep: 1, title: 'الحلقة 1: التخطيط', url: sampleVideos[0] }, { ep: 2, title: 'الحلقة 2: الرهائن', url: sampleVideos[1] }] }
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

// مسار المسلسلات مع المواسم والحلقات الكاملة
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