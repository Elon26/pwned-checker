import { scaleY } from '@kirz/nativewind-scale';
import Slider from '@react-native-community/slider';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { ScrollView, Switch, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { twMerge } from 'tailwind-merge';

import CircleArrowsIcon from '@/svg/circle-arrows.svg';
import { Page } from '@/ui/page';
import { PageHeader } from '@/ui/page-header';
import { UiButton } from '@/ui/ui-button';
import { UiText } from '@/ui/ui-text';

import PasswordArea from './components/password-area';

export default function GeneratePasswordPage() {
  const insets = useSafeAreaInsets();
  const [currentLength, setCurrentLength] = useState(8);
  const [isDigitsActive, setIsDigitsActive] = useState(false);
  const [isLettersActive, setIsLettersActive] = useState(false);
  const [isSignsActive, setIsSignsActive] = useState(false);
  const [isAllInactive, setIsAllInactive] = useState(true);
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (!isDigitsActive && !isLettersActive && !isSignsActive) {
      setIsAllInactive(true);
    } else {
      setIsAllInactive(false);
    }
  }, [isDigitsActive, isLettersActive, isSignsActive]);

  function generatePassword() {
    const cs =
      (isDigitsActive ? '0123456789' : '') +
      (isLettersActive
        ? 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
        : '') +
      (isSignsActive ? '!@#$%^&*()' : '');
    const result = Array.from(
      { length: currentLength },
      () => cs[Math.floor(Math.random() * cs.length)]
    ).join('');
    setPassword(result);
  }

  return (
    <Page>
      <PageHeader pageName={t('pages.generate-password.page-name')} />

      <View className="gap-y-5">
        <PasswordArea password={password} />
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{ marginBottom: 0 }}
          contentContainerStyle={{ marginBottom: insets.bottom + scaleY(16) }}
        >
          <View className="gap-y-4 mb-10">
            <UiText className="text-lg font-bold">
              {t('pages.generate-password.settings')}
            </UiText>
            <View className="rounded-xl border border-gray bg-gray/20 gap-y-2 p-4">
              <View className="flex-row items-center justify-between">
                <UiText className="font-bold">
                  {t('pages.generate-password.length')}
                </UiText>
                <View className="flex-row items-center gap-x-4 w-28">
                  <UiText className="text-3xl font-bold">
                    {currentLength}
                  </UiText>
                  <UiText className="text-sm">
                    {t('pages.generate-password.password-symbols')}
                  </UiText>
                </View>
              </View>
              <View className="px-2">
                <Slider
                  minimumValue={4}
                  maximumValue={32}
                  step={1}
                  value={currentLength}
                  onValueChange={setCurrentLength}
                  style={{ width: '100%', height: 40 }}
                />
              </View>

              {password && (
                <View className="absolute z-10 items-center left-5 -bottom-10 w-full">
                  <TouchableOpacity
                    className="aspect-square items-center justify-center rounded-full bg-primary size-15"
                    onPress={() => generatePassword()}
                  >
                    <CircleArrowsIcon />
                  </TouchableOpacity>
                </View>
              )}
            </View>

            <View className="rounded-xl border border-gray bg-gray/20 gap-y-2 p-4">
              <UiText className="">
                {t('pages.generate-password.options')}
              </UiText>
              <View className="flex-row items-center justify-between border-b border-gray py-2">
                <View className="gap-y-1">
                  <UiText className="text-xl">
                    {t('pages.generate-password.digits')}
                  </UiText>
                  <UiText className="text-sm text-gray">
                    {t('pages.generate-password.e.g.')} 123
                  </UiText>
                </View>
                <Switch
                  className="right-3"
                  value={isDigitsActive}
                  onValueChange={setIsDigitsActive}
                />
              </View>
              <View className="flex-row items-center justify-between border-b border-gray py-2">
                <View className="gap-y-1">
                  <UiText className="text-xl">
                    {t('pages.generate-password.letters')}
                  </UiText>
                  <UiText className="text-sm text-gray">
                    {t('pages.generate-password.e.g.Aa')}
                  </UiText>
                </View>
                <Switch
                  className="right-3"
                  value={isLettersActive}
                  onValueChange={setIsLettersActive}
                />
              </View>
              <View className="flex-row items-center justify-between py-2">
                <View className="gap-y-1">
                  <UiText className="text-xl">
                    {t('pages.generate-password.signs-and-marks')}
                  </UiText>
                  <UiText className="text-sm text-gray">
                    {t('pages.generate-password.e.g.')} @#
                  </UiText>
                </View>
                <Switch
                  className="right-3"
                  value={isSignsActive}
                  onValueChange={setIsSignsActive}
                />
              </View>
            </View>
            <View
              className="items-center"
              style={{ marginBottom: insets.bottom + scaleY(120) }}
            >
              {password ? (
                <UiButton
                  className="h-13"
                  onPress={() =>
                    router.navigate({
                      pathname: '/create-account',
                      params: { password },
                    })
                  }
                >
                  {t('basic.save')}
                </UiButton>
              ) : (
                <UiButton
                  disabled={isAllInactive}
                  className={twMerge('h-13', isAllInactive && 'bg-gray')}
                  onPress={generatePassword}
                >
                  {t('pages.generate-password.generate')}
                </UiButton>
              )}
            </View>
          </View>
        </ScrollView>
      </View>
    </Page>
  );
}
