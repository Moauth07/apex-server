// مسار الأفلام والمسلسلات (VOD) محسّن برابط فيديو مدعوم ومباشر
app.get('/api/vod', (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 20; 
    const totalItems = 500; 
    
    const sampleMovies = [];
    for (let i = 1; i <= totalItems; i++) {
      sampleMovies.push({
        id: i,
        title: `Apex Movie Collection #${i}`,
        category: i % 2 === 0 ? 'Action & Sci-Fi' : 'Drama & Thriller',
        year: 2024 + (i % 3),
        poster: 'https://via.placeholder.com/300x450.png?text=Apex+Movie',
        stream_url: 'https://www.w3schools.com/html/mov_bbb.mp4' // رابط فيديو مباشر وثابت ومدعوم
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