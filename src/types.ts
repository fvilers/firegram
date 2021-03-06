export type RecursivePartial<T> = {
  [P in keyof T]?: RecursivePartial<T[P]>;
};

export type FormProps<T> = {
  disabled?: boolean;
  errorMessage?: string;
  onSubmit: (values: T) => void;
  values?: Partial<T>;
};

export type Identity = {
  id: string;
};
