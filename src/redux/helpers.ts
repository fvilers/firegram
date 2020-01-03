import isUndefined from "lodash/isUndefined";
import mergeWith from "lodash/mergeWith";
import omitBy from "lodash/omitBy";
import { RecursivePartial, Identity } from "../types";

const mergeCustomiser = (
  _objValue: any,
  srcValue: any,
  key: string,
  object: Record<string, any>
) => {
  if (isUndefined(srcValue)) {
    delete object[key];
  }
};

export const merge = <T extends object>(
  ...parts: Array<T | RecursivePartial<T>>
): T => omitBy(mergeWith({}, ...parts, mergeCustomiser), isUndefined) as T;

export const toObject = <T extends Identity>(
  array: Array<T>
): Record<string, T> =>
  array.reduce((prev, curr) => ({ ...prev, [curr.id]: curr }), {});

export const toArray = <T>(obj: Record<string, T>): Array<T> =>
  Object.getOwnPropertyNames(obj)
    .map(key => obj[key])
    .filter(value => !isUndefined(value));
