import { useEffect } from 'react';
import useStore from '../store/useStore';
import { getPosts } from '../api/posts';

export default function Sidebar() {
  const { posts, setPosts, activePost, setActivePost } = useStore();

  useEffect(() => {
    getPosts().then(setPosts);
  }, [setPosts]);

  const drafts = posts.filter(post => post.status !== 'published');
  const published = posts.filter(post => post.status === 'published');

  const PostItem = ({ post }: { post: typeof posts[0] }) => (
    <div
      onClick={() => setActivePost(post)}
      className={`px-3 py-1.5 rounded-sm cursor-pointer transition-colors text-sm ${
        activePost?.id === post.id 
          ? 'bg-[var(--color-notion-hover)] text-white font-medium' 
          : 'text-[var(--color-notion-muted)] hover:bg-[var(--color-notion-hover)] hover:text-[var(--color-notion-text)]'
      }`}
    >
      <div className="truncate">{post.title || 'Untitled'}</div>
    </div>
  );

  return (
    <div className="w-64 bg-[var(--color-notion-sidebar)] p-4 h-screen overflow-y-auto border-r border-[var(--color-notion-border)] flex flex-col gap-8">
   
      <div>
        <h2 className="text-xs font-semibold text-[var(--color-notion-muted)] uppercase tracking-wider mb-2 px-3">
          Drafts
        </h2>
        <div className="flex flex-col gap-0.5">
          {drafts.length > 0 ? (
            drafts.map(post => <PostItem key={post.id} post={post} />)
          ) : (
             <div className="px-3 text-xs text-[var(--color-notion-muted)] opacity-50 italic">No drafts</div>
          )}
        </div>
      </div>

      <div>
        <h2 className="text-xs font-semibold text-[var(--color-notion-muted)] uppercase tracking-wider mb-2 px-3">
          Published
        </h2>
        <div className="flex flex-col gap-0.5">
            {published.length > 0 ? (
                published.map(post => <PostItem key={post.id} post={post} />)
            ) : (
                <div className="px-3 text-xs text-[var(--color-notion-muted)] opacity-50 italic">No published posts</div>
            )}
        </div>
      </div>

    </div>
  );
}