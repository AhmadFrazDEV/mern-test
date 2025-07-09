


// MongoDB aggregation: Get the 10 most recent posts
// from users followed by a given user (e.g. u1)

db.users.aggregate([
  { $match: { _id: ObjectId("u1") } }, // Replace with actual user ObjectId

  {
    $lookup: {
      from: "posts",
      localField: "following",
      foreignField: "author",
      as: "feed"
    }
  },

  { $unwind: "$feed" },

  { $sort: { "feed.created": -1 } },

  { $limit: 10 },

  {
    $lookup: {
      from: "users",
      localField: "feed.author",
      foreignField: "_id",
      as: "authorInfo"
    }
  },

  { $unwind: "$authorInfo" },

  {
    $project: {
      _id: 0,
      content: "$feed.content",
      created: "$feed.created",
      author: "$authorInfo.name"
    }
  }
]);
