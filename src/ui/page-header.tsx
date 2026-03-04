import { scaleX } from '@kirz/nativewind-scale';
import { router } from 'expo-router';
import { ReactNode } from 'react';
import { View } from 'react-native';

import { colors } from '@/config/theme';
import SettingsIcon from '@/svg/settings-other.svg';

import { Pressable } from './pressable';
import { SfSymbol } from './sf-symbol';
import { UiText } from './ui-text';

type Props = {
  pageName: string;
  homePage?: boolean;
  children?: ReactNode;
};

export function PageHeader({ pageName, homePage, children }: Props) {
  return (
    <View className="flex-row items-center justify-between gap-x-4 mb-3 py-3">
      {!homePage && (
        <Pressable className="z-10" onPress={() => router.back()}>
          <View className="items-center justify-center size-6">
            <SfSymbol
              name="chevron.left"
              size={scaleX(18)}
              tintColor={colors.gray.toString()}
            />
          </View>
        </Pressable>
      )}
      <UiText numberOfLines={1} className="flex-1 text-2xl font-bold">
        {pageName}
      </UiText>
      <View className="z-10 items-center justify-center size-6">
        {homePage ? (
          <Pressable onPress={() => router.navigate('/settings')}>
            <SettingsIcon />
          </Pressable>
        ) : children ? (
          children
        ) : (
          <></>
        )}
      </View>
    </View>
  );
}
