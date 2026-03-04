import { Env } from '@kirz/expo-env';
import {
  type IAPSubscription,
  useAnalytics,
  useLocale,
  usePnlight,
  usePurchases,
} from '@kirz/expo-toolkit';
import { scaleX, scaleY } from '@kirz/nativewind-scale';
import { Image } from 'expo-image';
import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { colors } from '@/config/theme';
import { shadows } from '@/config/theme/shadows';
import { useConfig } from '@/hooks/use-config';
import { useHasPremiumWithBackdoor } from '@/hooks/use-developer-purchases';
import { usePaywall } from '@/hooks/use-paywall';
import { useWebViewModal } from '@/hooks/use-web-view-modal';
import CloudImage from '@/images/cloud-big.png';
import KeyImage from '@/images/key-big.png';
import CloseIcon from '@/svg/close.svg';
import { Page } from '@/ui/page';
import { Pressable } from '@/ui/pressable';
import { UiButton } from '@/ui/ui-button';
import { UiText } from '@/ui/ui-text';

import { FeaturesArea } from './components/features-area';

export function PaywallC() {
  const insets = useSafeAreaInsets();
  const { antibot_enabled: isAntibotEnabled } = useConfig();
  const { validatePurchase } = usePnlight();
  const hasPremium = useHasPremiumWithBackdoor();
  const { hidePaywall } = usePaywall();
  const { logEvent } = useAnalytics();
  const { subscriptions, restorePurchases, purchaseProduct } = usePurchases();

  const { openModal: openWebViewModal } = useWebViewModal();

  const [isRestoring, setIsRestoring] = useState(false);
  const [selectedSubscription, setSelectedSubscription] = useState<
    IAPSubscription | undefined
  >(undefined);

  useEffect(() => {
    if (subscriptions) {
      const res =
        subscriptions.find((x) => x.periodUnit === 'week') ||
        subscriptions.find((x) => x.trial);
      setSelectedSubscription(res ?? subscriptions[0]);
    }
  }, [subscriptions]);

  const { formatPrice, formatPeriod } = useLocale();

  const subscribeSign = useMemo(() => {
    if (selectedSubscription?.trial) {
      const trialPeriod = formatPeriod(
        selectedSubscription.trial.periodUnit,
        selectedSubscription.trial.numberOfPeriods
      );

      const subscriptionPeriod = formatPeriod(
        selectedSubscription.periodUnit,
        selectedSubscription.numberOfPeriods
      );

      return t('pages.paywall.enjoy', {
        trialPeriod: trialPeriod,
        price:
          selectedSubscription.currency === 'USD'
            ? '$' + Math.round(selectedSubscription.price * 100) / 100
            : `${formatPrice(selectedSubscription.price, selectedSubscription.currency)}`,
        subscriptionPeriod: subscriptionPeriod,
      });
    }

    if (selectedSubscription) {
      return `${formatPrice(selectedSubscription.price, selectedSubscription.currency)}/${formatPeriod(selectedSubscription.periodUnit, selectedSubscription.numberOfPeriods)}`;
    }
    return '';
  }, [formatPeriod, formatPrice, selectedSubscription]);

  const subscribeButtonLabel = useMemo(() => {
    if (selectedSubscription?.trial) {
      const trialPeriod = formatPeriod(
        selectedSubscription.trial.periodUnit,
        selectedSubscription.trial.numberOfPeriods
      );

      return `Start ${trialPeriod} Free Trial`;
    }

    if (selectedSubscription) {
      return `${formatPrice(selectedSubscription.price, selectedSubscription.currency)}/${formatPeriod(selectedSubscription.periodUnit, selectedSubscription.numberOfPeriods)}`;
    }
    return '';
  }, [formatPeriod, formatPrice, selectedSubscription]);

  const [isPurchasing, setIsPurchasing] = useState(false);

  const handleSubscribe = useCallback(async () => {
    setIsPurchasing(true);

    await logEvent(
      `af_start_purchase*${selectedSubscription?.trial}_paywall_v_a`
    );
    if (hasPremium) {
      return;
    }
    if (selectedSubscription) {
      try {
        const isValid = isAntibotEnabled ? await validatePurchase() : true;
        if (!isValid) {
          throw new Error('Purchase failed');
        }

        const purchase = await purchaseProduct(selectedSubscription.id);
        if (!purchase?.transactionId) {
          throw new Error('Purchase failed');
        }
        hidePaywall();
      } catch {
        Alert.alert('Error', 'Purchase failed');
      }
    }
    setIsPurchasing(false);
  }, [
    hasPremium,
    selectedSubscription,
    purchaseProduct,
    hidePaywall,
    logEvent,
  ]);

  function splitText(text: string) {
    const [unlimitedFirst, ...rest] = text.split(' ');

    return [unlimitedFirst, rest.join(' ')];
  }

  const [unlimitedFirst, unlimitedRest] = splitText(
    t('pages.paywall.unlimited-access')
  );

  return (
    <Page>
      <TouchableOpacity
        className="absolute"
        style={{
          top: scaleY(16),
          right: scaleX(6),
          width: scaleX(24),
          height: scaleX(24),
          zIndex: 100,
        }}
        onPress={hidePaywall}
      >
        <CloseIcon />
      </TouchableOpacity>

      <ScrollView
        contentContainerStyle={{
          paddingBottom: insets.bottom + scaleY(18),
        }}
        showsVerticalScrollIndicator={false}
      >
        <View className="justify-between gap-y-6 mt-8 h-full">
          <View className="gap-y-6">
            <View className="px-5">
              <UiText>
                <UiText className="text-center text-3xl font-bold text-primary">
                  {unlimitedFirst}{' '}
                </UiText>
                <UiText className="text-center text-3xl font-bold">
                  {unlimitedRest}
                </UiText>
              </UiText>
            </View>

            <View className="flex-row justify-center gap-x-4">
              <View
                className="items-center rounded-3xl bg-white gap-y-2 p-4 size-36"
                style={shadows.md}
              >
                <View className="items-center justify-center rounded-xl bg-primary/30 size-18">
                  <Image
                    source={KeyImage}
                    style={{ width: scaleX(36), height: scaleX(36) }}
                  />
                </View>
                <UiText className="text-center text-sm font-semibold">
                  {t('pages.paywall.password-manager')}
                </UiText>
              </View>
              <View
                className="items-center rounded-3xl bg-white gap-y-2 p-4 size-36"
                style={shadows.md}
              >
                <View className="items-center justify-center rounded-xl bg-blue/30 size-18">
                  <Image
                    source={CloudImage}
                    style={{ width: scaleX(45), height: scaleY(31) }}
                  />
                </View>
                <View className="flex-1 justify-center">
                  <UiText className="text-center text-sm font-semibold">
                    {t('pages.paywall.safe-storage')}
                  </UiText>
                </View>
              </View>
            </View>

            <View className="items-center">
              <UiText className="rounded-2xl bg-primary/30 font-bold text-primary px-5 py-2">
                {t('pages.paywall.users-trust-us')}
              </UiText>
            </View>

            <FeaturesArea />
          </View>

          <View>
            <View
              className={
                selectedSubscription?.trial
                  ? ''
                  : 'flex-row justify-center gap-x-1'
              }
            >
              <UiText className="text-center text-xs text-gray">
                {t('pages.paywall.no_upfront_payment')}
              </UiText>
              <UiText className="text-center text-xs text-gray">
                {subscribeSign}
              </UiText>
            </View>
            <UiText className="text-center text-xs text-gray my-3">
              {t('pages.paywall.cancel_anytime')}
            </UiText>
            <View className="items-center justify-center mb-5 mt-2.5">
              {isPurchasing ? (
                <ActivityIndicator
                  size="large"
                  color={colors.primary.toString()}
                />
              ) : (
                <UiButton disabled={isRestoring} onPress={handleSubscribe}>
                  <UiText className="font-semibold text-white">
                    {selectedSubscription?.trial
                      ? subscribeButtonLabel
                      : 'Continue'}
                  </UiText>
                </UiButton>
              )}
            </View>
            <View className="flex-row justify-between">
              <Pressable onPress={() => openWebViewModal(Env.TERMS_OF_USE)}>
                <UiText className="text-xs text-gray underline">
                  Terms of Use
                </UiText>
              </Pressable>
              <Pressable
                disabled={isPurchasing || isRestoring}
                onPress={async () => {
                  setIsRestoring(true);
                  const isRestored = await restorePurchases();
                  Alert.alert(
                    'Restore Purchases',
                    isRestored ? 'Purchases restored' : 'No purchases found'
                  );
                  setIsRestoring(false);
                }}
              >
                {isPurchasing || isRestoring ? (
                  <View className="items-center justify-center w-24">
                    <ActivityIndicator />
                  </View>
                ) : (
                  <UiText className="text-xs text-gray underline">
                    Restore purchase
                  </UiText>
                )}
              </Pressable>
              <Pressable onPress={() => openWebViewModal(Env.PRIVACY_POLICY)}>
                <UiText className="text-xs text-gray underline">
                  Privacy Policy
                </UiText>
              </Pressable>
            </View>
          </View>
        </View>
      </ScrollView>
    </Page>
  );
}
