import IUser from "./user";
export interface IActivity {
  creatorId: string;
  postId: string;
  tribeId: string;
  creator: IUser;
}
