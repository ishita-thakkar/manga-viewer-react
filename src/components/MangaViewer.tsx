import { useEffect, useState, useRef } from "react";
import axios from "../axios";
import Book from "./Book";
import Chapter from "./Chapter";
import { BookResponse, ChapterResponse } from "../types";

const MangaViewer = () => {
  const [books, setBooks] = useState<BookResponse[] | null>([]);
  const [selectedBookId, setSelectedBookId] = useState<number>(0);
  const [selectedPageIdx, setSelectedPageIdx] = useState<number>(0);
  const [selectedChapter, setSelectedChapter] =
    useState<ChapterResponse | null>();

  const comicRef = useRef<HTMLImageElement>(null);
  const selectedChapterId = selectedChapter?.id || 0;

  useEffect(() => {
    (async function getBooks() {
      try {
        const response = await axios.get("/books/");
        if (response.data) {
          const books = response.data;
          setBooks(books);
          if (!selectedBookId) {
            setSelectedBookId(books[0].id);
            onChapterUpdate(books[0].chapter_ids[0]);
          }
        }
      } catch (error) {
        console.error(error);
      }
    })();
  }, [selectedBookId]);

  const handleBookClick = (bookId: number) => {
    setSelectedBookId(bookId);
    // on book change, auto select the first chapter of the book
    const chapterId =
      books?.find((book) => {
        return book.id === bookId;
      })?.chapter_ids[0] || 0;
    onChapterUpdate(chapterId);
  };

  const onChapterUpdate = (chapterId: number) => {
    (async function setChapterDetails(chapterId: number) {
      try {
        if (chapterId) {
          const response = await axios.get("/chapters/" + chapterId + "/");
          if (response.data) {
            setSelectedChapter(response.data);
            setSelectedPageIdx(0);
          }
        }
      } catch (error) {
        console.error(error);
      }
    })(chapterId);
  };

  const handleComicClick = (event: any) => {
    const comicWidth = comicRef.current?.getBoundingClientRect().width || 0;
    const mouseXPos = event.nativeEvent.offsetX;
    const totalPagesInChapter = selectedChapter?.pages.length || 0;
    // handle right click
    if (mouseXPos >= comicWidth / 2) {
      if (selectedPageIdx + 1 < totalPagesInChapter) {
        setSelectedPageIdx(selectedPageIdx + 1);
      } else {
        onChapterUpdate(selectedChapterId + 1);
      }
    }
    // handle left click
    else {
      if (selectedPageIdx > 0) {
        setSelectedPageIdx(selectedPageIdx - 1);
      } else {
        onChapterUpdate(selectedChapterId - 1);
      }
    }
  };

  return (
    <div className="m-auto w-1/3 bg-white px-10 pb-32 pt-2 text-center text-base">
      {/* book title list */}
      {books?.map((book) => {
        return (
          <Book
            key={book.id}
            id={book.id}
            title={book.title}
            isSelected={book.id === selectedBookId}
            onClick={handleBookClick}
          />
        );
      })}
      {/* chapter list */}
      <div className="px-28 pt-2">
        {books
          ?.find((book) => {
            return book.id === selectedBookId;
          })
          ?.chapter_ids.map((chapterId, chapterIdx) => {
            return (
              <Chapter
                key={chapterId}
                idx={chapterIdx}
                id={chapterId}
                isSelected={chapterId === selectedChapterId}
                onClick={onChapterUpdate}
              />
            );
          })}
      </div>
      {/* comic img */}
      {
        <img
          className="pt-2"
          ref={comicRef}
          alt={selectedChapter?.title}
          src={selectedChapter?.pages[selectedPageIdx]?.image.file}
          onClick={handleComicClick}
        ></img>
      }
      {/* page number */}
      <div className="pt-0.75">
        {selectedPageIdx + 1} / {selectedChapter?.pages.length || 1}
      </div>
    </div>
  );
};

export default MangaViewer;
