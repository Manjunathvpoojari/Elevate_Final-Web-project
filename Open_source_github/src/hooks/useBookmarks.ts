import { useState, useEffect } from "react";
import { BookmarkedRepo, GitHubRepo } from "@/types/github";

const STORAGE_KEY = "github-bookmarks";

export const useBookmarks = () => {
  const [bookmarks, setBookmarks] = useState<BookmarkedRepo[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      setBookmarks(JSON.parse(stored));
    }
  }, []);

  const saveBookmarks = (newBookmarks: BookmarkedRepo[]) => {
    setBookmarks(newBookmarks);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newBookmarks));
  };

  const addBookmark = (repo: GitHubRepo, notes: string = "") => {
    const bookmarked: BookmarkedRepo = {
      ...repo,
      notes,
      bookmarkedAt: new Date().toISOString(),
    };
    saveBookmarks([...bookmarks, bookmarked]);
  };

  const removeBookmark = (repoId: number) => {
    saveBookmarks(bookmarks.filter((b) => b.id !== repoId));
  };

  const updateNotes = (repoId: number, notes: string) => {
    saveBookmarks(
      bookmarks.map((b) => (b.id === repoId ? { ...b, notes } : b))
    );
  };

  const isBookmarked = (repoId: number) => {
    return bookmarks.some((b) => b.id === repoId);
  };

  return {
    bookmarks,
    addBookmark,
    removeBookmark,
    updateNotes,
    isBookmarked,
  };
};
