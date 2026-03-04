import { router } from 'expo-router';
import { View } from 'react-native';

import { useSecretPasswords } from '@/hooks/use-secret-passwords';
import KeyIcon from '@/svg/key-alt-small.svg';
import LockIcon from '@/svg/lock-alt-small.svg';

import PasswordLinksItem from './password-links-item';

type Props = {
  goToPasswordTab: () => void;
};

export default function PasswordLinksArea({ goToPasswordTab }: Props) {
  const { passwords } = useSecretPasswords();

  return (
    <View className="gap-y-3">
      <PasswordLinksItem
        Icon={LockIcon}
        title={t('basic.passwords')}
        subtitle={t('pages.home-tab.passwords-stored', {
          count: passwords?.length || 0,
        })}
        handler={goToPasswordTab}
      />
      <PasswordLinksItem
        Icon={KeyIcon}
        title={t('pages.home-tab.generate-password')}
        subtitle={t('pages.home-tab.create-password')}
        handler={() => router.navigate('/generate-password')}
      />
    </View>
  );
}
