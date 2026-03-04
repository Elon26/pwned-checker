import { scaleX, scaleY } from '@kirz/nativewind-scale';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Pressable, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import { colors } from '@/config/theme';
import { shadows } from '@/config/theme/shadows';
import { UiText } from '@/ui/ui-text';

type Props = {
  isMailMode: boolean;
  setIsMailMode: Dispatch<SetStateAction<boolean>>;
};

export function ModeSelector({ isMailMode, setIsMailMode }: Props) {
  const left = useSharedValue(scaleX(20));
  const [mailColor, setMailColor] = useState(colors.white.toString());
  const [passwordColor, setPasswordColor] = useState(colors.black.toString());

  const animatedStyle = useAnimatedStyle(() => ({
    left: left.value,
  }));

  useEffect(() => {
    // eslint-disable-next-line react-compiler/react-compiler
    left.value = withTiming(isMailMode ? scaleX(20) : scaleX(186), {
      duration: 500,
    });

    if (isMailMode) {
      setTimeout(() => {
        setMailColor(colors.white.toString());
        setPasswordColor(colors.black.toString());
      }, 250);
    } else {
      setTimeout(() => {
        setMailColor(colors.black.toString());
        setPasswordColor(colors.white.toString());
      }, 225);
    }
  }, [isMailMode]);

  return (
    <View
      className="flex-row rounded-3xl bg-white gap-x-7 px-5 py-2.5"
      style={shadows.md}
    >
      <Animated.View
        className="absolute rounded-3xl bg-primary top-2.5"
        style={[
          {
            width: scaleX(137),
            height: scaleY(36),
          },
          animatedStyle,
        ]}
      />
      <Pressable
        style={{ width: scaleX(137) }}
        onPress={() => setIsMailMode(true)}
      >
        <UiText className="text-center py-2" style={{ color: mailColor }}>
          {t('pages.leak-check.email')}
        </UiText>
      </Pressable>
      <Pressable
        style={{ width: scaleX(137) }}
        onPress={() => setIsMailMode(false)}
      >
        <UiText className="text-center py-2" style={{ color: passwordColor }}>
          {t('pages.leak-check.password')}
        </UiText>
      </Pressable>
    </View>
  );
}
