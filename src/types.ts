export type BookResponse = {
  id: number;
  title: string;
  chapter_ids: number[];
};

export type Image = {
  id: number;
  file: string;
  width: number;
  height: number;
  created_at: Date;
  updated_at: Date;
};

export type Page = {
  id: number;
  page_index: number;
  image: Image;
};

export type ChapterResponse = {
  id: number;
  title: string;
  book: BookResponse;
  chapter_index: number;
  pages: Page[];
};
