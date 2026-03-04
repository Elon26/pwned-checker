import { usePurchases } from '@kirz/expo-toolkit';
import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { Pressable, TextInput, View } from 'react-native';
import { twMerge } from 'tailwind-merge';

import { useConfig } from '@/hooks/use-config';
import { usePaywall } from '@/hooks/use-paywall';
import {
  useSetStorage,
  useStorage,
  useStorageValue,
} from '@/hooks/use-storage';
import MagnifierIcon from '@/svg/magnifier.svg';
import HistoryItem from '@/types/history-item';
import { UiButton } from '@/ui/ui-button';
import { UiText } from '@/ui/ui-text';
import { uuid } from '@/utils/uuid';

import checkEmail from '../api/check-email';
import checkPassword from '../api/check-password';
import getFakeDescription from '../utils/get-fake-description';

type Props = {
  isMailMode: boolean;
  setData: (data: HistoryItem[]) => void;
};

const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;

export default function CheckArea({ isMailMode, setData }: Props) {
  const { hasPremium } = usePurchases();
  const { showPaywall } = usePaywall();
  const [freeLeakCheckAvailable, setFreeLeakCheckAvailable] = useStorage(
    'freeLeakCheckAvailable'
  );
  const { fake_check_active } = useConfig();
  const [fakeCheckPassed, setFakeCheckPassed] = useStorage('fakeCheckPassed');

  const inputRef = useRef<TextInput | null>(null);
  const [value, setValue] = useState('');
  const [isCheckFinished, setIsCheckFinished] = useState(true);
  const [isCheckPassed, setIsCheckPassed] = useState(false);
  const [error, setError] = useState('');
  const [dataBreachesQuantity, setDataBreachesQuantity] = useState(0);
  const setLastCheckTimestamp = useSetStorage('lastCheckTimestamp');
  const setCheckQuantity = useSetStorage('checkQuantity');
  const emailCheckHistory = useStorageValue('emailCheckHistory');
  const passwordCheckHistory = useStorageValue('passwordCheckHistory');

  useEffect(() => {
    setIsCheckPassed(false);
    setValue('');
    setError('');
  }, [isMailMode]);

  useEffect(() => {
    setError('');
  }, [value]);

  async function handleCheck() {
    setIsCheckPassed(false);

    if (!value.trim()) {
      setError(
        t(
          isMailMode
            ? 'pages.leak-check.enter-email'
            : 'pages.leak-check.enter-password'
        )
      );
      return;
    }

    if (isMailMode && reg.test(value.trim()) === false) {
      setError(t('pages.leak-check.enter-email-valid'));
      return;
    }

    if (!hasPremium) {
      if (freeLeakCheckAvailable) {
        setFreeLeakCheckAvailable(false);
      } else {
        showPaywall();
        return;
      }
    }

    setIsCheckFinished(false);

    const newArr = isMailMode
      ? [...emailCheckHistory]
      : [...passwordCheckHistory];

    const existedObj = newArr.find((item) => item.name === value);

    if (existedObj) {
      setDataBreachesQuantity(existedObj.leakQuantity);
    } else {
      const newItem = {
        id: uuid(),
        name: value,
        isPwned: false,
        leakQuantity: 0,
        description: '',
      };

      if (isMailMode) {
        try {
          const { leakQuantity, description } = await checkEmail(value);
          setDataBreachesQuantity(leakQuantity);
          if (leakQuantity) {
            newItem.isPwned = true;
            newItem.leakQuantity = leakQuantity;
            newItem.description = description;
          }
        } catch (error) {
          if (axios.isAxiosError(error)) {
            if (error.response?.status === 404) {
              setDataBreachesQuantity(0);
            } else {
              if (error.response?.status === 400) {
                console.log('error', error);
                setError(t('pages.leak-check.enter-email-valid'));
                setIsCheckFinished(true);
                return;
              }
              console.log('error', error);
              setError(t('pages.main.something-wrong'));
              setIsCheckFinished(true);
              return;
            }
          }
        }
      } else {
        try {
          const leakQuantity = await checkPassword(value);
          setDataBreachesQuantity(leakQuantity);
          if (leakQuantity) {
            newItem.isPwned = true;
            newItem.leakQuantity = leakQuantity;
          }
        } catch (error) {
          console.log('error', error);
          setIsCheckFinished(true);
          return;
        }
      }

      if (fake_check_active && !fakeCheckPassed) {
        if (dataBreachesQuantity === 0) {
          const randomNumber = Math.round(Math.random() * 10);
          setDataBreachesQuantity(randomNumber);
          newItem.leakQuantity = randomNumber;
          newItem.isPwned = true;
          newItem.description = getFakeDescription();
        }
        setFakeCheckPassed(true);
      }

      newArr.push(newItem);
      setData(newArr);
    }

    setLastCheckTimestamp(Date.now());
    setCheckQuantity((prev) => ++prev);
    setValue('');
    setIsCheckFinished(true);
    setIsCheckPassed(true);
  }

  return (
    <View className="gap-y-4">
      <Pressable
        className="flex-row items-center rounded-3xl bg-black/10 pl-5"
        onPress={() => inputRef.current?.focus()}
      >
        <MagnifierIcon />
        <TextInput
          className="flex-1 text-base ml-2"
          ref={inputRef}
          value={value}
          onChangeText={setValue}
          autoFocus
          autoCapitalize="none"
          placeholder={t(
            isMailMode
              ? 'pages.leak-check.email-address'
              : 'pages.leak-check.password'
          )}
        />
        <UiButton
          className="w-24"
          onPress={handleCheck}
          loading={!isCheckFinished}
        >
          {t('basic.check')}
        </UiButton>
      </Pressable>
      {error && (
        <UiText className="text-center font-bold text-red">{error}</UiText>
      )}
      {isCheckPassed ? (
        <View className="gap-y-4.5">
          <View
            className={twMerge(
              'items-center rounded-3xl border-2 p-2',
              dataBreachesQuantity
                ? 'border-red'
                : 'border-primary bg-primary/20'
            )}
          >
            <UiText
              className={twMerge(
                'text-3xl font-semibold',
                dataBreachesQuantity ? 'color-red' : 'color-primary'
              )}
            >
              {dataBreachesQuantity}
            </UiText>
            <UiText
              className={twMerge(
                'dfg-primary text-lg font-semibold',
                dataBreachesQuantity ? 'color-red' : 'color-primary'
              )}
            >
              {t('pages.leak-check.data-breaches', {
                count: dataBreachesQuantity,
              })}
            </UiText>
            <UiText className="text-center text-sm mx-8 mt-2">
              {t(
                dataBreachesQuantity
                  ? isMailMode
                    ? 'pages.leak-check.bad-news-email'
                    : 'pages.leak-check.bad-news-password'
                  : isMailMode
                    ? 'pages.leak-check.good-news-email'
                    : 'pages.leak-check.good-news-password'
              )}
            </UiText>
          </View>
          <UiText className="text-center text-gray">
            {t('pages.leak-check.update-databases')}
          </UiText>
        </View>
      ) : (
        <UiText className="text-center text-gray">
          {t('pages.leak-check.data-stored')}
        </UiText>
      )}
    </View>
  );
}
