import { scaleX } from '@kirz/nativewind-scale';
import { View } from 'react-native';

import { SfSymbol } from '@/ui/sf-symbol';
import { UiText } from '@/ui/ui-text';
import { uuid } from '@/utils/uuid';

export function FeaturesArea() {
  const features = [
    t('pages.paywall.manage-passwords'),
    t('pages.paywall.securely-files'),
    t('pages.paywall.check-leaks'),
    t('pages.paywall.generate-passwords'),
  ];

  return (
    <View className="rounded-2xl bg-white gap-y-5 px-6">
      {features.map((text) => (
        <View key={uuid()} className="flex-row items-center gap-x-3">
          <View className="items-center justify-center rounded-full bg-primary size-5">
            <SfSymbol
              name="checkmark"
              size={scaleX(12)}
              weight="semibold"
              tintColor="white"
            />
          </View>
          <UiText>{text}</UiText>
        </View>
      ))}
    </View>
  );
}
