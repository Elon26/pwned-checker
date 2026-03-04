import { scaleX, scaleY } from '@kirz/nativewind-scale';
import { Image } from 'expo-image';
import { View } from 'react-native';

import OnboardingImage from '@/images/onboarding-3.png';
import { Page } from '@/ui/page';
import { UiText } from '@/ui/ui-text';

export function OnboardingA3() {
  return (
    <Page>
      <View className="items-center gap-y-5 my-2">
        <UiText className="text-center px-20">
          <UiText className="text-2xl font-bold">Keep your</UiText>
          <UiText className="text-2xl font-bold text-primary"> secrets</UiText>
        </UiText>
        <Image
          source={OnboardingImage}
          style={{ width: scaleX(200), height: scaleY(400) }}
          contentFit="contain"
        />
        <UiText className="text-center px-10">
          <UiText className="text-xl font-bold">Secret folder </UiText>
          <UiText className="text-xl">for contacts and any files</UiText>
        </UiText>
      </View>
    </Page>
  );
}
