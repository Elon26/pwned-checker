import { usePurchases } from '@kirz/expo-toolkit';
import { useEffect, useState } from 'react';
import { View } from 'react-native';
import { twMerge } from 'tailwind-merge';

import { usePaywall } from '@/hooks/use-paywall';
import { useSetStorage } from '@/hooks/use-storage';
import HistoryItem from '@/types/history-item';
import { Pressable } from '@/ui/pressable';
import { UiButton } from '@/ui/ui-button';
import { UiText } from '@/ui/ui-text';

import checkEmail from '../api/check-email';
import checkPassword from '../api/check-password';
import HistoryCard from './history-card';

type Props = {
  isMailMode: boolean;
  dataArr: HistoryItem[];
  setData: (data: HistoryItem[]) => void;
};

export default function HistoryArea({ isMailMode, dataArr, setData }: Props) {
  const { hasPremium } = usePurchases();
  const { showPaywall } = usePaywall();
  const setEmailCheckHistory = useSetStorage('emailCheckHistory');
  const setPasswordCheckHistory = useSetStorage('passwordCheckHistory');
  const [isRechecking, setIsRechecking] = useState(false);
  const [isRecheckFinished, setIsRecheckFinished] = useState(false);
  const [pwnedQuantity, setPwnedQuantity] = useState(0);

  async function handleRecheck() {
    if (!hasPremium) {
      showPaywall();
      return;
    }

    setIsRecheckFinished(false);
    setIsRechecking(true);
    const recheckArr = dataArr.filter((item) => !item.isPwned);
    let updatedPwnedQuantity = dataArr.length - recheckArr.length;

    if (recheckArr.length === 0) {
      setPwnedQuantity(updatedPwnedQuantity);
      setIsRechecking(false);
      setIsRecheckFinished(true);
      return;
    }

    await recheckArr.forEach(async (recheckItem) => {
      if (isMailMode) {
        const { leakQuantity, description } = await checkEmail(
          recheckItem.name
        );
        if (leakQuantity) {
          updatedPwnedQuantity++;
          setEmailCheckHistory((prev) => {
            const newArr = prev.map((historyItem) => {
              if (historyItem.id === recheckItem.id) {
                historyItem.isPwned = true;
                historyItem.leakQuantity = leakQuantity;
                historyItem.description = description;
              }
              return historyItem;
            });
            return newArr;
          });
        }
      } else {
        const leakQuantity = await checkPassword(recheckItem.name);
        if (leakQuantity) {
          updatedPwnedQuantity++;
          setPasswordCheckHistory((prev) => {
            const newArr = prev.map((historyItem) => {
              if (historyItem.id === recheckItem.id) {
                historyItem.isPwned = true;
                historyItem.leakQuantity = leakQuantity;
              }
              return historyItem;
            });
            return newArr;
          });
        }
      }
    });

    setPwnedQuantity(updatedPwnedQuantity);
    setIsRechecking(false);
    setIsRecheckFinished(true);
  }

  useEffect(() => {
    setIsRecheckFinished(false);
  }, [isMailMode]);

  return (
    <View>
      {dataArr.length > 0 && (
        <View className="gap-y-4">
          <View className="flex-row items-center justify-between">
            <UiText className="text-2xl font-bold">
              {t('pages.leak-check.history')}
            </UiText>
            <Pressable onPress={() => setData([])}>
              <UiText className="text-red">{t('basic.delete-all')}</UiText>
            </Pressable>
          </View>
          <View>
            {dataArr.map((historyItem) => (
              <HistoryCard
                key={historyItem.id}
                historyItem={historyItem}
                isMailMode={isMailMode}
              />
            ))}
          </View>
          {isRecheckFinished && (
            <UiText
              className={twMerge(
                'text-center font-bold',
                pwnedQuantity ? 'text-red' : 'text-primary'
              )}
            >
              {isMailMode
                ? t('pages.leak-check.recheck-email', { count: pwnedQuantity })
                : t('pages.leak-check.recheck-password', {
                    count: pwnedQuantity,
                  })}
            </UiText>
          )}
          <UiButton loading={isRechecking} onPress={handleRecheck}>
            {t('pages.main.recheck-all')}
          </UiButton>
        </View>
      )}
    </View>
  );
}
