import { PostType } from "./post-type.enum";
import { Post } from "./post.interface";

export interface VideoPost extends Post {
  title: string;
  type: PostType.Video;
  link: string;
}
