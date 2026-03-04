/* eslint-disable react-compiler/react-compiler */
import { usePurchases } from '@kirz/expo-toolkit';
import { scaleY } from '@kirz/nativewind-scale';
import { ResizeMode, Video } from 'expo-av';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import {
  Animated,
  ScrollView,
  useWindowDimensions,
  View,
  ViewStyle,
} from 'react-native';
import {
  runOnJS,
  useAnimatedReaction,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { twMerge } from 'tailwind-merge';

import { useConfig } from '@/hooks/use-config';
import { usePaywall } from '@/hooks/use-paywall';
import ScanMessage from '@/types/scan-message';
import { Pressable } from '@/ui/pressable';
import { UiText } from '@/ui/ui-text';
import { uuid } from '@/utils/uuid';

import ProgressBar from './components/progress-bar';
import { scanSteps } from './constants/scan-steps';

export default function PrescanPage() {
  const duration = 15000;
  const insets = useSafeAreaInsets();
  const { width, height } = useWindowDimensions();
  const { hasPremium } = usePurchases();
  const { showPaywall } = usePaywall();
  const { onboarding_paywall_id } = useConfig();

  const scanProgress = useSharedValue(0);
  const leakedEmailsProgress = useSharedValue(0);
  const leakedPasswordsProgress = useSharedValue(0);
  const [value, setValue] = useState(0);
  const [leakedEmails, setLeakedEmails] = useState(0);
  const [leakedPasswords, setLeakedPasswords] = useState(0);
  const [currentTarget, setCurrentTarget] = useState('');
  const [messages, setMessages] = useState<ScanMessage[]>([]);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const stepIndexRef = useRef(0);
  const [isVideoActing, setIsVideoActing] = useState(true);
  const maxLeakedEmails = Math.floor(Math.random() * 10) + 1;
  const maxLeaksPasswords = Math.floor(Math.random() * 50) + 1;
  const opacity = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(1)).current;
  const [overflow, setOverflow] = useState<ViewStyle['overflow']>('hidden');

  useEffect(() => {
    scanProgress.value = withTiming(100, { duration });
    leakedEmailsProgress.value = withTiming(maxLeakedEmails, {
      duration,
    });
    leakedPasswordsProgress.value = withTiming(maxLeaksPasswords, { duration });
    setTimeout(() => {
      setIsVideoActing(false);
    }, duration);
  }, []);

  useAnimatedReaction(
    () => Math.floor(scanProgress.value),
    (current, prev) => {
      if (current !== prev) {
        runOnJS(setValue)(current);
      }
    }
  );

  useAnimatedReaction(
    () => Math.floor(leakedEmailsProgress.value),
    (current, prev) => {
      if (current !== prev) {
        runOnJS(setLeakedEmails)(current);
      }
    }
  );

  useAnimatedReaction(
    () => Math.floor(leakedPasswordsProgress.value),
    (current, prev) => {
      if (current !== prev) {
        runOnJS(setLeakedPasswords)(current);
      }
    }
  );

  useEffect(() => {
    if (!scanSteps.length) return;

    const runStep = () => {
      const step = scanSteps[stepIndexRef.current];
      if (!step) return;

      setCurrentTarget(step.target);
      setMessages((prev) => [
        { message: step.action, severity: 'safe' },
        ...prev,
      ]);

      timeoutRef.current = setTimeout(() => {
        setMessages((prev) => [
          { message: step.result, severity: step.severity },
          ...prev,
        ]);
        stepIndexRef.current += 1;
        runStep();
      }, step.duration);
    };

    runStep();

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [scanSteps]);

  useEffect(() => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 1000,
      delay: 16000,
      useNativeDriver: true,
    }).start(() => {
      setOverflow('visible');
      Animated.sequence([
        Animated.timing(scale, {
          toValue: 1.1,
          duration: 400,
          useNativeDriver: true,
        }),
        Animated.timing(scale, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
        }),
      ]).start();
    });
  }, [opacity]);

  return (
    <View>
      <Image
        className="absolute left-0 top-0"
        source="https://passlist.online/scanning_bg.png"
        style={{ width, height, backgroundColor: '#0a1124' }}
      />
      <View
        className="absolute gap-y-4 left-0 top-0"
        style={{
          width,
          height,
          paddingTop: insets.top + scaleY(16),
          paddingBottom: insets.bottom + scaleY(16),
        }}
      >
        <View className="flex-row justify-between px-10 w-full">
          <UiText className="text-xl font-semibold text-white">
            {t('pages.prescan.leaks-scanner')}
          </UiText>
          <UiText className="text-xl font-semibold text-white">
            {t('pages.prescan.version')}3.1.4
          </UiText>
        </View>

        <View
          className="border-y-4 border-blue/10"
          style={{ width, height: scaleY(240) }}
        >
          <Image
            className="absolute left-0 top-0"
            source="https://passlist.online/first_frame.png"
            style={{ width, height: scaleY(240) }}
          />
          {isVideoActing && (
            <View
              className="absolute left-0 top-0"
              style={{ width, height: scaleY(240) }}
            >
              <Video
                source={{ uri: 'https://passlist.online/scanning_small.mp4' }}
                posterSource={{
                  uri: 'https://passlist.online/first_frame.png',
                }}
                style={{ width, height: scaleY(240) }}
                shouldPlay
                isLooping={false}
                isMuted
                resizeMode={ResizeMode.COVER}
                useNativeControls={false}
                pointerEvents="none"
              />
            </View>
          )}
        </View>
        <View className="flex-row justify-center gap-x-2 mt-2">
          <UiText className="text-lg font-medium text-white/90">
            {t('pages.prescan.scanning')}...
          </UiText>
          <UiText className="text-lg font-medium text-white/30">
            {value}%
          </UiText>
        </View>
        <View className="px-edge">
          <ProgressBar progress={value} duration={300} />
        </View>
        <View className="flex-row items-center justify-center gap-x-4">
          <UiText className="font-semibold text-red">
            {t('pages.prescan.leaked-emails')}: {leakedEmails}
          </UiText>
          <View className="w-[1px] bg-white/90 h-full" />
          <UiText className="font-semibold text-red">
            {t('pages.prescan.leaked-passwords')}: {leakedPasswords}
          </UiText>
        </View>
        <View className="flex-1 bg-black/20 px-edge">
          <View className="rounded-2xl border-2 border-white/20 p-4 h-full">
            <UiText className="text-lg font-semibold text-white/90">
              {currentTarget}
            </UiText>
            <View className="bg-white/20 my-4 h-0.5 w-full" />
            <ScrollView
              className="overflow-hidden"
              contentContainerClassName="gap-y-2"
              showsVerticalScrollIndicator={false}
            >
              {messages.map((message) => (
                <UiText
                  key={uuid()}
                  className={twMerge(
                    'text-sm font-semibold text-white/90',
                    message.severity === 'warning' && 'text-yellow',
                    message.severity === 'leaked' && 'text-red'
                  )}
                  style={{
                    color:
                      message.severity === 'warning'
                        ? 'yellow'
                        : message.severity === 'leaked'
                          ? 'red'
                          : 'white',
                  }}
                >
                  {message.message}
                </UiText>
              ))}
            </ScrollView>
          </View>
        </View>
        <Animated.View
          className="absolute items-center px-edge w-full"
          style={{
            opacity,
            overflow,
            bottom: insets.bottom + scaleY(100),
            transform: [{ scale }],
          }}
        >
          <Pressable
            className="items-center justify-center rounded-3xl h-14 w-full"
            onPress={() => {
              router.replace('/premain');
              if (!hasPremium) showPaywall(onboarding_paywall_id);
            }}
          >
            <View className="absolute overflow-hidden rounded-full h-full w-full">
              <LinearGradient
                colors={['#fe6447', '#fd7a3d', '#fb4521']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={{ flex: 1 }}
              />
            </View>
            <UiText className="text-xl font-semibold text-white">
              {t('pages.prescan.fix-immediately')}
            </UiText>
          </Pressable>
        </Animated.View>
      </View>
    </View>
  );
}
