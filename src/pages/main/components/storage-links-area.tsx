import { usePurchases } from '@kirz/expo-toolkit';
import { router } from 'expo-router';
import { View } from 'react-native';

import { shadows } from '@/config/theme/shadows';
import { useConfig } from '@/hooks/use-config';
import { usePaywall } from '@/hooks/use-paywall';
import { useSecretFolderGallery } from '@/hooks/use-secret-folder-gallery';
import { useStorageValue } from '@/hooks/use-storage';
import { usePrivateContactIds } from '@/modules/contacts-kit/react';
import ContactsIcon from '@/svg/contacts-alt.svg';
import DocumentsIcon from '@/svg/documents-alt.svg';
import GalleryIcon from '@/svg/gallery-alt.svg';

import Divider from './divider';
import StorageLinksItem from './storage-links-item';

export default function StorageLinksArea() {
  const { hasPremium } = usePurchases();
  const { showPaywall } = usePaywall();
  const { safe_storage_free_add_mode } = useConfig();
  const { ids: contactIds } = usePrivateContactIds();
  const { assets } = useSecretFolderGallery();
  const savedDocuments = useStorageValue('savedDocuments');

  return (
    <View className="rounded-2xl bg-white p-4" style={shadows.md}>
      <StorageLinksItem
        Icon={DocumentsIcon}
        title={t('pages.safe-storage.documents')}
        subtitle={t('basic.file', {
          count: savedDocuments.length,
        })}
        color="#AD46FF"
        handler={() =>
          hasPremium || safe_storage_free_add_mode
            ? router.navigate('/secret-folder-documents')
            : showPaywall()
        }
      />
      <Divider />
      <StorageLinksItem
        Icon={GalleryIcon}
        title={t('pages.safe-storage.gallery')}
        subtitle={t('basic.file', {
          count: assets.length,
        })}
        color="#2B7FFF"
        handler={() =>
          hasPremium || safe_storage_free_add_mode
            ? router.navigate('/secret-folder-gallery')
            : showPaywall()
        }
      />
      <Divider />
      <StorageLinksItem
        Icon={ContactsIcon}
        title={t('pages.safe-storage.contacts')}
        subtitle={t('basic.file', {
          count: contactIds.length,
        })}
        color="#F6339A"
        handler={() =>
          hasPremium || safe_storage_free_add_mode
            ? router.navigate('/secret-folder-contacts')
            : showPaywall()
        }
      />
    </View>
  );
}
