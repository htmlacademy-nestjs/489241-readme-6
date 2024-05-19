export enum BlogPostPropertiesDescription {
  Id = 'The blog post unique identifier (GUID)',
  Title = 'The blog post title',
  Description = 'The blog post short description',
  Content = 'The blog post content',
  Categories = 'The blog post categories list',
  PostType = 'The blog post type (text, video, link and etc.)',
}

export enum BlogPostValidationMessages {
  ContentIsEmpty = 'The blog post text is empty',
  DescriptionIsEmpty = 'The blog post description is empty',
  TitleIsEmpty = 'The blog post title is empty',
  CategoriesNotSpecified = 'The blog post categories are not specified',
  InvalidUUID = 'Invalid GUID'
}

export enum BlogPostOperationDescription {
  CreateBlogPost = 'Creates blog post',
  AddLikeToBlogPost = 'Adds like to specified blog post',
  SearchBlogPosts = 'Searches blog posts based on search criteria',
  PublishBlogPost = 'Publish blog post',
}

export enum BlogPostResponseMessage {
  CreatedBlogPost = 'Returns created blog post details in response body',
  SearchBlogPosts = 'Returns search results in response body',
}

export enum BlogPostResponseError {
  BlogNotFound = 'Blog post not found',
  UnauthorizedRequest = 'Unauthorized request',
  LikeAllowedForPublishedBlogPost = 'Like is allowed only for Published blog post',
}
