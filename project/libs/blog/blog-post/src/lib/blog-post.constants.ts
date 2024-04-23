export enum BlogPostPropertiesDescription {
  Id = 'The blog post unique identifier (GUID)',
  Title = 'The blog post title',
  Description = 'The blog post short description',
  Content = 'The blog post content',
  UserId = 'The blog post author id',
  Categories = 'The blog post categories list',
  Comments = 'The blog post recent comments',
  CreateAt = 'The blog post creation date'
}

export enum BlogPostsWithPagingPropertiesDescription {
  Entities = 'Array of blog posts',
  TotalPages = 'Number of total pages',
  TotalItems = 'Number of total items',
  CurrentPage = 'Current page index',
  ItemsPerPage = 'Page size'
}

export enum BlogPostValidationMessages {
  ContentIsEmpty = 'The blog post text is empty',
  DescriptionIsEmpty = 'The blog post description is empty',
  TitleIsEmpty = 'The blog post title is empty',
  InvalidUserId = 'Invalid user id',
  CategoriesNotSpecified = 'The blog post categories are not specified',
  InvalidUUID = 'Invalid GUID'
}
