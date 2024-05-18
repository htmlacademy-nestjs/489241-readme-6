export enum BlogPostPropertiesDescription {
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
}

export enum BlogPostResponseMessage {
  CreatedBlogPost = 'Returns created blog post details in response body',
}
