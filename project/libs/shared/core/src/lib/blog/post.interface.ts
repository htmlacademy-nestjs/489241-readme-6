import { PostType } from "./post-type.enum";
import { PostState } from "./post-state.enum";

export interface Post {
  id: string;
  tags?: string[];
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
  state: PostState;
  type: PostType;
}
