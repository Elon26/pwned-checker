import { useLocalSearchParams } from 'expo-router';

import CreateAccountPage from '@/pages/create-account';

export default function CreateAccountScreen() {
  const { password } = useLocalSearchParams();

  return <CreateAccountPage password={password as string} />;
}
