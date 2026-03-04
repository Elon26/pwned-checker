import { View } from 'react-native';

import { useStorageValue } from '@/hooks/use-storage';
import { Page } from '@/ui/page';
import { PageHeader } from '@/ui/page-header';

import FileFiller from './components/file-filler';
import PDFViewer from './components/pdf-viewer';

type Props = {
  id: string;
};

export default function DocumentPage({ id }: Props) {
  const savedDocuments = useStorageValue('savedDocuments');
  const doc = savedDocuments.find((item) => item.id === id);
  const isPDF = doc?.path?.endsWith('pdf') || doc?.path?.endsWith('PDF');

  return (
    <Page>
      <PageHeader pageName={doc?.name || 'Document'} />

      <View>
        {doc?.path && isPDF && (
          <PDFViewer path={doc.path} fileName={doc.name as string} />
        )}
        {doc?.path && !isPDF && (
          <FileFiller path={doc.path} fileName={doc.name as string} />
        )}
      </View>
    </Page>
  );
}
