export interface Signal {
  id: number;
  user_id: string;
  state: string;
  internal: boolean;
  description: string;
}

export interface Action {
  id: number;
  user_id: string;
  state: string;
  internal: boolean;
  description: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  type: string;
}
