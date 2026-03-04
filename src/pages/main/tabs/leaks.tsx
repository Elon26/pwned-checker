import { scaleX, scaleY } from '@kirz/nativewind-scale';
import { Image } from 'expo-image';
import { router, useFocusEffect } from 'expo-router';
import { usePinSettings } from 'expo-with-pincode';
import { useCallback } from 'react';
import { useWindowDimensions, View } from 'react-native';

import MainBgImage from '@/images/main-bg.png';
import { PageHeader } from '@/ui/page-header';

import MainCheckArea from '../components/main-check-area';

export default function LeaksTab() {
  const { width } = useWindowDimensions();
  const { isPincodeSet } = usePinSettings();

  useFocusEffect(
    useCallback(() => {
      if (!isPincodeSet) {
        router.navigate('/set-pin');
      }
    }, [isPincodeSet])
  );

  return (
    <View className="flex-1">
      <PageHeader homePage pageName={t('basic.leaks')} />
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
      <View className="flex-1 items-center justify-center -top-6">
        <MainCheckArea />
      </View>
    </View>
  );
}
