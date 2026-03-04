import { router, useFocusEffect } from 'expo-router';
import { usePinSettings } from 'expo-with-pincode';
import { useCallback, useState } from 'react';
import { View } from 'react-native';

import { DeveloperPurchasesProvider } from '@/hooks/use-developer-purchases';
import { Page } from '@/ui/page';
import { PageFooter } from '@/ui/page-footer';

import HomeTab from './tabs/home';
import LeaksTab from './tabs/leaks';
import PasswordsTab from './tabs/passwords';
import StorageTab from './tabs/storage';

export default function MainPage() {
  const { isPincodeSet } = usePinSettings();

  useFocusEffect(
    useCallback(() => {
      if (!isPincodeSet) {
        router.navigate('/set-pin');
      }
    }, [isPincodeSet])
  );

  const [currentTab, setCurrentTab] = useState<
    'home' | 'passwords' | 'storage' | 'leaks'
  >('home');

  function goToPasswordTab() {
    setCurrentTab('passwords');
  }

  return (
    <DeveloperPurchasesProvider>
      <Page>
        {currentTab === 'home' && <HomeTab goToPasswordTab={goToPasswordTab} />}
        {currentTab === 'passwords' && <PasswordsTab />}
        {currentTab === 'storage' && <StorageTab />}
        {currentTab === 'leaks' && <LeaksTab />}

        <View className="gap-y-2.5">
          <PageFooter pageName={currentTab} setCurrentTab={setCurrentTab} />
        </View>
      </Page>
    </DeveloperPurchasesProvider>
  );
}
