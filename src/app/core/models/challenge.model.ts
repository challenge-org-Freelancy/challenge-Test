export interface Challenge {
  id: string;
  title: string;
  description: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  points: number;
  participants: number;
  progress?: number;
  category: string;
  status: 'Active' | 'InProgress' | 'Completed' | 'Closed';
  createdAt: Date;
  updatedAt: Date;
}

export interface ChallengeDetail extends Challenge {
  requirements: string[];
  resources: Resource[];
  submissions: number;
  deadline?: Date;
}

export interface Resource {
  id: string;
  title: string;
  url: string;
  type: 'video' | 'article' | 'documentation';
}
