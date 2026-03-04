import { FunctionComponent } from 'react';
import { View } from 'react-native';
import { SvgProps } from 'react-native-svg';

import { UiText } from '@/ui/ui-text';
import { SfSymbol } from '@/ui/sf-symbol';
import { scaleX } from '@kirz/nativewind-scale';
import { Pressable } from '@/ui/pressable';

type Props = {
  Icon: FunctionComponent<SvgProps>;
  title: string;
  subtitle: string;
  color: string;
  handler: () => void;
};

export default function StorageLinksItem({
  Icon,
  title,
  subtitle,
  color,
  handler,
}: Props) {
  return (
    <Pressable
      className="flex-row items-center rounded-2xl gap-x-3 px-2 py-3"
      onPress={handler}
    >
      <View
        className="items-center justify-center rounded-xl bg-primary size-9"
        style={{ backgroundColor: color }}
      >
        <Icon />
      </View>
      <View className="flex-1">
        <UiText className="text-lg font-semibold">{title}</UiText>
      </View>
      <View>
        <UiText className="text-sm text-[#4A5565]">{subtitle}</UiText>
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
