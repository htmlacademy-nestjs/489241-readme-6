export const PostState = {
  Published: 'Published',
  Draft: 'Draft'
} as const;

export type PostStateValues = typeof PostState[keyof typeof PostState];

