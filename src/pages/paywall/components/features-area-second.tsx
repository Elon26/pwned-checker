import { scaleX } from '@kirz/nativewind-scale';
import { View } from 'react-native';

import { shadows } from '@/config/theme/shadows';
import { SfSymbol } from '@/ui/sf-symbol';
import { UiText } from '@/ui/ui-text';
import { uuid } from '@/utils/uuid';

export function FeaturesAreaSecond() {
  const features = [
    t('pages.paywall.save-passwords'),
    t('pages.paywall.create-passwords'),
    t('pages.paywall.private-locker'),
    t('pages.paywall.boost-device'),
    t('pages.paywall.check-your-passwords'),
  ];

  return (
    <View className="flex-row flex-wrap justify-center gap-2">
      {features.map((text) => (
        <View
          key={uuid()}
          className="flex-row items-center rounded-3xl bg-white gap-x-2.5 px-2 py-2.5"
          style={shadows.md}
        >
          <SfSymbol
            name="checkmark"
            size={scaleX(18)}
            weight="semibold"
            tintColor="green"
          />
          <UiText className="text-sm font-medium">{text}</UiText>
        </View>
      ))}
    </View>
  );
}
