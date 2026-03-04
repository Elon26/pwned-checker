import { Env } from '@kirz/expo-env';
import { scaleX, scaleY } from '@kirz/nativewind-scale';
import { Image } from 'expo-image';
import { useWindowDimensions, View } from 'react-native';

import { useHasPremiumWithBackdoor } from '@/hooks/use-developer-purchases';
import { usePaywall } from '@/hooks/use-paywall';
import { useWebViewModal } from '@/hooks/use-web-view-modal';
import MainBgImage from '@/images/main-bg.png';
import { Page } from '@/ui/page';
import { PageHeader } from '@/ui/page-header';

import SettingsCard from './components/settings-card';

export function SettingsPage() {
  const { width } = useWindowDimensions();
  const { openModal: openWebViewModal } = useWebViewModal();
  const { showPaywall } = usePaywall();
  const hasPremium = useHasPremiumWithBackdoor();

  return (
    <Page>
      <PageHeader pageName={t('pages.settings.page-name')} />
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
      <View className="flex-1">
        <SettingsCard
          label={t('pages.settings.privacy')}
          handler={() => openWebViewModal(Env.PRIVACY_POLICY)}
        />
        <SettingsCard
          label={t('pages.settings.license')}
          handler={() => openWebViewModal(Env.LICENCE_AGREEMENT)}
        />
        {!hasPremium && (
          <SettingsCard
            label={t('pages.settings.buy')}
            handler={() => showPaywall()}
          />
        )}
      </View>
    </Page>
  );
}
