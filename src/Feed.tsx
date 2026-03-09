import React, { useState } from 'react';
import { Home, Search, PlusSquare, Film, Heart, MessageCircle, Send, Bookmark, MoreHorizontal } from 'lucide-react';
import './index.css';

const DUMMY_POSTS = [
  {
    id: 1,
    username: 'nature_lover',
    userImage: 'https://picsum.photos/seed/user1/100/100',
    image: 'https://picsum.photos/seed/post1/600/600',
    likes: 1234,
    caption: 'Beautiful sunset today! 🌅 #nature',
    time: '2 hours ago',
    isLiked: false,
    isSaved: false,
  },
  {
    id: 2,
    username: 'tech_guru',
    userImage: 'https://picsum.photos/seed/user2/100/100',
    image: 'https://picsum.photos/seed/post2/600/600',
    likes: 856,
    caption: 'My new setup for coding 💻✨',
    time: '4 hours ago',
    isLiked: true,
    isSaved: false,
  },
  {
    id: 3,
    username: 'foodie_adventures',
    userImage: 'https://picsum.photos/seed/user3/100/100',
    image: 'https://picsum.photos/seed/post3/600/600',
    likes: 2405,
    caption: 'Best pizza in town! 🍕😋',
    time: '8 hours ago',
    isLiked: false,
    isSaved: true,
  }
];

export default function Feed() {
  const [posts, setPosts] = useState(DUMMY_POSTS);

  const toggleLike = (postId: number) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          isLiked: !post.isLiked,
          likes: post.isLiked ? post.likes - 1 : post.likes + 1
        };
      }
      return post;
    }));
  };

  const toggleSave = (postId: number) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          isSaved: !post.isSaved
        };
      }
      return post;
    }));
  };

  return (
    <div className="feed-layout">
      {/* Sidebar for Desktop / Bottom Nav for Mobile */}
      <nav className="nav-sidebar">
        <div className="nav-logo-container">
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/800px-Instagram_logo.svg.png" alt="Instagram" className="nav-logo" />
        </div>
        
        <div className="nav-links">
          <button className="nav-item">
            <Home className="nav-icon" />
            <span className="nav-text bold-text">Home</span>
          </button>
          <button className="nav-item">
            <Search className="nav-icon" />
            <span className="nav-text">Search</span>
          </button>
          <button className="nav-item">
            <PlusSquare className="nav-icon" />
            <span className="nav-text">Create</span>
          </button>
          <button className="nav-item">
            <Film className="nav-icon" />
            <span className="nav-text">Reels</span>
          </button>
          <button className="nav-item">
            <div className="nav-profile-pic">
                <img src="https://picsum.photos/seed/user4/100/100" alt="Profile" />
            </div>
            <span className="nav-text">Profile</span>
          </button>
        </div>
      </nav>

      {/* Main Feed Content */}
      <main className="feed-main">
        <div className="feed-content">
            
          {/* Top Mobile Bar (only visible on mobile) */}
          <div className="mobile-top-bar">
             <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/800px-Instagram_logo.svg.png" alt="Instagram" className="mobile-logo" />
             <div className="top-bar-actions">
                 <Heart className="top-bar-icon" />
                 <MessageCircle className="top-bar-icon" />
             </div>
          </div>

          <div className="stories-container">
             {[1,2,3,4,5,6].map(i => (
                 <div key={i} className="story-item">
                     <div className="story-ring">
                         <div className="story-image">
                             <img src={`https://picsum.photos/seed/story${i}/100/100`} alt="Story" />
                         </div>
                     </div>
                     <span className="story-username">user_{i}</span>
                 </div>
             ))}
          </div>

          <hr className="mobile-divider" />

          {/* Posts Feed */}
          {posts.map(post => (
            <article key={post.id} className="post-container">
              <div className="post-card">
                
                {/* Post Header */}
                <div className="post-header">
                  <div className="post-user-info">
                    <img src={post.userImage} alt={post.username} className="post-avatar" />
                    <span className="post-username">{post.username}</span>
                    <span className="post-time">
                        <span className="dot-separator">●</span>
                        {post.time}
                    </span>
                  </div>
                  <button className="post-options">
                    <MoreHorizontal className="post-options-icon" />
                  </button>
                </div>

                {/* Post Image */}
                <div className="post-image-container">
                  <img src={post.image} alt="Post content" loading="lazy" />
                </div>

                {/* Post Actions */}
                <div className="post-actions">
                  <div className="post-action-group">
                    <button onClick={() => toggleLike(post.id)} className="action-btn">
                      <Heart className={`action-icon ${post.isLiked ? 'liked' : ''}`} />
                    </button>
                    <button className="action-btn">
                      <MessageCircle className="action-icon" />
                    </button>
                    <button className="action-btn">
                      <Send className="action-icon" />
                    </button>
                  </div>
                  <button onClick={() => toggleSave(post.id)} className="action-btn">
                    <Bookmark className={`action-icon ${post.isSaved ? 'saved' : ''}`} />
                  </button>
                </div>

                {/* Post Info */}
                <div className="post-info">
                  <span className="post-likes">{post.likes.toLocaleString()} likes</span>
                  <div className="post-caption-box">
                    <span className="post-username mr-2">{post.username}</span>
                    <span className="post-caption">{post.caption}</span>
                  </div>
                  <button className="view-comments">View all comments</button>
                </div>
              </div>
            </article>
          ))}
          
        </div>
      </main>
      
      {/* Right Sidebar (Suggestions - Hidden on smaller screens) */}
      <aside className="suggestions-sidebar">
         <div className="current-user">
            <div className="user-profile">
                <img src="https://picsum.photos/seed/user4/100/100" className="user-avatar" alt="User" />
                <div className="user-details">
                    <span className="user-handle">my_account</span>
                    <span className="user-name">My Name</span>
                </div>
            </div>
            <button className="switch-btn">Switch</button>
         </div>

         <div className="suggestions-header">
             <span className="suggestions-title">Suggested for you</span>
             <button className="see-all-btn">See All</button>
         </div>

         <div className="suggestions-list">
             {[1,2,3,4,5].map(i => (
                 <div key={i} className="suggestion-item">
                    <div className="user-profile">
                        <img src={`https://picsum.photos/seed/sug${i}/100/100`} className="user-avatar-small" alt="Suggested User" />
                        <div className="user-details">
                            <span className="user-handle">suggested_user_{i}</span>
                            <span className="user-status">Follows you</span>
                        </div>
                    </div>
                    <button className="follow-btn">Follow</button>
                 </div>
             ))}
         </div>

         <div className="sidebar-footer">
            <div className="footer-links-grid">
                {['About','Help','Press','API','Jobs','Privacy','Terms','Locations','Language','Meta Verified'].map(link => (
                    <a key={link} href="#" className="footer-link-small">{link}</a>
                ))}
            </div>
            <span className="footer-copyright">© 2026 INSTAGRAM FROM META</span>
         </div>
      </aside>

    </div>
  );
}
