export type Nullable<T> = T | null;

export type CustomError = Error & { code?: number };
