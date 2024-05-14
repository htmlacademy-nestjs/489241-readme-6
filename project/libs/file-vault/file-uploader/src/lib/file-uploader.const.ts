export enum FileUploaderResponseError {
  FailedToUploadFile = 'Failed to upload file',
  FailedToSaveFileMetadata = 'Failed to save file metadata',
  FileNotFound = 'File not found',
}

export enum FileUploaderOperationDescription {
  UploadFile = 'Uploads file'
}

export enum FileUploaderResponseMessage {
  FileUploaded = 'Returns uploaded file metadata',
  GetFileMetadata = 'Returns existing file metadata',
}
