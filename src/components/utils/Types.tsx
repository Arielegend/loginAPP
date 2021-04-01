export type User = {
  token: string;
  personalDetails: {
    name: string;
    Team: string;
    joinedAt: string;
    avatar: string;
  };
};

export const initialUser: User = {
  token: "",
  personalDetails: {
    name: "",
    Team: "",
    joinedAt: "",
    avatar: "",
  },
};

/////////////////////////////////////////////////

export type UserAuthParams = {
  email: string;
  password: string;
};

/////////////////////////////////////////////////

export type Project = {
  id: string;
  name: string;
  score: number;
  durationInDays: number;
  bugsCount: number;
  madeDadeline: boolean;
};

export const initialProject: Project = {
  id: "",
  name: "",
  score: 0,
  durationInDays: 0,
  bugsCount: 0,
  madeDadeline: true,
};
