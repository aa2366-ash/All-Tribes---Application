export interface ITribe {
  name: string;
  creatorId: string;
  description: string;
  avatarUrl?: string;
  coverUrl: string;
  members: number;
  createdAt: string;
  updatedAt: string;
  id: string;
}

export interface ITribelist {
  userId: string;
  tribeId: string;
  id: string;
  type: "Admin" | "Follower";
  tribe: ITribe;
}

export interface ISearchTribeList extends ITribe {
  isMember?: {
    userId?: string;
    tribeId?: string;
    id?: string;
    type?: "Admin" | "Follower";
  };
}
