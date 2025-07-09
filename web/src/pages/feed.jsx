import { useEffect, useRef, useState } from 'react';

export default function Feed({ token }) {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(0);
  const loaderRef = useRef();

  useEffect(() => {
    const loadPosts = async () => {
      const res = await fetch(`http://localhost:3000/feed?page=${page}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const data = await res.json();
      setPosts(prev => [...prev, ...data]);
    };

    loadPosts();
  }, [page]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting) {
          setPage(prev => prev + 1);
        }
      },
      { threshold: 1.0 }
    );
    if (loaderRef.current) observer.observe(loaderRef.current);
    return () => loaderRef.current && observer.disconnect();
  }, []);

  return (
    <div>
      <h2>Feed</h2>
      {posts.map((post, i) => (
        <div key={i} style={{ borderBottom: '1px solid #ccc', marginBottom: '10px' }}>
          <p><strong>{post.author}</strong>: {post.content}</p>
          <p><small>{new Date(post.created).toLocaleString()}</small></p>
        </div>
      ))}
      <div ref={loaderRef}>🔄 Loading more...</div>
    </div>
  );
}
