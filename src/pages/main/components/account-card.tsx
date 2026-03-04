import { scaleX } from '@kirz/nativewind-scale';
import Clipboard from '@react-native-clipboard/clipboard';
import { router } from 'expo-router';
import { useState } from 'react';
import { Pressable, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useDerivedValue,
  withTiming,
} from 'react-native-reanimated';

import { shadows } from '@/config/theme/shadows';
import { Password } from '@/hooks/use-secret-passwords/types';
import CheckmarkIcon from '@/svg/checkmark.svg';
import CopyIcon from '@/svg/copy.svg';
import { Pressable as UiPressable } from '@/ui/pressable';
import { SfSymbol } from '@/ui/sf-symbol';
import { UiText } from '@/ui/ui-text';

type Props = {
  passwordItem: Password;
  deleteOnePassword: (passwordItem: Password) => void;
};

const AnimatedView = Animated.createAnimatedComponent(View);

export default function AccountCard({
  passwordItem,
  deleteOnePassword,
}: Props) {
  const [isCopied, setIsCopied] = useState(false);
  const currentColor = calcRandomColor();

  const progress = useDerivedValue(() => {
    return withTiming(isCopied ? 1 : 0, { duration: 200 });
  });

  const copyIconStyle = useAnimatedStyle(() => ({
    opacity: 1 - progress.value,
    transform: [{ scale: 1 - progress.value * 0.2 }],
  }));

  const checkmarkIconStyle = useAnimatedStyle(() => ({
    opacity: progress.value,
    transform: [{ scale: 0.8 + progress.value * 0.2 }],
  }));

  function handlePressCard() {
    router.navigate({
      pathname: '/change-password',
      params: { id: passwordItem.id },
    });
  }

  function calcRandomColor() {
    return `#${Math.floor(Math.random() * 0xffffff)
      .toString(16)
      .padStart(6, '0')}`;
  }

  function getFirstLetter(str: string) {
    let handledStr = str;
    if (handledStr.startsWith('https'))
      handledStr = handledStr.replace('https://', '');
    if (handledStr.startsWith('http'))
      handledStr = handledStr.replace('http://', '');
    return handledStr[0].toUpperCase();
  }

  function handleCopy() {
    if (isCopied) return;
    Clipboard.setString(passwordItem.password);
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  }

  return (
    <Pressable onPress={handlePressCard}>
      <View className="rounded-xl bg-white p-4 h-20" style={shadows.lg}>
        <View className="flex-row items-center justify-between gap-x-2 h-full">
          <View className="flex-1 flex-row items-center gap-x-4">
            <View
              className="items-center justify-center rounded-xl size-12"
              style={{ backgroundColor: currentColor + '20' }}
            >
              <UiText
                className="text-2xl font-bold"
                style={{ color: currentColor }}
              >
                {getFirstLetter(passwordItem.link)}
              </UiText>
            </View>
            <View className="flex-1">
              <UiText className="font-semibold" numberOfLines={1}>
                {passwordItem.link}
              </UiText>
              <UiText className="text-sm font-light" numberOfLines={1}>
                {passwordItem.login}
              </UiText>
            </View>
          </View>

          <View className="flex-row gap-x-1 -mr-2">
            <UiPressable
              className="items-center justify-center pl-2 py-2 size-8"
              onPress={handleCopy}
            >
              <AnimatedView
                style={[{ position: 'absolute' }, checkmarkIconStyle]}
              >
                <CheckmarkIcon width={20} height={20} />
              </AnimatedView>
              <AnimatedView style={copyIconStyle}>
                <CopyIcon width={20} height={20} />
              </AnimatedView>
            </UiPressable>
            <UiPressable
              className="items-center justify-center size-8"
              onPress={() => deleteOnePassword(passwordItem)}
            >
              <SfSymbol
                name="trash"
                size={scaleX(20)}
                weight="semibold"
                tintColor="red"
              />
            </UiPressable>
          </View>
        </View>
      </View>
    </Pressable>
  );
}
