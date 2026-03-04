import { router } from 'expo-router';
import { useState } from 'react';
import { View } from 'react-native';
import { twMerge } from 'tailwind-merge';

import UiInput from '@/components/ui-input';
import {
  updatePassword,
  useSecretPasswords,
} from '@/hooks/use-secret-passwords';
import { Page } from '@/ui/page';
import { PageHeader } from '@/ui/page-header';
import { UiButton } from '@/ui/ui-button';

type Props = {
  id: string;
};

export default function ChangePasswordPage({ id }: Props) {
  const { passwords } = useSecretPasswords();
  const currentAccount = passwords?.find((item) => item.id === id);

  const [password, setPassword] = useState(currentAccount?.password || '');
  const [link, setLink] = useState(currentAccount?.link || '');
  const [account, setAccount] = useState(currentAccount?.login || '');

  function changeAccount() {
    updatePassword({
      id,
      link,
      login: account,
      password,
    });

    router.navigate('/main');
  }

  return (
    <Page>
      <PageHeader pageName={t('pages.change-password.page-name')} />

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
        <UiButton
          disabled={!password || !link || !account}
          className={twMerge(
            'h-13',
            (!password || !link || !account) && 'bg-gray'
          )}
          onPress={changeAccount}
        >
          {t('basic.save')}
        </UiButton>
      </View>
    </Page>
  );
}
