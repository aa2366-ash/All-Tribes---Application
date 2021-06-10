import { ITribe } from "./tribe";
import IUser from "./user";

export interface IPost {
  id: string;
  text?: string;
  gifUrl?: string;
  creatorId: string;
  createdAt: string;
  like: number;
  isLiked: boolean;
  creator: IUser;
  tribeId: string;
  tribe: ITribe;
}
