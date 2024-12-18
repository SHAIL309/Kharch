import { useStoreActions } from "../hooks";

import * as userAction from "./user";

export * from "./user";

export const useActions = () => {
  return useStoreActions({
    ...userAction,
  });
};
