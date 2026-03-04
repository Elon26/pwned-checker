import { router } from 'expo-router';
import { useMemo } from 'react';
import { View } from 'react-native';

import { shadows } from '@/config/theme/shadows';
import { useStorage, useStorageValue } from '@/hooks/use-storage';
import AlarmIcon from '@/svg/alarm.svg';
import CheckedIcon from '@/svg/checked.svg';
import { UiButton } from '@/ui/ui-button';
import { UiText } from '@/ui/ui-text';

export default function MainCheckArea() {
  const [lastCheckTimestamp] = useStorage('lastCheckTimestamp');
  const [checkQuantity] = useStorage('checkQuantity');
  const emailCheckHistory = useStorageValue('emailCheckHistory');
  const passwordCheckHistory = useStorageValue('passwordCheckHistory');
  const needToRecheck =
    Date.now() - lastCheckTimestamp > 7 * 24 * 60 * 60 * 1000;

  const recheckMessage = useMemo(() => {
    let emailToRecheckQuantity = 0;
    let passwordToRecheckQuantity = 0;
    emailCheckHistory.forEach((item) => {
      if (!item.isPwned) emailToRecheckQuantity++;
    });
    passwordCheckHistory.forEach((item) => {
      if (!item.isPwned) passwordToRecheckQuantity++;
    });
    const parts: string[] = [];
    if (emailToRecheckQuantity > 0) {
      parts.push(
        t('pages.leak-check.emails', { count: emailToRecheckQuantity })
      );
    }
    if (passwordToRecheckQuantity > 0) {
      parts.push(
        t('pages.leak-check.passwords', { count: passwordToRecheckQuantity })
      );
    }

    return parts.join(` ${t('basic.and')} `);
  }, [emailCheckHistory, passwordCheckHistory]);

  return (
    <View
      className="rounded-3xl bg-white gap-y-3 p-4 w-full"
      style={shadows.md}
    >
      <View className="gap-y-1">
        <UiText className="text-xl font-medium">
          {t('pages.main.check-your-password')}
        </UiText>
        <UiText className="text-sm text-black/40">
          {t('pages.main.last-check')}:{' '}
          {lastCheckTimestamp
            ? new Date(lastCheckTimestamp).toLocaleDateString('en-US', {
                day: '2-digit',
                month: 'short',
              })
            : t('basic.no-data')}
        </UiText>
      </View>
      {lastCheckTimestamp === 0 && !checkQuantity && (
        <View className="flex-row items-center gap-x-4">
          <AlarmIcon />
          <UiText className="flex-1 rounded-2xl bg-gray/10 text-center text-gray p-2">
            {t('pages.main.recommendation')}
          </UiText>
        </View>
      )}
      {lastCheckTimestamp > 0 && checkQuantity && !needToRecheck && (
        <View className="flex-row items-center gap-x-4">
          <CheckedIcon />
          <UiText className="flex-1 rounded-2xl bg-gray/10 text-center text-gray p-2">
            {t('pages.main.no-leaks')}
          </UiText>
        </View>
      )}
      {lastCheckTimestamp > 0 && checkQuantity && needToRecheck && (
        <View className="flex-row items-center gap-x-4">
          <AlarmIcon />
          <UiText className="flex-1 rounded-2xl bg-gray/10 text-center text-gray p-2">
            {t('pages.main.recheck-require', { text: recheckMessage })}
          </UiText>
        </View>
      )}
      <View className="border-t border-gray pt-2">
        <UiText className="rounded-2xl text-center text-gray">
          {lastCheckTimestamp && checkQuantity
            ? t('pages.main.check-quantity', { count: checkQuantity })
            : t('pages.main.first-check')}
        </UiText>
      </View>
      <UiButton
        onPress={() => router.navigate('/leak-check')}
        className="w-full"
      >
        {t('basic.check')}
      </UiButton>
    </View>
  );
}
