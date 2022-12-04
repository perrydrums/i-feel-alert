import {supabase} from "./client";
import sha256 from 'crypto-js/sha256';
import {User} from "./types";

export async function isLoggedIn() {
  const { data: { user } } = await supabase.auth.getUser();
  return user !== null;
}

export async function getCurrentUser(): Promise<User | null> {
  const { data: { user } } =  await supabase.auth.getUser();
  if (user?.id) {
    const { data } = await supabase
      .from('users')
      .select()
      .limit(1)
      .eq('id', user.id);

    if (data) {
      return data[0];
    }
  }

  return null;
}

export async function register({email, password, type, name}: {
  email: string,
  password: string,
  type: string,
  name: string,
}) {
  const { data: { user } } = await supabase.auth.signUp({
    email,
    password: sha256(password).toString(),
  })

  if (user) {
    const { error } = await supabase
      .from('users')
      .insert({id: user.id, email, name, type});

    if (type === 'sharer') {
      await supabase
        .from('user_state')
        .insert({ user_id: user.id, state: 'green' });
    }

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
  await supabase.auth.signOut();
  window.location.assign('/');
}
