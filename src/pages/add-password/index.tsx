import { scaleX } from '@kirz/nativewind-scale';
import { router } from 'expo-router';
import { View } from 'react-native';

import MagazineIcon from '@/svg/magazine.svg';
import SignatureIcon from '@/svg/signature.svg';
import { Page } from '@/ui/page';
import { PageHeader } from '@/ui/page-header';
import { Pressable } from '@/ui/pressable';
import { SfSymbol } from '@/ui/sf-symbol';
import { UiText } from '@/ui/ui-text';

export default function AddPasswordPage() {
  return (
    <Page>
      <PageHeader pageName={t('pages.add-password.page-name')} />

      <View className="gap-y-4">
        <Pressable
          className="flex-row items-center justify-between rounded-xl bg-primary/30 p-5"
          onPress={() => router.navigate('/generate-password')}
        >
          <View className="flex-row items-center gap-x-2">
            <View className="items-center justify-center rounded-lg bg-primary size-12">
              <SignatureIcon width={38} />
            </View>
            <UiText className="font-semibold">
              {t('pages.add-password.generate-new-password')}
            </UiText>
          </View>
          <SfSymbol
            name="chevron.right"
            size={scaleX(14)}
            weight="semibold"
            tintColor="gray"
          />
        </Pressable>
        <Pressable
          className="flex-row items-center justify-between rounded-xl bg-primary/30 p-5"
          onPress={() => router.navigate('/add-existing-password')}
        >
          <View className="flex-row items-center gap-x-2">
            <View className="items-center justify-center rounded-lg bg-primary size-12">
              <MagazineIcon width={24} />
            </View>
            <UiText className="font-semibold">
              {t('pages.add-password.add-existing-password')}
            </UiText>
          </View>
          <SfSymbol
            name="chevron.right"
            size={scaleX(14)}
            weight="semibold"
            tintColor="gray"
          />
        </Pressable>
      </View>
    </Page>
  );
}
