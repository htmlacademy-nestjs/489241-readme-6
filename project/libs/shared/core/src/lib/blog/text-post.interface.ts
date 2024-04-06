import { PostType } from "./post-type.enum";
import { Post } from "./post.interface";

export interface TextPost extends Post {
  title: string;
  announcement: string;
  text: string;
  type: PostType.Text;
  link: string;
}
