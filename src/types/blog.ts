export type TBlog = {
  _id: string;
  title: string;
  description: string;
  category: string;
  imageUrl: string;
  author: TAuthor;
  isDeleted: boolean;
  likes: number;
  dislikes: number;
  comments: number;
  createdAt: Date;
  updatedAt: Date;
  slug: string;
};

export type TAuthor = {
  _id: string;
  name: string;
};
