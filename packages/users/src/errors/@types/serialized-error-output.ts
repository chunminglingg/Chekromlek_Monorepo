export type SerializedErrorOutput = {
  errors: SerializedError[];
};

export type SerializedError = {
  message: string;
  fields?: SerializedErrorField;
};

export type SerializedErrorField = {
  [key: string]: string[];
};
