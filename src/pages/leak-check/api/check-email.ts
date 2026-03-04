import { Env } from '@kirz/expo-env';
import axios from 'axios';

export default async function checkEmail(value: string) {
  const res = await axios.get(
    `https://haveibeenpwned.com/api/v3/breachedaccount/${value}?truncateResponse=false`,
    { headers: { 'hibp-api-key': Env.HIBP_API_KEY } }
  );

  const breaches = res.data;
  const leakQuantity = Array.isArray(breaches) ? breaches.length : 0;
  const unhandledDescription = breaches[0].Description;
  const description = unhandledDescription
    .replace(/<[^>]*>?/gm, '')
    .replace('  ', ' ');

  return { leakQuantity, description };
}
