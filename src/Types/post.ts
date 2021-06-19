import { ITribe } from "./tribe";
import IUser from "./user";

export interface IPost {
  id: string;
  text?: string;
  gifUrl?: string;
  creatorId: string;
  createdAt: string;
  updatedAt: string;
  like: number;
  isLiked?: {
    tribeId: string;
    creatorId: string;
    postId: string;
  };
  creator: IUser;
  tribeId: string;
  tribe: ITribe;
}
