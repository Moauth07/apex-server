const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// عرض الواجهة الرئيسية
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

// قاعدة بيانات الأفلام الحقيقية الشهيرة
const realMoviesList = [
  { title: 'Inception', category: 'خيال علمي وإثارة', year: 2010, rating: '8.8', poster: 'https://image.tmdb.org/t/p/w500/edv5CZvWj09upOsy2Y6IwDhK8bt.jpg' },
  { title: 'Interstellar', category: 'مغامرة ومخاطرة', year: 2014, rating: '8.7', poster: 'https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg' },
  { title: 'The Dark Knight', category: 'أكشن وجريمة', year: 2008, rating: '9.0', poster: 'https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg' },
  { title: 'Avengers: Endgame', category: 'أكشن ومفاجآت', year: 2019, rating: '8.4', poster: 'https://image.tmdb.org/t/p/w500/or06FN3Dka5tukK1e9sl16pB3iy.jpg' },
  { title: 'Joker', category: 'دراما وجريمة', year: 2019, rating: '8.4', poster: 'https://image.tmdb.org/t/p/w500/udDclJoHjfjb8Ekgsd4FDteOkCU.jpg' },
  { title: 'Avatar: The Way of Water', category: 'خيال علمي', year: 2022, rating: '7.6', poster: 'https://image.tmdb.org/t/p/w500/t6HIqrRAclMCA60NsSmeqe9RmNV.jpg' },
  { title: 'Titanic', category: 'رومانسية ودراما', year: 1997, rating: '7.9', poster: 'https://image.tmdb.org/t/p/w500/9xjZS2rlVxm8SFx8kPC3aIGCOYQ.jpg' },
  { title: 'Gladiator', category: 'تاريخي وأكشن', year: 2000, rating: '8.5', poster: 'https://image.tmdb.org/t/p/w500/ty8TGRuvJLPUmAR1H1nRIsgwvim.jpg' },
  { title: 'The Matrix', category: 'خيال علمي', year: 1999, rating: '8.7', poster: 'https://image.tmdb.org/t/p/w500/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg' },
  { title: 'Spider-Man: No Way Home', category: 'أكشن ومغامرة', year: 2021, rating: '8.2', poster: 'https://image.tmdb.org/t/p/w500/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg' }
];

// قاعدة بيانات المسلسلات الحقيقية الشهيرة
const realSeriesList = [
  { title: 'Breaking Bad', category: 'دراما وجريمة', year: 2008, rating: '9.5', poster: 'https://image.tmdb.org/t/p/w500/ggFHVNu6YYI5L9pCfOacjizRGt.jpg' },
  { title: 'Stranger Things', category: 'خيال علمي وغموض', year: 2016, rating: '8.7', poster: 'https://image.tmdb.org/t/p/w500/49WJfeN0moxb9IPfGn8AIqMGskD.jpg' },
  { title: 'Game of Thrones', category: 'فانتازيا ومغامرة', year: 2011, rating: '9.2', poster: 'https://image.tmdb.org/t/p/w500/u3bZgnGQ9T01sWNhyveQz0wH0Hl.jpg' },
  { title: 'Money Heist (La Casa de Papel)', category: 'إثارة وجريمة', year: 2017, rating: '8.2', poster: 'https://image.tmdb.org/t/p/w500/reEMJA1uzscCbkpeRJeTT2bjqUp.jpg' },
  { title: 'Peaky Blinders', category: 'جريمة ودراما', year: 2013, rating: '8.8', poster: 'https://image.tmdb.org/t/p/w500/vUUqzWa2LnHIVqkaKVlVGkVcZIW.jpg' },
  { title: 'The Witcher', category: 'فانتازيا ومغامرة', year: 2019, rating: '8.0', poster: 'https://image.tmdb.org/t/p/w500/cZ0d3rtvXnDLih5LEzVdK3tV4W4.jpg' },
  { title: 'Prison Break', category: 'إثارة ومغامرة', year: 2005, rating: '8.3', poster: 'https://image.tmdb.org/t/p/w500/AzyhAZf92YjUnPBv1e3M7z13pX0.jpg' },
  { title: 'Sherlock', category: 'غموض وتحقيق', year: 2010, rating: '9.1', poster: 'https://image.tmdb.org/t/p/w500/7WTsnHkbA0FaG6R9twfFbr0I9il.jpg' }
];

const sampleVideoUrl = 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4';

// مسار الأفلام (توليد 10,000 فيلم بأسماء حقيقية وتنسيق نتفليكس)
app.get('/api/movies', (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 20; 
    const totalItems = 10000; 

    const startIndex = (page - 1) * limit;
    const endIndex = Math.min(startIndex + limit, totalItems);
    const paginatedMovies = [];

    for (let i = startIndex + 1; i <= endIndex; i++) {
      const template = realMoviesList[(i - 1) % realMoviesList.length];
      paginatedMovies.push({
        id: i,
        title: `${template.title} (${i})`,
        category: template.category,
        year: template.year,
        rating: template.rating,
        poster: template.poster,
        stream_url: sampleVideoUrl
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

// مسار المسلسلات (توليد 10,000 مسلسل بأسماء حقيقية وتنسيق نتفليكس)
app.get('/api/series', (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 20; 
    const totalItems = 10000; 

    const startIndex = (page - 1) * limit;
    const endIndex = Math.min(startIndex + limit, totalItems);
    const paginatedSeries = [];

    for (let i = startIndex + 1; i <= endIndex; i++) {
      const template = realSeriesList[(i - 1) % realSeriesList.length];
      paginatedSeries.push({
        id: i,
        title: `${template.title} - S1 E${(i % 10) + 1}`,
        category: template.category,
        year: template.year,
        rating: template.rating,
        poster: template.poster,
        stream_url: sampleVideoUrl
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