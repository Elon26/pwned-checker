import { scaleX, scaleY } from '@kirz/nativewind-scale';
import { Image } from 'expo-image';
import { View } from 'react-native';

import OnboardingImage from '@/images/onboarding-1.png';
import { Page } from '@/ui/page';
import { UiText } from '@/ui/ui-text';

export function OnboardingA1() {
  return (
    <Page>
      <View className="items-center gap-y-5 my-2">
        <UiText className="text-center">
          <UiText className="text-2xl font-bold text-primary">Strong </UiText>
          <UiText className="text-2xl font-bold">
            password for any accounts
          </UiText>
        </UiText>
        <Image
          source={OnboardingImage}
          style={{ width: scaleX(200), height: scaleY(400) }}
          contentFit="contain"
        />
        <UiText className="text-center">
          <UiText className="text-xl font-bold">Generate </UiText>
          <UiText className="text-xl">and contain your</UiText>
          <UiText className="text-xl font-bold"> strong </UiText>
          <UiText className="text-xl">passwords</UiText>
        </UiText>
      </View>
    </Page>
  );
}
