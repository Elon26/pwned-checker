import { scaleX } from '@kirz/nativewind-scale';
import { Pressable } from 'react-native';

import { colors } from '@/config/theme';
import { SfSymbol } from '@/ui/sf-symbol';
import { UiText } from '@/ui/ui-text';

type Props = {
  label: string;
  handler: () => void;
};

export default function SettingsCard({ label, handler }: Props) {
  return (
    <Pressable
      className="flex-row justify-between border-b border-gray py-4"
      onPress={handler}
    >
      <UiText className="text-lg">{label}</UiText>
      <SfSymbol
        name="arrow.right"
        tintColor={colors.primary.toString()}
        size={scaleX(24)}
      />
    </Pressable>
  );
}
