import { IUserStore } from "./userReducer";
import { Dispatch } from "redux";
import post from "../../utils/post";

export type setCurrentUserType = {
  type: "SET_CURRENT_USER";
  payload: IUserStore;
};
export type logoutCurrentUserType = {
  type: "CLEAR_CURRENT_USER";
  payload: {};
};
const clearAction = {
  type: "CLEAR_CURRENT_USER" as const,
  payload: {},
};

export const setCurrentUser = (user: IUserStore): setCurrentUserType => ({
  type: "SET_CURRENT_USER",
  payload: user,
});

export const logoutCurrentUser = (userId: string) => {
  const refreshtoken = localStorage.getItem("refreshtoken");
  return (dispatch: Dispatch) => {
    post("api/session/logout", { refreshtoken, userId })
      .then((res) => dispatch(clearAction))
      .catch(() => dispatch(clearAction))
      .finally(() => {
        localStorage.clear();
      });
  };
};
