import { CustomAction } from "./types";

export const setCurrentUser = (user: string): CustomAction => {
  return {
    type: "SET_CURRENT_USER",
    data: user,
  };
};
export const LogOut = (): CustomAction => {
  return {
    type: "LOG_OUT",
  };
};
