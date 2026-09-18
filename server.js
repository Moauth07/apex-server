const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

// تفعيل CORS ليتمكن التطبيق من قراءة البيانات من أي مكان
app.use(cors());
app.use(express.json());

// قاعدة بيانات تجريبية (مؤقتة) تحتوي على الأقسام والأفلام مطابقة لشكل التطبيق
const mediaDatabase = {
  categories: [
    { category_id: "1", category_name: "أفلام حديثة 2026" },
    { category_id: "2", category_name: "أفلام خيال علمي ومغامرات" }
  ],
  movies: [
    {
      stream_id: 101,
      name: "Dr. Seuss's The Sneetches (2025)",
      category_id: "1",
      rating: "3.6",
      poster_url: "https://via.placeholder.com/300x450.png?text=The+Sneetches",
      stream_url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
    },
    {
      stream_id: 102,
      name: "Zathura",
      category_id: "2",
      rating: "4.2",
      poster_url: "https://via.placeholder.com/300x450.png?text=Zathura",
      stream_url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4"
    }
  ]
};

// 1. مسار لجلب الأقسام (Categories)
app.get('/api/categories', (req, res) => {
  res.json({
    status: "success",
    categories: mediaDatabase.categories
  });
});

// 2. مسار لجلب قائمة الأفلام وتفاصيلها (Movies List)
app.get('/api/movies', (req, res) => {
  res.json({
    status: "success",
    movies: mediaDatabase.movies
  });
});

// نقطة البداية للتأكد أن السيرفر يعمل
app.get('/', (req, res) => {
  res.send('Apex+ Free Backend Server is Running Successfully!');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});