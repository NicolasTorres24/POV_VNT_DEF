export interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  status: 'active' | 'completed' | 'on-hold';
  deadline: string;
}

export interface User {
  email: string;
  isAuthenticated: boolean;
}