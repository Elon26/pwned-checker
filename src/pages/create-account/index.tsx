import { router } from 'expo-router';
import { useState } from 'react';
import { useWindowDimensions, View } from 'react-native';
import { twMerge } from 'tailwind-merge';

import UiInput from '@/components/ui-input';
import { addPassword } from '@/hooks/use-secret-passwords';
import { Page } from '@/ui/page';
import { PageHeader } from '@/ui/page-header';
import { UiButton } from '@/ui/ui-button';
import { UiText } from '@/ui/ui-text';

type Props = {
  password: string;
};

export default function CreateAccountPage({ password }: Props) {
  const { width } = useWindowDimensions();
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

      <View className="gap-y-5">
        <View
          className="justify-center bg-black/10 -ml-5 h-20"
          style={{ width }}
        >
          <UiText className="text-center text-gray">{password}</UiText>
          <UiText className="text-center text-gray">
            {t('pages.create-account.password')}
          </UiText>
        </View>
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
        <View className="items-center">
          <UiButton
            disabled={!link || !account}
            className={twMerge('h-13', (!link || !account) && 'bg-gray')}
            onPress={createAccount}
          >
            {t('pages.create-account.page-name')}
          </UiButton>
        </View>
      </View>
    </Page>
  );
}
