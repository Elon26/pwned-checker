import { scaleX } from '@kirz/nativewind-scale';
import { View } from 'react-native';

import FolderEmptyIcon from '@/svg/folder-empty.svg';
import { UiText } from '@/ui/ui-text';

type EmptyListProps = {
  text: string;
};

export function EmptyList({ text }: EmptyListProps) {
  return (
    <View className="flex-1 items-center justify-center">
      <View style={{ width: scaleX(156), height: scaleX(156) }}>
        <FolderEmptyIcon />
      </View>
      <UiText className="text-center text-lg font-medium text-gray">
        {text}
      </UiText>
    </View>
  );
}
