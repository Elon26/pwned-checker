import { router } from 'expo-router';
import { useState } from 'react';
import { View } from 'react-native';
import { twMerge } from 'tailwind-merge';

import UiInput from '@/components/ui-input';
import { addPassword } from '@/hooks/use-secret-passwords';
import { Page } from '@/ui/page';
import { PageHeader } from '@/ui/page-header';
import { UiButton } from '@/ui/ui-button';

export default function AddExistingPasswordPage() {
  const [password, setPassword] = useState('');
  const [link, setLink] = useState('');
  const [account, setAccount] = useState('');

  function createAccount() {
    addPassword({
      link,
      login: account,
      password,
    });

    router.navigate('/main');
  }

  return (
    <Page>
      <PageHeader pageName={t('pages.add-password.add-existing-password')} />

      <View className="gap-y-5 mt-2">
        <UiInput
          name={t('pages.create-account.link')}
          value={link}
          setValue={setLink}
        />
        <UiInput
          name={t('pages.create-account.account')}
          value={account}
          setValue={setAccount}
        />
        <UiInput
          name={t('pages.create-account.password')}
          value={password}
          setValue={setPassword}
          isPassword
        />
        <View className="items-center">
          <UiButton
            disabled={!password || !link || !account}
            className={twMerge(
              'h-13',
              (!password || !link || !account) && 'bg-gray'
            )}
            onPress={createAccount}
          >
            {t('basic.save')}
          </UiButton>
        </View>
      </View>
    </Page>
  );
}
