export interface Comment {
  id: number;
  user: string;
  text: string;
  createdAt: string;
}

export interface Ticket {
  id: number;
  title: string;
  description: string;
  priority: string;
  status: string;
  createdBy: string;
  createdAt: string;
  comments?: Comment[];
}
