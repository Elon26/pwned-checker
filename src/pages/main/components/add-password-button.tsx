import { usePurchases } from '@kirz/expo-toolkit';
import { router } from 'expo-router';
import { View } from 'react-native';

import { colors } from '@/config/theme';
import { usePaywall } from '@/hooks/use-paywall';
import { useSecretPasswords } from '@/hooks/use-secret-passwords';
import { Pressable } from '@/ui/pressable';
import { SfSymbol } from '@/ui/sf-symbol';

export default function AddPasswordButton() {
  const { hasPremium } = usePurchases();
  const { showPaywall } = usePaywall();
  const { passwords } = useSecretPasswords();

  function handleAdd() {
    if (hasPremium || !passwords || passwords?.length < 5) {
      router.navigate('/add-password');
    } else {
      showPaywall();
    }
  }

  return (
    <View className="flex-row items-center justify-center">
      <Pressable
        className="items-center justify-center rounded-full bg-primary size-16"
        onPress={handleAdd}
      >
        <SfSymbol
          className="size-8"
          name="plus"
          weight="semibold"
          tintColor={colors.white.toString()}
        />
      </Pressable>
    </View>
  );
}
