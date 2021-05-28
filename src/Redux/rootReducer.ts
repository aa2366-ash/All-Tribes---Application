import { combineReducers } from "redux";
import userReducer, { IUserStore } from "./User/userReducer";

export interface IStore {
  user: IUserStore;
}
export default combineReducers<IStore>({
  user: userReducer,
});
