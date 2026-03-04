import { scaleX } from '@kirz/nativewind-scale';
import { router } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import {
  Alert,
  NativeSyntheticEvent,
  Pressable,
  Switch,
  TextInput,
  TextInputChangeEventData,
  View,
} from 'react-native';

import { shadows } from '@/config/theme/shadows';
import {
  deletePassword,
  useSecretPasswords,
} from '@/hooks/use-secret-passwords';
import { Password } from '@/hooks/use-secret-passwords/types';
import MagnifierIcon from '@/svg/magnifier.svg';
import { Pressable as UiPressable } from '@/ui/pressable';
import { SfSymbol } from '@/ui/sf-symbol';
import { UiText } from '@/ui/ui-text';

import AccountCard from './account-card';

export default function SavedAccountsArea() {
  const { passwords, autofillEnabled } = useSecretPasswords();
  const refInput = useRef<null | TextInput>(null);
  const [searchValue, setSearchValue] = useState('');
  const [filteredPasswords, setFilteredPasswords] = useState(passwords);

  function handleChangeSearchValue(
    e: NativeSyntheticEvent<TextInputChangeEventData>
  ) {
    const updatedFilteredAccounts = passwords?.filter(
      (password) =>
        password.link
          .toLowerCase()
          .includes(e.nativeEvent.text.toLowerCase()) ||
        password.login.toLowerCase().includes(e.nativeEvent.text.toLowerCase())
    );
    setFilteredPasswords(updatedFilteredAccounts);
  }

  function deleteAllPasswords() {
    Alert.alert(t('basic.are-you-sure'), t('basic.this-action-is-permanent'), [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Delete',
        onPress: () =>
          passwords?.forEach((password) => {
            deletePassword(password);
          }),
        style: 'destructive',
      },
    ]);
  }

  function deleteOnePassword(password: Password) {
    Alert.alert(t('basic.are-you-sure'), t('basic.this-action-is-permanent'), [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Delete',
        onPress: () => deletePassword(password),
        style: 'destructive',
      },
    ]);
  }

  useEffect(() => {
    setFilteredPasswords(passwords);
  }, [passwords]);

  return (
    <View className="gap-y-4">
      <Pressable
        className="rounded-3xl bg-white gap-y-3 p-4"
        style={shadows.md}
        onPress={() => router.navigate('/autofill-guide')}
      >
        <View className="flex-row items-center justify-between mr-2">
          <UiText className="text-red">{t('pages.main.autofill-off')}</UiText>
          <Switch
            value={autofillEnabled}
            onChange={() => router.navigate('/autofill-guide')}
          />
        </View>
        <View className="flex-row items-center justify-between">
          <UiText>{t('pages.main.how-to-use-it')}</UiText>
          <SfSymbol name="chevron.right" size={scaleX(12)} tintColor="black" />
        </View>
      </Pressable>

      <View className="rounded-3xl bg-white gap-y-5 p-4" style={shadows.md}>
        <View className="flex-row items-center justify-between gap-x-2 w-full">
          <Pressable
            className="flex-1 flex-row items-center rounded-3xl bg-black/10 gap-x-2 px-5 h-10"
            onPress={() => refInput.current?.focus()}
          >
            <MagnifierIcon />
            <TextInput
              ref={refInput}
              placeholder={t('basic.search')}
              value={searchValue}
              onChangeText={setSearchValue}
              onChange={handleChangeSearchValue}
            />
          </Pressable>
          <UiPressable onPress={deleteAllPasswords}>
            <UiText className="text-red">{t('basic.delete-all')}</UiText>
          </UiPressable>
        </View>
        <View className="gap-y-4">
          {filteredPasswords && filteredPasswords.length > 0 ? (
            filteredPasswords.map((password) => (
              <AccountCard
                key={password.id}
                passwordItem={password}
                deleteOnePassword={deleteOnePassword}
              />
            ))
          ) : (
            <UiText className="text-center font-bold">
              {t('pages.main.nothing-found')}
            </UiText>
          )}
        </View>
      </View>
    </View>
  );
}
