import { PostType } from "./post-type.enum";
import { Post } from "./post.interface";

export interface QuotePost extends Post {
  quote: string;
  quoteAuthor: string;
  type: PostType.Quote;
}
