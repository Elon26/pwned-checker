import { Env } from '@kirz/expo-env';
import { scaleX, scaleY } from '@kirz/nativewind-scale';
import { Image } from 'expo-image';
import { ScrollView, useWindowDimensions, View } from 'react-native';

import MainBgImage from '@/images/main-bg.png';
import { PageHeader } from '@/ui/page-header';

import MainTabCheckOverview from '../components/main-tab-check-overview';
import PasswordLinksArea from '../components/password-links-area';
import StorageLinksArea from '../components/storage-links-area';

type Props = {
  goToPasswordTab: () => void;
};

export default function HomeTab({ goToPasswordTab }: Props) {
  const { width } = useWindowDimensions();

  return (
    <View className="flex-1">
      <PageHeader homePage pageName={Env.APP_NAME} />
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

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ marginBottom: 0 }}
        contentContainerStyle={{ paddingBottom: scaleY(20) }}
      >
        <View className="gap-y-4 px-1.5">
          <MainTabCheckOverview />
          <PasswordLinksArea goToPasswordTab={goToPasswordTab} />
          <StorageLinksArea />
        </View>
      </ScrollView>
    </View>
  );
}
