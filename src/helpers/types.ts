export interface Signal {
  id: number;
  username: string;
  state: string;
  internal: boolean;
  description: string;
}

export interface Action {
  id: number;
  username: string;
  state: string;
  internal: boolean;
  description: string;
}

export interface UserData {
  username: string;
  name: string;
  description: string;
  type: string;
  created_at: string;
}

export interface UserState {
  username: string;
  state: string;
  updated_at: string;
}

export interface User {
  id: string;
  email: string;
  username: string;
  name: string;
  description: string;
  type: string;
}
