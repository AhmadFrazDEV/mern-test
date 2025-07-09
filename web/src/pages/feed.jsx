import { useEffect, useRef, useState } from 'react';

export default function Feed({ token }) {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const loaderRef = useRef();

  const loadPosts = async () => {
    if (loading || !hasMore) return;
    setLoading(true);

    try {
      console.log('📦 Fetching feed: page', page);
      console.log('🔐 Token:', token);

      const res = await fetch(`http://localhost:3000/feed?page=${page}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      console.log('📥 Response status:', res.status);

      if (!res.ok) {
        const errMsg = await res.text();
        console.error('❌ Error fetching feed:', errMsg);
        setHasMore(false);
        return;
      }

      const data = await res.json();
      console.log('✅ Feed data:', data);

      if (data.length === 0) {
        setHasMore(false);
        return;
      }

      setPosts(prev => [...prev, ...data]);
      setPage(prev => prev + 1);
    } catch (err) {
      console.error('❌ Network error:', err.message);
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          loadPosts(); // ✅ FIXED
        }
      },
      { threshold: 1 }
    );

    const el = loaderRef.current;
    if (el) observer.observe(el);

    return () => el && observer.unobserve(el);
  }, [loaderRef, token]);

  return (
    <div className="container">
      <h2>📣 Feed</h2>

      {posts.length === 0 && !loading && (
        <p>📭 No posts found.</p>
      )}

      {posts.map((post, i) => (
        <div className="post" key={i}>
          <p><strong>{post.author}</strong>: {post.content}</p>
          <small>{new Date(post.created).toLocaleString()}</small>
        </div>
      ))}

      <div ref={loaderRef} className="loader">
        {loading
          ? '🔄 Loading...'
          : hasMore
          ? '⬇ Scroll for more'
          : '✅ End of feed'}
      </div>
    </div>
  );
}
