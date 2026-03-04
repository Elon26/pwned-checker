import { usePurchases } from '@kirz/expo-toolkit';
import { router } from 'expo-router';
import { shareAsync } from 'expo-sharing';
import { useRef, useState } from 'react';
import { Pressable, View } from 'react-native';
import ReanimatedSwipeable, {
  SwipeableMethods,
} from 'react-native-gesture-handler/ReanimatedSwipeable';

import { useConfig } from '@/hooks/use-config';
import { usePaywall } from '@/hooks/use-paywall';
import DocIcon from '@/svg/doc.svg';
import DocumentItem from '@/types/document-item';
import { UiText } from '@/ui/ui-text';

type Props = {
  doc: DocumentItem;
  handleRemoveDocument: (id: string) => void;
};

export default function DocumentCard({ doc, handleRemoveDocument }: Props) {
  const { showPaywall } = usePaywall();
  const { hasPremium } = usePurchases();
  const { safe_storage_free_add_mode } = useConfig();
  const isBehindThePaywall = !hasPremium && safe_storage_free_add_mode;
  const [isSwiping, setIsSwiping] = useState(false);
  const swipeableRef = useRef<SwipeableMethods | null>(null);

  const renderLeft = () => (
    <View className="justify-center bg-primary h-full w-20">
      <UiText className="text-center text-white">{t('basic.share')}</UiText>
    </View>
  );

  const renderRight = () => (
    <View className="justify-center bg-red h-full w-20">
      <UiText className="text-center text-white">{t('basic.delete')}</UiText>
    </View>
  );

  const handlePress = () => {
    if (isSwiping) {
      return;
    }

    if (isBehindThePaywall) {
      showPaywall();
    } else {
      router.navigate({
        pathname: '/document',
        params: { id: doc.id },
      });
    }
  };

  return (
    <ReanimatedSwipeable
      ref={swipeableRef}
      renderLeftActions={renderLeft}
      renderRightActions={renderRight}
      onSwipeableWillOpen={() => setIsSwiping(true)}
      onSwipeableClose={() => setIsSwiping(false)}
      onSwipeableOpen={(direction) => {
        if (direction === 'left') {
          handleRemoveDocument(doc.id);
          swipeableRef.current?.close();
        }

        if (direction === 'right') {
          if (isBehindThePaywall) {
            showPaywall();
          } else {
            shareAsync(doc.path as string);
          }
          swipeableRef.current?.close();
        }
      }}
    >
      <Pressable
        className="flex-row items-center border-b border-gray bg-white gap-x-2 p-4"
        onPress={handlePress}
      >
        <DocIcon />
        <UiText className="flex-1" numberOfLines={1}>
          {doc.name}
        </UiText>
      </Pressable>
    </ReanimatedSwipeable>
  );
}
