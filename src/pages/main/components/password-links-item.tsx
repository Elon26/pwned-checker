import { FunctionComponent } from 'react';
import { View } from 'react-native';
import { SvgProps } from 'react-native-svg';

import { shadows } from '@/config/theme/shadows';
import { UiText } from '@/ui/ui-text';
import { SfSymbol } from '@/ui/sf-symbol';
import { scaleX } from '@kirz/nativewind-scale';
import { Pressable } from '@/ui/pressable';

type Props = {
  Icon: FunctionComponent<SvgProps>;
  title: string;
  subtitle: string;
  handler: () => void;
};

export default function PasswordLinksItem({
  Icon,
  title,
  subtitle,
  handler,
}: Props) {
  return (
    <Pressable
      className="flex-row items-center rounded-2xl bg-white gap-x-3 px-4 py-5"
      style={shadows.md}
      onPress={handler}
    >
      <View className="items-center justify-center rounded-xl bg-primary size-9">
        <Icon />
      </View>
      <View className="flex-1">
        <UiText className="text-lg font-semibold">{title}</UiText>
        <UiText className="text-xs text-[#4A5565]">{subtitle}</UiText>
      </View>
      <SfSymbol
        name="chevron.right"
        size={scaleX(16)}
        weight="semibold"
        tintColor="gray"
      />
    </Pressable>
  );
}
