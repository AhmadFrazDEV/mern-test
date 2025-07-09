// Bad Version - contains bugs

async function getSortedPosts(req, res) {
  const posts = await Posts.find(); //  No sort in DB
  posts.sort((a, b) => b.created - a.created); //  Inefficient + might crash on large data
  res.json(posts); //  No error handling
}
