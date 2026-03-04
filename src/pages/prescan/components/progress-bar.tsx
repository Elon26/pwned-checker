/* eslint-disable react-compiler/react-compiler */
import React, { useEffect, useRef } from 'react';
import { Animated, View } from 'react-native';

type Props = {
  progress: number;
  duration: number;
};

export default function ProgressBar({ progress, duration }: Props) {
  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: progress,
      duration: duration,
      useNativeDriver: false,
    }).start();
  }, [progress]);

  const width = animatedValue.interpolate({
    inputRange: [0, 100],
    outputRange: ['0%', '100%'],
    extrapolate: 'clamp',
  });

  return (
    <View className="overflow-hidden rounded-xl bg-blue/20 h-4 w-full">
      <Animated.View
        className="rounded-xl h-full"
        style={{ width, backgroundColor: '#55c3fa' }}
      />
    </View>
  );
}
