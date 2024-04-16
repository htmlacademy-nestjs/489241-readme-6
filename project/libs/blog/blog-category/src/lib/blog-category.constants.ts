export const MAX_CATEGORY_LIMIT = 10;

export enum BlogCategoryOperationDescription {
  ShowCategoryById = 'Gets blog category by ID',
  ShowAllCategories = 'Gets all available blog categories',
  CreateCategory = 'Creates blog category',
  DeleteCategoryById = 'Deletes blog category by ID',
  UpdateCategory = 'Updates blog category by specified ID and details'
}

export enum BlogCategoryResponseMessage {
  ShowCategoryById = 'Blog category found and details returned in response body',
  ShowAllCategories = 'All available blog categories returned in response body',
  CategoryCreated = 'Blog category created and details returned in response body',
  CategoryUpdated = 'Blog category was updated'
}

export enum BlogCategoryResponseError {
  CategoryNotFound = 'Category not found',
  CategoryExists = 'Such category already exists'
}

export enum CategoryPropertiesDescription {
  CategoryId = 'Blog category unique Id',
  Title = 'Blog category unique name'
}
