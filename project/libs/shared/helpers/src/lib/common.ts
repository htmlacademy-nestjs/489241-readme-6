import { ClassTransformOptions, plainToInstance } from 'class-transformer';

type PlainObject = Record<string, unknown>;

export function fillDto<T, V extends PlainObject>(
  DtoClass: new () => T,
  plainObject: V,
  options?: ClassTransformOptions,
): T;

export function fillDto<T, V extends PlainObject[]>(
  DtoClass: new () => T,
  plainObject: V,
  options?: ClassTransformOptions,
): T[];

export function fillDto<T, V extends PlainObject>(
  DtoClass: new () => T,
  plainObject: V,
  options?: ClassTransformOptions,
): T | T[] {
  return plainToInstance(DtoClass, plainObject, {
      excludeExtraneousValues: true,
      ...options,
  });
}

export function getMongoConnectionString({username, password, host, port, databaseName, authDatabase}): string {
  const v = `mongodb://${username}:${password}@${host}:${port}/?authSource=${authDatabase}`;
  console.log(v);
  return v;
}
