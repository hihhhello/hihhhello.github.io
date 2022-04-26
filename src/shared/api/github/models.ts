export type User = {
  id: number;
  login: string;
  name: string;
  location: string;
  createdAt: string;
  publicRepos: number;
  avatarUrl: string;
  email: string;
  followers: number;
  following: number;
  bio: string;
};

export type UserPreview = Pick<User, 'avatarUrl' | 'login' | 'id'>;

export type Repo = {
  id: number;
  name: string;
  htmlUrl: string;
  forks: number;
  stargazersCount: number;
};
