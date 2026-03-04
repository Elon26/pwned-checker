import { useLocalSearchParams } from 'expo-router';

import ChangePasswordPage from '@/pages/change-password';

export default function ChangePasswordScreen() {
  const { id } = useLocalSearchParams();

  return <ChangePasswordPage id={id as string} />;
}
