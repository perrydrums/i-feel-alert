import {supabase} from "./client";
import {Action, Signal} from "./types";

export async function getStateOfUser(username: string): Promise<string> {
  const {data} = await supabase
    .from('user_state')
    .select('state')
    .limit(1)
    .eq('username', username);

  return data ? data[0]?.state : 'unknown';
}

export async function getSignals(username: string, filter?: { state?: string, internal?: boolean }): Promise<Signal[]> {
  const query = supabase
    .from('signals')
    .select()
    .eq('username', username);

  if (filter?.state) {
    query.eq('state', filter.state)
  }

  if (filter?.internal !== undefined) {
    query.eq('internal', filter.internal)
  }

  const {data} = await query;
  return data ? data : [];
}

export async function getActions(username: string, filter?: { state?: string, internal?: boolean }): Promise<Action[]> {
  const query = supabase
    .from('actions')
    .select()
    .eq('username', username);

  if (filter?.state) {
    query.eq('state', filter.state)
  }

  if (filter?.internal !== undefined) {
    query.eq('internal', filter.internal)
  }

  const {data} = await query;
  return data ? data : [];
}
