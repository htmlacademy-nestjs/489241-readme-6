export const PostType = {
  Video: 'Video',
  Text: 'Text',
  Quote: 'Quote',
  Photo: 'Photo',
  Link: 'Link'
} as const;

export type PostTypeValues = typeof PostType[keyof typeof PostType];
