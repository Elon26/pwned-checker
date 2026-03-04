import { useAnalytics, usePurchases } from '@kirz/expo-toolkit';
import { scaleX, scaleY } from '@kirz/nativewind-scale';
import { Image } from 'expo-image';
import { router } from 'expo-router';
import { useEffect } from 'react';
import { useWindowDimensions, View } from 'react-native';
import MainBgImage from '@/images/main-bg.png';

import { useStorageValue } from '@/hooks/use-storage';
import { usePrivateContactIds } from '@/modules/contacts-kit/react';
import ContactsIcon from '@/svg/contacts.svg';
import DocumentsIcon from '@/svg/documents.png';
import GalleryIcon from '@/svg/gallery.svg';
import { PageHeader } from '@/ui/page-header';
import { Pressable } from '@/ui/pressable';
import { SfSymbol } from '@/ui/sf-symbol';
import { UiText } from '@/ui/ui-text';
import { useSecretFolderGallery } from '@/hooks/use-secret-folder-gallery';
import { usePaywall } from '@/hooks/use-paywall';
import { useConfig } from '@/hooks/use-config';

export default function StorageTab() {
  const { hasPremium } = usePurchases();
  const { showPaywall } = usePaywall();
  const { safe_storage_free_add_mode } = useConfig();
  const { width } = useWindowDimensions();
  const { ids: contactIds } = usePrivateContactIds();
  const { assets } = useSecretFolderGallery();
  const savedDocuments = useStorageValue('savedDocuments');

  const { logEvent } = useAnalytics();
  useEffect(() => {
    logEvent('secret_folder');
  }, [logEvent]);

  return (
    <View className="flex-1">
      <PageHeader homePage pageName={t('pages.safe-storage.page-name')} />
      <Image
        source={MainBgImage}
        style={{
          position: 'absolute',
          width: width,
          height: scaleY(672),
          top: -scaleY(60),
          left: -scaleX(20),
        }}
      />

      <View className="flex-1 gap-y-4">
        <Pressable
          className="flex-row items-center justify-between rounded-xl bg-[#F3E8FF] p-5"
          onPress={() =>
            hasPremium || safe_storage_free_add_mode
              ? router.navigate('/secret-folder-documents')
              : showPaywall()
          }
        >
          <View className="flex-row items-center gap-x-2">
            <View className="items-center justify-center rounded-lg bg-white size-12">
              <Image
                source={DocumentsIcon}
                style={{ width: scaleX(27), height: scaleY(21) }}
                contentFit="cover"
              />
            </View>
            <View className="gap-y-2">
              <UiText className="font-semibold">
                {t('pages.safe-storage.documents')}
              </UiText>
              <UiText className="text-black/40">
                {t('basic.file', { count: savedDocuments.length })}
              </UiText>
            </View>
          </View>
          <SfSymbol
            name="chevron.right"
            size={scaleX(14)}
            weight="semibold"
            tintColor="gray"
          />
        </Pressable>
        <Pressable
          className="flex-row items-center justify-between rounded-xl bg-[#DBEAFE] p-5"
          onPress={() =>
            hasPremium || safe_storage_free_add_mode
              ? router.navigate('/secret-folder-gallery')
              : showPaywall()
          }
        >
          <View className="flex-row items-center gap-x-2">
            <View className="items-center justify-center rounded-lg bg-white size-12">
              <GalleryIcon />
            </View>
            <View className="gap-y-2">
              <UiText className="font-semibold">
                {t('pages.safe-storage.gallery')}
              </UiText>
              <UiText className="text-black/40">
                {t('basic.file', { count: assets.length })}
              </UiText>
            </View>
          </View>
          <SfSymbol
            name="chevron.right"
            size={scaleX(14)}
            weight="semibold"
            tintColor="gray"
          />
        </Pressable>
        <Pressable
          className="flex-row items-center justify-between rounded-xl bg-[#FEE2E2] p-5"
          onPress={() =>
            hasPremium || safe_storage_free_add_mode
              ? router.navigate('/secret-folder-contacts')
              : showPaywall()
          }
        >
          <View className="flex-row items-center gap-x-2">
            <View className="items-center justify-center rounded-lg bg-white size-12">
              <ContactsIcon />
            </View>
            <View className="gap-y-2">
              <UiText className="font-semibold">
                {t('pages.safe-storage.contacts')}
              </UiText>
              <UiText className="text-black/40">
                {t('basic.file', { count: contactIds.length })}
              </UiText>
            </View>
          </View>
          <SfSymbol
            name="chevron.right"
            size={scaleX(14)}
            weight="semibold"
            tintColor="gray"
          />
        </Pressable>
      </View>
    </View>
  );
}
