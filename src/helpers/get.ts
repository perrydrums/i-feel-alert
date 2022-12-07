import {supabase} from "./client";
import {Action, Signal, User} from "./types";

export async function getStateOfUser(userId: string): Promise<string> {
  const {data} = await supabase
    .from('user_state')
    .select('state')
    .limit(1)
    .eq('user_id', userId);

  return data ? data[0]?.state : 'unknown';
}

export async function getSignals(userId: string, filter?: { state?: string, internal?: boolean }): Promise<Signal[]> {
  const query = supabase
    .from('signals')
    .select()
    .eq('user_id', userId);

  if (filter?.state) {
    query.eq('state', filter.state)
  }

  if (filter?.internal !== undefined) {
    query.eq('internal', filter.internal)
  }

  const {data} = await query;
  return data ? data : [];
}

export async function getActions(userId: string, filter?: { state?: string, internal?: boolean }): Promise<Action[]> {
  const query = supabase
    .from('actions')
    .select()
    .eq('user_id', userId);

  if (filter?.state) {
    query.eq('state', filter.state)
  }

  if (filter?.internal !== undefined) {
    query.eq('internal', filter.internal)
  }

  const {data} = await query;
  return data ? data : [];
}

export async function getSupporters(userId: string) {
  const {data} = await supabase
    .from('sharer_supporter')
    .select('users!sharer_supporter_supporter_id_fkey(*)')
    .eq('sharer_id', userId);

  return data || [];
}

export async function getSupporting(userId: string): Promise<User | null> {
  const {data} = await supabase
    .from('sharer_supporter')
    .select('users!sharer_supporter_sharer_id_fkey(*)')
    .eq('supporter_id', userId)
    .limit(1);

  return data ? data[0]?.users as User : null;
}

export async function getUserById(userId: string): Promise<User> {
  const {data} = await supabase
    .from('users')
    .select()
    .limit(1)
    .eq('id', userId);

  if (data) {
    return data[0];
  }

  throw new Error('User not found');
}
