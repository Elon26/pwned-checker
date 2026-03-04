import { scaleY } from '@kirz/nativewind-scale';
import { useState } from 'react';
import { ScrollView, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useStorage } from '@/hooks/use-storage';
import HistoryItem from '@/types/history-item';
import { Page } from '@/ui/page';
import { PageHeader } from '@/ui/page-header';

import CheckArea from './components/check-area';
import HistoryArea from './components/history-area';
import { ModeSelector } from './components/mode-selector';

export function LeakCheckPage() {
  const insets = useSafeAreaInsets();
  const [isMailMode, setIsMailMode] = useState(true);
  const [emailCheckHistory, setEmailCheckHistory] =
    useStorage('emailCheckHistory');
  const [passwordCheckHistory, setPasswordCheckHistory] = useStorage(
    'passwordCheckHistory'
  );

  function handleSetData(data: HistoryItem[]) {
    if (isMailMode) {
      setEmailCheckHistory(data);
    } else {
      setPasswordCheckHistory(data);
    }
  }

  return (
    <Page>
      <PageHeader pageName={t('pages.leak-check.page-name')} />
      <ScrollView
        className="-mt-5 pt-5"
        showsVerticalScrollIndicator={false}
        style={{ marginBottom: 0 }}
        contentContainerStyle={{ paddingBottom: insets.bottom + scaleY(16) }}
      >
        <View className="gap-y-4">
          <ModeSelector isMailMode={isMailMode} setIsMailMode={setIsMailMode} />
          <CheckArea isMailMode={isMailMode} setData={handleSetData} />
          <HistoryArea
            isMailMode={isMailMode}
            dataArr={isMailMode ? emailCheckHistory : passwordCheckHistory}
            setData={handleSetData}
          />
        </View>
      </ScrollView>
    </Page>
  );
}
