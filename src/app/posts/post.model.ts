export interface IPost {
  id?: string;
  uid: string;
  title: string;
  description: string;
  url: string;
  author: string;
  authorEmail: string;
  date: string;
  likes: string[];
  comments: string[];
}
