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
export const setCurrentUser = (user: IUserStore): setCurrentUserType => ({
  type: "SET_CURRENT_USER",
  payload: user,
});

export const logoutCurrentUser = (userId: string) => {
  const refreshtoken = localStorage.getItem("refreshtoken");
  const action = {
    type: "CLEAR_CURRENT_USER" as const,
    payload: {},
  };
  return (dispatch: Dispatch) => {
    post("api/session/logout", { refreshtoken, userId })
      .then((res) => dispatch(action))
      .catch(() => dispatch(action))
      .finally(() => {
        localStorage.clear();
      });
  };
};
