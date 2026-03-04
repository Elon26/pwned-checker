import { useLocalSearchParams } from 'expo-router';

import DocumentPage from '@/pages/document';

export default function CreateAccountScreen() {
  const { id } = useLocalSearchParams();

  return <DocumentPage id={id as string} />;
}
