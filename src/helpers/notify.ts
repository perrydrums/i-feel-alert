import { getSupporters, getUserById } from "./get";

export async function email(userId: string, state: string) {
  const supporters = await getSupporters(userId);
  const sharer = await getUserById(userId);
  return await fetch(".netlify/functions/mail", {
    method: "POST",
    body: JSON.stringify({ sharer, state, supporters }),
  });
}

export async function push(userId: string, state: string) {
  const supporters = await getSupporters(userId);
  const sharer = await getUserById(userId);
  return await fetch(".netlify/functions/push", {
    method: "POST",
    body: JSON.stringify({ sharer, state, supporters }),
  });
}
