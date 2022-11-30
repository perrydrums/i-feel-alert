import {supabase} from "./client";
import {Action, Signal, UserData} from "./types";

export async function getStateOfUser(username: string): Promise<string> {
  const {data} = await supabase
    .from('user_state')
    .select('state')
    .limit(1)
    .eq('username', username)

  return data ? data[0].state : 'unknown'
}

export async function getUser(username: string): Promise<UserData> {
  const {data} = await supabase
    .from('user_data')
    .select()
    .limit(1)
    .eq('username', username)

  return data ? data[0] : {};
}

export async function getSignals(username: string): Promise<Signal[]> {
  const {data} = await supabase
    .from('signals')
    .select()
    .eq('username', username)

  return data ? data : [];
}

export async function getActions(username: string): Promise<Action[]> {
  const {data} = await supabase
    .from('actions')
    .select()
    .eq('username', username)

  return data ? data : [];
}
