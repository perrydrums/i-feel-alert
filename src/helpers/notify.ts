import {getSupporters, getUserById} from "./get";

export async function email(userId: string) {
  const supporters = await getSupporters(userId);
  const user = await getUserById(userId);
  const emailAddresses = supporters.map((s) => s.email);
  return await fetch('.netlify/functions/mail', {
    method: 'POST',
    body: JSON.stringify({user, emailAddresses}),
  });
}
