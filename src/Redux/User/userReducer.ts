import IUser from "../../Types/user";
import { setCurrentUserType, logoutCurrentUserType } from "./userAction";

type IAction = setCurrentUserType | logoutCurrentUserType;

export interface IUserStore {
  accesstoken?: string;
  refreshtoken?: string;
  currentUser?: IUser;
}
const INITIAL_STATE: IUserStore = {
  accesstoken: localStorage.getItem("accesstoken") ?? undefined,
  refreshtoken: localStorage.getItem("refreshtoken") ?? undefined,
};

const userReducer = (state = INITIAL_STATE, action: IAction): IUserStore => {
  switch (action.type) {
    case "SET_CURRENT_USER":
      return {
        ...state,
        ...action.payload,
      };
    case "CLEAR_CURRENT_USER":
      return {};
    default:
      return state;
  }
};

export default userReducer;
