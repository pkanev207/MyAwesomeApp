export interface IPost {
  id?: string;
  uid: string;
  title: string;
  description: string;
  url: string;
  author: string;
  authorEmail: string;
  private?: boolean;
  date: Date;
  updatedAt?: Date;
  likes: string[];
  comments: string[];
}
