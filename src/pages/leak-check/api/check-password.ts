import { sha1 } from 'react-native-sha1';

export default async function checkPassword(value: string) {
  const hash = await sha1(value);
  const upperHash = hash.toUpperCase();

  const prefix = upperHash.substring(0, 5);
  const suffix = upperHash.substring(5);

  const res = await fetch(`https://api.pwnedpasswords.com/range/${prefix}`);
  const text = await res.text();

  const lines = text.split('\n');
  let leakQuantity = 0;

  for (const line of lines) {
    const [hashSuffix, countStr] = line.split(':');
    if (hashSuffix === suffix) {
      leakQuantity = parseInt(countStr, 10);
    }
  }
  return leakQuantity;
}
