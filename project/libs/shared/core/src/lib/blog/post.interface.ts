import { PostTypeValues } from "./post-type.enum";
import { PostStateValues } from "./post-state.enum";
import { Comment } from "./comment.interface";
import { Category } from "./category.interface";

export interface Post {
  id: string;
  title: string;
  description: string;
  content: string;
  categories: Category[];
  userId: string;
  createdAt: Date;
  updatedAt: Date;
  state: PostStateValues;
  type: PostTypeValues;
  comments: Comment[]
}
