import { PostType } from "./post-type.enum";
import { Post } from "./post.interface";

export interface PhotoPost extends Post {
  photo: string;
  type: PostType.Photo;
}
