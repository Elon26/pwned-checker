import { scaleX, scaleY } from '@kirz/nativewind-scale';
import { shareAsync } from 'expo-sharing';
import { Pressable, useWindowDimensions, View } from 'react-native';

import { UiText } from '@/ui/ui-text';

type Props = {
  path: string;
  fileName: string;
};

export default function FileFiller({ fileName, path }: Props) {
  const { width, height } = useWindowDimensions();

  function handlePress() {
    shareAsync(path);
  }

  return (
    <View
      className="items-center justify-center"
      style={{ width: width - scaleX(40), height: height - scaleY(180) }}
    >
      <Pressable onPress={handlePress}>
        <UiText className="text-lg font-semibold underline">{fileName}</UiText>
      </Pressable>
    </View>
  );
}
