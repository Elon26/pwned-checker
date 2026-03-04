import { router } from 'expo-router';
import { useEffect } from 'react';

export default function PremainPage() {
  useEffect(() => {
    router.replace('/main');
  }, []);

  return <></>;
}
