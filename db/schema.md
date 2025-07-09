{
  _id: ObjectId,
  name: "Alice",
  joined: ISODate("2024-01-15T09:00Z"),
  followers: [ObjectId("u2"), ObjectId("u3")],
  following: [ObjectId("u4"), ObjectId("u5")]
}

{
  _id: ObjectId,
  author: ObjectId("u2"),
  content: "Hello World",
  created: ISODate("2024-03-10T18:00Z")
}

