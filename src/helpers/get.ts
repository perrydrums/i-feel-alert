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
