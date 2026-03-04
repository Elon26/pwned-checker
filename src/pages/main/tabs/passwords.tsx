import { scaleX, scaleY } from '@kirz/nativewind-scale';
import { Image } from 'expo-image';
import { ScrollView, useWindowDimensions, View } from 'react-native';

import { EmptyList } from '@/components/empty-list';
import { useSecretPasswords } from '@/hooks/use-secret-passwords';
import MainBgImage from '@/images/main-bg.png';
import { PageHeader } from '@/ui/page-header';

import AddPasswordButton from '../components/add-password-button';
import SavedAccountsArea from '../components/saved-accounts-area';

export default function PasswordsTab() {
  const { width } = useWindowDimensions();
  const { passwords } = useSecretPasswords();

  const hasPasswords = passwords && passwords.length > 0;

  return (
    <View className="flex-1">
      <PageHeader homePage pageName={t('basic.passwords')} />
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

      {hasPasswords ? (
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{ marginBottom: 0 }}
          contentContainerStyle={{ paddingBottom: scaleY(84) }}
        >
          <View className="flex-1 items-center justify-center gap-y-5 px-1.5">
            <SavedAccountsArea />
          </View>
        </ScrollView>
      ) : (
        <View className="flex-1">
          <EmptyList text={t('pages.safe-storage.nothing-here')} />
        </View>
      )}

      <View className="absolute bottom-20 w-full">
        <AddPasswordButton />
      </View>
    </View>
  );
}
