export interface Challenge {
  id: string;                     // maps from backend idChallenge
  title: string;
  description: string;
  category: string;
  technology?: string;
  startDate?: Date;
  endDate?: Date;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  status: 'DRAFT' | 'Active' | 'InProgress' | 'Completed' | 'Closed';
  maxParticipants?: number;
  points?: number;
  participants?: number;
  progress?: number;
  githubUrl?: string;
  image?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ChallengeDetail extends Challenge {
  requirements?: string[];
  resources?: Resource[];
  submissions?: number;
}

export interface Resource {
  id: string;
  title: string;
  url: string;
  type: 'video' | 'article' | 'documentation';
}
