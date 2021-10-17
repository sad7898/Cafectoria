import { CustomAction } from "./types";

export const setLoading = (bool: boolean): CustomAction => {
  return {
    type: "IS_LOADING",
    data: bool,
  };
};
