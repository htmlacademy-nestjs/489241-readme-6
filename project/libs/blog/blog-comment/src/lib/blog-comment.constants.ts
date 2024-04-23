export enum BlogCommentValidationMessages {
  TextIsEmpty = 'The comment text is empty',
  InvalidId = 'Invalid author id',
}

export enum CommentPropertiesDescription {
  PostId = 'Blog post unique id',
  Message = 'Blog comment text',
  UserId = 'Blog comment user id',
  CreatedAt = 'Blog comment creation date'
}

export enum BlogCommentOperationDescription {
  ShowCommentsByBlogId = 'Returns list of latest comment for specified blog id',
  CreateCommentForBlogId = 'Create blog comment for specified blog id'
}

export enum BlogCommentResponseMessage {
  ShowCommentsByBlogId = 'Returns latest blog comments for specified blog id',
  CreateCommentForBlogId = 'Blog comment was created and details returned in response body'
}

export enum BlogCommentResponseError {
  BlogNotFound = 'Blog not found by specified id'
}
