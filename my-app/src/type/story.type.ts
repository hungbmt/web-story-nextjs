export interface typeGethome {
  id: Number;
  title: string;
  imgStory: string;
  description: string;
  slug: string;
  statusStory: string;
  published: boolean;
  totalChapters: string;
  totalChapter: number;
  time: Date;
  time_update: Date;
  genres: string;
  author: string;
  view: number;
  gim: Number;
  isActive: Number;
  source: string;
  category: string;
  list: string;
}

export interface typechapter {
  id: number;
  slug: string;
  slug_1: string;
  title: string;
  number_chapter: number;
  name_chapter: string;
  content: string;
  isActive: number;
  isTrash: number;
  time: Date;
  time_update: Date;
  is_locked: boolean;
}

// export interface typeRelatedStory {
//   id: Number;
//   title: String;
//   imgStory: string;
//   slug: string;
// }

export interface typeChart {
  id: string;
  path: string;
  view_count: number;
  date: Date;
}

export interface typeAuth {
  id: string;
  username: string;
  password: string;
  message: string;
  Accesstoken: string;
  RefreshToken: string;
}

export interface typeCategory {
  id: string;
  category: string;
  slug: string;
}

export interface typeErrorStory {
  id: string;
  error_message: string;
  name_story: string;
  name_chapter: string;
  slug_chapter: string;
  slug_1: string;
  slug_2: string;
}
