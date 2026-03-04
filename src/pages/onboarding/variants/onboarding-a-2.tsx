import { scaleX, scaleY } from '@kirz/nativewind-scale';
import { Image } from 'expo-image';
import { View } from 'react-native';

import OnboardingImage from '@/images/onboarding-2.png';
import { Page } from '@/ui/page';
import { UiText } from '@/ui/ui-text';

export function OnboardingA2() {
  return (
    <Page>
      <View className="items-center gap-y-5 my-2">
        <UiText className="text-center px-10">
          <UiText className="text-2xl font-bold">
            Save your passwords in one place
          </UiText>
        </UiText>
        <Image
          source={OnboardingImage}
          style={{ width: scaleX(200), height: scaleY(400) }}
          contentFit="contain"
        />
        <UiText className="text-center px-10">
          <UiText className="text-xl font-bold">Manage </UiText>
          <UiText className="text-xl">all passwords with</UiText>
          <UiText className="text-xl font-bold"> one click or swipe</UiText>
        </UiText>
      </View>
    </Page>
  );
}
