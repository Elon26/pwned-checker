import { scaleX } from '@kirz/nativewind-scale';
import { useEffect, useState } from 'react';
import { View } from 'react-native';
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { twMerge } from 'tailwind-merge';

import AlarmIcon from '@/svg/alarm-in-circle.svg';
import EyeClosedIcon from '@/svg/eye-closed.svg';
import EyeOpenIcon from '@/svg/eye-open.svg';
import HistoryItem from '@/types/history-item';
import { Pressable } from '@/ui/pressable';
import { SfSymbol } from '@/ui/sf-symbol';
import { UiText } from '@/ui/ui-text';

type Props = {
  isMailMode: boolean;
  historyItem: HistoryItem;
};

export default function HistoryCard({ isMailMode, historyItem }: Props) {
  const [isPasswordHidden, setIsPasswordHidden] = useState(!isMailMode);
  const title = historyItem.name;
  const hiddenTitle = new Array(title.length).fill('*').join('');

  const [isDescriptionHidden, setIsDescriptionHidden] = useState(true);

  const animationProgress = useSharedValue(0);
  const [contentHeight, setContentHeight] = useState(0);

  useEffect(() => {
    animationProgress.value = withTiming(isDescriptionHidden ? 0 : 1, {
      duration: 300,
    });
  }, [isDescriptionHidden]);

  const arrowStyle = useAnimatedStyle(() => {
    const rotate = interpolate(
      animationProgress.value,
      [0, 1],
      [0, 180],
      Extrapolation.CLAMP
    );
    return {
      transform: [{ rotate: `${rotate}deg` }],
    };
  });

  const collapsibleStyle = useAnimatedStyle(() => {
    return {
      height: animationProgress.value * contentHeight,
      opacity: animationProgress.value,
    };
  });

  return (
    <View className="gap-y-2">
      <View
        key={historyItem.id}
        className="flex-row items-center justify-between border-b border-gray gap-x-1 px-4 h-11"
      >
        <UiText
          numberOfLines={1}
          className={twMerge(
            'flex-1 text-lg',
            historyItem.isPwned && 'text-red'
          )}
        >
          {isPasswordHidden ? hiddenTitle : title}
        </UiText>

        <View className="flex-row gap-x-1">
          {historyItem.isPwned && (
            <View className="flex-row gap-x-2">
              <AlarmIcon />
              {isMailMode && (
                <Pressable
                  onPress={() => setIsDescriptionHidden((prev) => !prev)}
                >
                  <Animated.View style={arrowStyle}>
                    <SfSymbol
                      name="chevron.up"
                      size={scaleX(20)}
                      weight="semibold"
                      tintColor="gray"
                    />
                  </Animated.View>
                </Pressable>
              )}
            </View>
          )}
          {!isMailMode && (
            <Pressable onPress={() => setIsPasswordHidden((prev) => !prev)}>
              {isPasswordHidden ? <EyeClosedIcon /> : <EyeOpenIcon />}
            </Pressable>
          )}
        </View>
      </View>
      <Animated.View style={[{ overflow: 'hidden' }, collapsibleStyle]}>
        <View
          className="absolute top-0 w-full"
          onLayout={(e) => setContentHeight(e.nativeEvent.layout.height)}
        >
          <UiText className="text-justify font-light pt-1">
            {historyItem.description}
          </UiText>
        </View>
      </Animated.View>
    </View>
  );
}
