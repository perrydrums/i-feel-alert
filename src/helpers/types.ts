export interface Advice {
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
