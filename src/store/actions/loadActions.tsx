import { CustomAction } from "./types"

export const setLoading = (bool: boolean): CustomAction<boolean> => {
  return {
    type: "IS_LOADING",
    data: bool,
  }
}
