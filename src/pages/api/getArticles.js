export default async function getArticles(req, res) {
    const url = `https://api.nytimes.com/svc/topstories/v2/${req.body.section}.json?api-key=${process.env.NYT_API_KEY}`;
    try {
      const response = await fetch(url);

      if (response.ok) {
        const data = await response.json();
        return res.status(200).json(data.results);
      }
    } catch (error) {
      console.error('Error fetching articles:', error);
      res.status(500).json({ error: 'Error fetching articles' });
    }
}


