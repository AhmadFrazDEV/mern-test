// Fixed Version - faster and safer

async function getSortedPosts(req, res) {
  try {
    const posts = await Posts.find().sort({ created: -1 }).limit(100); // Sort in DB + limit results
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: 'Server error while fetching posts' }); //  Handle errors
  }
}
