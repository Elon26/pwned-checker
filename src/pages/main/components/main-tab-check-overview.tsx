import { router } from 'expo-router';
import { View } from 'react-native';

import { shadows } from '@/config/theme/shadows';
import { useStorage } from '@/hooks/use-storage';
import AlertBigIcon from '@/svg/alert-big.svg';
import AlertSmallIcon from '@/svg/alert-small.svg';
import CheckIcon from '@/svg/check.svg';
import { Pressable } from '@/ui/pressable';
import { UiText } from '@/ui/ui-text';

export default function MainTabCheckOverview() {
  const [lastCheckTimestamp] = useStorage('lastCheckTimestamp');
  const [checkQuantity] = useStorage('checkQuantity');
  const [emailCheckHistory] = useStorage('emailCheckHistory');
  const [passwordCheckHistory] = useStorage('passwordCheckHistory');
  const emailLeaksQuantity = emailCheckHistory.filter(
    (item) => item.isPwned
  ).length;
  const passwordLeaksQuantity = passwordCheckHistory.filter(
    (item) => item.isPwned
  ).length;
  const today = new Date();
  const yesterday = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() - 1,
    today.getHours()
  );

  const isLastCheckToday =
    new Date(lastCheckTimestamp).getDate() === today.getDate() &&
    new Date(lastCheckTimestamp).getMonth() === today.getMonth() &&
    new Date(lastCheckTimestamp).getFullYear() === today.getFullYear();
  const isLastCheckYesterday =
    new Date(lastCheckTimestamp).getDate() === yesterday.getDate() &&
    new Date(lastCheckTimestamp).getMonth() === yesterday.getMonth() &&
    new Date(lastCheckTimestamp).getFullYear() === yesterday.getFullYear();

  return (
    <View>
      {lastCheckTimestamp === 0 && checkQuantity === 0 && (
        <View
          className="items-center rounded-2xl bg-white gap-y-4 p-6"
          style={shadows.md}
        >
          <AlertBigIcon />
          <UiText className="text-center text-lg font-semibold leading-[1.5]">
            {t('pages.home-tab.never-checked')}
          </UiText>
          <Pressable
            className="justify-center rounded-xl bg-primary h-12 w-full"
            onPress={() => router.navigate('/leak-check')}
            style={shadows.md}
          >
            <UiText className="text-center font-medium text-white">
              {t('pages.home-tab.check-now')}
            </UiText>
          </Pressable>
        </View>
      )}
      {lastCheckTimestamp !== 0 &&
        checkQuantity !== 0 &&
        emailLeaksQuantity === 0 &&
        passwordLeaksQuantity === 0 && (
          <View
            className="items-center rounded-2xl bg-primary gap-y-4 p-6"
            style={shadows.md}
          >
            <View className="items-center justify-center rounded-full bg-white size-16">
              <CheckIcon />
            </View>
            <View className="gap-y-1">
              <UiText className="text-center text-lg font-semibold text-white">
                {t('pages.home-tab.data-safe')}
              </UiText>
              <UiText className="text-center text-sm text-white">
                {t('pages.home-tab.no-leaks')}
              </UiText>
              <UiText className="text-center text-xs text-white">
                {t('pages.home-tab.last-check')}:{' '}
                {isLastCheckToday ? t('pages.home-tab.today') : ''}
                {isLastCheckYesterday ? t('pages.home-tab.yesterday') : ''}
                {!isLastCheckToday &&
                  !isLastCheckYesterday &&
                  new Date(lastCheckTimestamp).toLocaleDateString('en-US', {
                    day: '2-digit',
                    month: 'short',
                  })}
                .
              </UiText>
            </View>
            <Pressable
              className="justify-center rounded-xl bg-white h-12 w-full"
              onPress={() => router.navigate('/leak-check')}
              style={shadows.md}
            >
              <UiText className="text-center font-medium text-primary">
                {t('pages.home-tab.check-again')}
              </UiText>
            </Pressable>
          </View>
        )}
      {lastCheckTimestamp !== 0 &&
        checkQuantity !== 0 &&
        (emailLeaksQuantity !== 0 || passwordLeaksQuantity !== 0) && (
          <View
            className="items-center rounded-2xl bg-red gap-y-4 p-6"
            style={shadows.md}
          >
            <View className="items-center justify-center rounded-full bg-white size-16">
              <AlertSmallIcon />
            </View>
            <View className="gap-y-1">
              <UiText className="text-center text-lg font-semibold text-white">
                {t('pages.home-tab.leaks-detected')}
              </UiText>
              <UiText className="text-center text-sm text-white">
                {emailLeaksQuantity
                  ? t('pages.home-tab.emails-compromised', {
                      count: emailLeaksQuantity,
                    })
                  : t('pages.home-tab.passwords-compromised', {
                      count: passwordLeaksQuantity,
                    })}
              </UiText>
              <UiText className="text-center text-xs text-white">
                {t('pages.home-tab.last-check')}:{' '}
                {isLastCheckToday ? t('pages.home-tab.today') : ''}
                {isLastCheckYesterday ? t('pages.home-tab.yesterday') : ''}
                {!isLastCheckToday &&
                  !isLastCheckYesterday &&
                  new Date(lastCheckTimestamp).toLocaleDateString('en-US', {
                    day: '2-digit',
                    month: 'short',
                  })}
                .
              </UiText>
            </View>
            <Pressable
              className="justify-center rounded-xl bg-white h-12 w-full"
              onPress={() => router.navigate('/leak-check')}
              style={shadows.md}
            >
              <UiText className="text-center font-medium text-primary">
                {t('pages.home-tab.view-details')}
              </UiText>
            </Pressable>
          </View>
        )}
    </View>
  );
}
