import { View } from 'react-native';

import { Page } from '@/ui/page';
import { PageHeader } from '@/ui/page-header';

import DocumentsFolder from './components/documents-folder';

export function SecretFolderDocumentsPage() {
  return (
    <Page>
      <PageHeader pageName={t('pages.safe-storage.documents')} />

      <View className="flex-1 items-center">
        <DocumentsFolder />
      </View>
    </Page>
  );
}
