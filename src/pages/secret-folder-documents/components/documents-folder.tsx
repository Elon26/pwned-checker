import { scaleY } from '@kirz/nativewind-scale';
import { useState } from 'react';
import { Alert, ScrollView, View } from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import RNFS from 'react-native-fs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { EmptyList } from '@/components/empty-list';
import { useStorage } from '@/hooks/use-storage';
import DocumentItem from '@/types/document-item';
import { UiButton } from '@/ui/ui-button';
import { UiText } from '@/ui/ui-text';
import { uuid } from '@/utils/uuid';

import DocumentCard from './document-card';

export default function DocumentsFolder() {
  const insets = useSafeAreaInsets();
  const [savedDocuments, setSavedDocuments] = useStorage('savedDocuments');
  const [isLoading, setIsLoading] = useState(false);

  const handleAddDocument = async () => {
    setIsLoading(true);

    try {
      const [selectedFile] = await DocumentPicker.pick({
        type: [
          DocumentPicker.types.doc,
          DocumentPicker.types.docx,
          DocumentPicker.types.pdf,
          DocumentPicker.types.plainText,
        ],
        copyTo: 'cachesDirectory',
        mode: 'open',
      });

      Alert.alert(
        t('pages.safe-storage.delete-files'),
        t('pages.safe-storage.files-will-be-deleted'),
        [
          {
            text: t('basic.no'),
          },
          {
            text: t('basic.yes'),
            onPress: () => RNFS.unlink(decodeURIComponent(selectedFile.uri)),
          },
        ]
      );

      const doc: DocumentItem = {
        id: uuid(),
        name: selectedFile.name,
        date: new Date().toISOString(),
        originalPath: selectedFile.uri,
        path: selectedFile.fileCopyUri,
      };

      setSavedDocuments((prev) => [doc, ...prev]);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        return;
      }
    } finally {
      setIsLoading(false);
    }
  };

  function handleRemoveDocument(id: string) {
    Alert.alert(t('basic.are-you-sure'), t('basic.this-action-is-permanent'), [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Delete',
        onPress: () => {
          const updatedSavedDocuments = savedDocuments.filter(
            (item) => item.id !== id
          );
          setSavedDocuments(updatedSavedDocuments);
        },
        style: 'destructive',
      },
    ]);
  }

  return (
    <View className="flex-1 justify-between gap-y-4 w-full">
      <View className="">
        {savedDocuments.length > 0 ? (
          <View>
            <ScrollView
              contentContainerStyle={{
                paddingBottom: insets.bottom + scaleY(60),
              }}
              showsVerticalScrollIndicator={false}
            >
              {savedDocuments.map((doc) => (
                <DocumentCard
                  key={doc.id}
                  doc={doc}
                  handleRemoveDocument={handleRemoveDocument}
                />
              ))}
            </ScrollView>
          </View>
        ) : (
          <View className="items-center justify-center h-full">
            <EmptyList text={t('pages.safe-storage.nothing-here')} />
          </View>
        )}
      </View>
      <View
        className="absolute items-center justify-center inset-x-4 bottom-0"
        style={{ paddingBottom: insets.bottom }}
      >
        <UiButton
          className="h-12"
          disabled={isLoading}
          loading={isLoading}
          onPress={handleAddDocument}
        >
          <UiText className="text-base font-semibold text-white">
            {t('pages.safe-storage.add-document')}
          </UiText>
        </UiButton>
      </View>
    </View>
  );
}
