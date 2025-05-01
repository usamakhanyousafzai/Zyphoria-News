export interface User {
  id: string;
  name: string;
  username: string;
  email: string;
  bio: string;
  location: string;
  avatarUrl: string;
  coverImageUrl: string;
  joinedDate: string; // ISO date string
  discussionsCount: number;
  projectsCount: number;
  peaceActionsCount: number;
  peacePledge?: string;
  interests?: string[];
  languages?: string[];
  organizations?: {
    id: string;
    name: string;
    role: string;
  }[];
}