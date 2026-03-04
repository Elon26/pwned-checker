import { Env } from '@kirz/expo-env';
import { scaleX, scaleY } from '@kirz/nativewind-scale';
import { Image } from 'expo-image';
import { router } from 'expo-router';
import { ScrollView, Switch, useWindowDimensions, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import MainBgImage from '@/images/main-bg.png';
import { colors } from '@/config/theme';
import AppIcon from '@/images/splash.png';
import KeyIcon from '@/svg/key-alt.svg';
import SettingsIcon from '@/svg/settings.svg';
import { SfSymbol } from '@/ui/sf-symbol';
import { UiButton } from '@/ui/ui-button';
import { UiText } from '@/ui/ui-text';
import { Page } from '@/ui/page';
import { PageHeader } from '@/ui/page-header';
import { shadows } from '@/config/theme/shadows';

export function AutofillGuidePage() {
  const { width } = useWindowDimensions();
  const insets = useSafeAreaInsets();

  return (
    <Page>
      <PageHeader pageName={t('pages.autofill_guide.page-name')} />
      <Image
        source={MainBgImage}
        style={{
          position: 'absolute',
          width: width,
          height: scaleY(672),
          top: -scaleY(60),
          left: -scaleX(20),
        }}
      />
      <ScrollView
        className="flex-1"
        contentContainerClassName="gap-y-4"
        contentContainerStyle={{
          paddingBottom: insets.bottom + scaleY(40),
        }}
        showsVerticalScrollIndicator={false}
      >
        <View
          className="flex-row items-center rounded-2xl bg-white gap-5 px-4 py-2.5"
          style={shadows.md}
        >
          <SettingsIcon />
          <View className="gap-y-0.5">
            <UiText className="text-sm text-gray">
              {t('pages.autofill_guide.step_one_title')}
            </UiText>
            <UiText className="text-lg">
              {t('pages.autofill_guide.step_one_text')}
            </UiText>
          </View>
        </View>

        <View className="rounded-2xl bg-white px-4 py-2.5" style={shadows.md}>
          <View className="gap-y-0.5">
            <UiText className="text-sm text-gray">
              {t('pages.autofill_guide.step_two_title')}
            </UiText>
            <UiText className="text-lg">
              {t('pages.autofill_guide.step_two_text')}
            </UiText>
          </View>

          <View
            className="flex-row items-center rounded-lg bg-white gap-x-3 px-4"
            style={{ height: scaleY(44) }}
          >
            <View className="items-center justify-center rounded-lg bg-[#8E8E90] size-8">
              <KeyIcon />
            </View>
            <UiText>{t('pages.autofill_guide.passwords')}</UiText>
          </View>
        </View>

        <View className="rounded-2xl bg-white px-4 py-2.5" style={shadows.md}>
          <View className="gap-y-0.5">
            <UiText className="text-sm text-gray">
              {t('pages.autofill_guide.step_three_title')}
            </UiText>
            <UiText className="text-lg">
              {t('pages.autofill_guide.step_three_text')}
            </UiText>
          </View>

          <View
            className="flex-row items-center rounded-lg bg-white gap-x-3 px-4"
            style={{ height: scaleY(44) }}
          >
            <UiText>{t('pages.autofill_guide.passwords_options')}</UiText>
          </View>
        </View>

        <View className="rounded-2xl bg-white px-4 py-2.5" style={shadows.md}>
          <View className="gap-y-0.5">
            <UiText className="text-sm text-gray">
              {t('pages.autofill_guide.step_four_title')}
            </UiText>
            <UiText className="text-lg">
              {t('pages.autofill_guide.step_four_text')}
            </UiText>
          </View>

          <View
            className="flex-row items-center justify-between rounded-lg bg-white gap-x-3 px-4"
            style={{ height: scaleY(44) }}
          >
            <UiText>{t('pages.autofill_guide.autoFill_passwords')}</UiText>
            <Switch value pointerEvents="none" />
          </View>
        </View>

        <View className="rounded-2xl bg-white px-4 py-2.5" style={shadows.md}>
          <View className="gap-y-0.5">
            <UiText className="text-sm text-gray">
              {t('pages.autofill_guide.step_five_title')}
            </UiText>
            <UiText className="text-lg">
              {t('basic.select')} {Env.APP_NAME}
            </UiText>
          </View>

          <View
            className="flex-row items-center rounded-lg bg-white gap-x-3 px-4"
            style={{ height: scaleY(44) }}
          >
            <View>
              <Image
                source={AppIcon}
                style={{ width: scaleX(20), height: scaleX(20) }}
                contentFit="cover"
              />
            </View>
            <UiText>{Env.APP_NAME}</UiText>
            <View className="flex-1" />
            <SfSymbol name="checkmark" tintColor={colors.primary.toString()} />
          </View>
        </View>

        <View className="items-center mt-4">
          <UiButton
            className="flex-1 bg-primary"
            onPress={() => {
              router.back();
            }}
          >
            {t('basic.continue')}
          </UiButton>
        </View>
      </ScrollView>
    </Page>
  );
}
