import { PostType } from "./post-type.enum";
import { Post } from "./post.interface";

export interface LinkPost extends Post {
  url: string;
  description: string;
  type: PostType.Link;
}
