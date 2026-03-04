import { scaleX } from '@kirz/nativewind-scale';
import { Dispatch, SetStateAction, useRef, useState } from 'react';
import { Pressable, TextInput, useWindowDimensions, View } from 'react-native';

import EyeClosedIcon from '@/svg/eye-closed.svg';
import EyeOpenIcon from '@/svg/eye-open-green.svg';
import { Pressable as UiPressable } from '@/ui/pressable';
import { UiText } from '@/ui/ui-text';

type Props = {
  name: string;
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
  isPassword?: boolean;
};

export default function UiInput({ name, value, setValue, isPassword }: Props) {
  const refInput = useRef<null | TextInput>(null);
  const [isHidden, setIsHidden] = useState(true);
  const { width } = useWindowDimensions();

  return (
    <Pressable
      className="flex-row items-center justify-between border-b border-gray h-13"
      onPress={() => refInput.current?.focus()}
    >
      <View className="gap-y-1">
        <UiText>{name}</UiText>
        <TextInput
          style={{
            width: width - scaleX(isPassword ? 70 : 40),
          }}
          value={value}
          onChangeText={setValue}
          ref={refInput}
          secureTextEntry={isPassword && isHidden}
        />
      </View>

      {isPassword && (
        <UiPressable onPress={() => setIsHidden((prev) => !prev)}>
          {isHidden ? <EyeClosedIcon /> : <EyeOpenIcon />}
        </UiPressable>
      )}
    </Pressable>
  );
}
