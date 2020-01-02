import isUndefined from "lodash/isUndefined";
import mergeWith from "lodash/mergeWith";
import omitBy from "lodash/omitBy";
import { RecursivePartial } from "../types";

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
