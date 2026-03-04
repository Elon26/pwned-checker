import { scaleX, scaleY } from '@kirz/nativewind-scale';
import { BlurView } from 'expo-blur';
import { useWindowDimensions, View } from 'react-native';

import { usePaywall } from '@/hooks/use-paywall';

import { UiButton } from './ui-button';

export default function Vail() {
  const { showPaywall } = usePaywall();
  const { width, height } = useWindowDimensions();

  return (
    <BlurView
      className="absolute z-10 overflow-hidden rounded-3xl left-0 top-0"
      style={{ width: width - scaleX(40), height: height - scaleY(260) }}
      intensity={20}
      tint="dark"
    >
      <View
        className="items-center justify-center"
        style={{ width: width - scaleX(40), height: height - scaleY(260) }}
      >
        <UiButton className="h-12 w-40" onPress={showPaywall}>
          {t('basic.get_premium')}
        </UiButton>
      </View>
    </BlurView>
  );
}
