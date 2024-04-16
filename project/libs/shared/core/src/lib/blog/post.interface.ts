import { PostType } from "./post-type.enum";
import { PostState } from "./post-state.enum";
import { Comment } from "./comment.interface";
import { Category } from "./category.interface";

export interface Post {
  id: string;
  categories?: Category[];
  userId: string;
  createdAt: Date;
  updatedAt: Date;
  state: PostState;
  type: PostType;
  comments: Comment[]
}
