
import { useState, useEffect } from 'react';

export interface Bookmark {
  id: string;
  title: string;
  manualType: string;
  content: string;
  createdAt: string;
}

export const useBookmarks = () => {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem('ietm_bookmarks');
    if (stored) {
      setBookmarks(JSON.parse(stored));
    }
  }, []);

  const saveBookmarks = (newBookmarks: Bookmark[]) => {
    setBookmarks(newBookmarks);
    localStorage.setItem('ietm_bookmarks', JSON.stringify(newBookmarks));
  };

  const addBookmark = (bookmark: Omit<Bookmark, 'createdAt'>) => {
    const newBookmark: Bookmark = {
      ...bookmark,
      createdAt: new Date().toISOString()
    };
    const newBookmarks = [...bookmarks, newBookmark];
    saveBookmarks(newBookmarks);
  };

  const removeBookmark = (id: string) => {
    const newBookmarks = bookmarks.filter(b => b.id !== id);
    saveBookmarks(newBookmarks);
  };

  const isBookmarked = (id: string) => {
    return bookmarks.some(b => b.id === id);
  };

  return {
    bookmarks,
    addBookmark,
    removeBookmark,
    isBookmarked
  };
};
