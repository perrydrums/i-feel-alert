import {supabase} from "./client";
import sha256 from 'crypto-js/sha256';
import {User} from "./types";

export async function isLoggedIn() {
  const { data: { user } } = await supabase.auth.getUser();
  return user !== null;
}

export async function getCurrentUser(): Promise<User | null> {
  const { data: { user }, error } =  await supabase.auth.getUser();
  if (!error && user) {
    return {
      id: user.id,
      email: user.email || '',
      username: user.user_metadata.username,
      name: user.user_metadata.name,
      description: user.user_metadata.description,
      type: user.user_metadata.type,
    }
  }

  return null;
}

export async function register({email, password, type, username, name, description}: {
  email: string,
  password: string,
  type: string,
  username: string,
  name: string,
  description: string,
}) {
  const response = await supabase.auth.signUp({
    email,
    password: sha256(password).toString(),
    options: {
      data: {
        type,
        username,
        name,
        description,
      }
    }
  })

  if (!response.error) {
    const { error } = await supabase
      .from('user_state')
      .insert({ username: username, state: 'green' });

    if (!error) {
      return true;
    }
  }

  return false;
}

export async function login(email: string, password: string) {
  return await supabase.auth.signInWithPassword({
    email,
    password: sha256(password).toString(),
  })
}

export async function logout() {
  return await supabase.auth.signOut();
}
