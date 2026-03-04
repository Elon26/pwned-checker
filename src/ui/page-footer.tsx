import { Dispatch, SetStateAction } from 'react';
import { View } from 'react-native';
import { twMerge } from 'tailwind-merge';

import FolderIcon from '@/svg/folder-alt.svg';
import HomeIcon from '@/svg/home.svg';
import LockIcon from '@/svg/lock-alt.svg';
import ShieldIcon from '@/svg/shield-alt.svg';

import { Pressable } from './pressable';
import { UiText } from './ui-text';

type Props = {
  pageName: 'home' | 'passwords' | 'storage' | 'leaks';
  setCurrentTab: Dispatch<
    SetStateAction<'home' | 'passwords' | 'storage' | 'leaks'>
  >;
};

export function PageFooter({ pageName, setCurrentTab }: Props) {
  return (
    <View className="border-t border-gray bg-white -mx-5">
      <View className="flex-row items-center justify-between rounded-xl pt-2.5">
        <Pressable
          className={twMerge(
            'w-[25%] items-center justify-center rounded-3xl gap-y-1 p-2'
          )}
          onPress={() => setCurrentTab('home')}
        >
          <HomeIcon stroke={pageName === 'home' ? '#00C950' : '#99A1AF'} />
          <UiText
            className={twMerge(
              'text-sm font-medium',
              pageName === 'home' ? 'text-primary' : ''
            )}
          >
            {t('basic.home')}
          </UiText>
        </Pressable>
        <Pressable
          className={twMerge(
            'w-[25%] items-center justify-center rounded-3xl gap-y-1 p-2'
          )}
          onPress={() => setCurrentTab('passwords')}
        >
          <LockIcon stroke={pageName === 'passwords' ? '#00C950' : '#99A1AF'} />
          <UiText
            className={twMerge(
              'text-sm font-medium',
              pageName === 'passwords' ? 'text-primary' : ''
            )}
          >
            {t('basic.passwords')}
          </UiText>
        </Pressable>
        <Pressable
          className={twMerge(
            'w-[25%] items-center justify-center rounded-3xl gap-y-1 p-2'
          )}
          onPress={() => setCurrentTab('storage')}
        >
          <FolderIcon stroke={pageName === 'storage' ? '#00C950' : '#99A1AF'} />
          <UiText
            className={twMerge(
              'text-sm font-medium',
              pageName === 'storage' ? 'text-primary' : ''
            )}
          >
            {t('basic.storage')}
          </UiText>
        </Pressable>
        <Pressable
          className={twMerge(
            'w-[25%] items-center justify-center rounded-3xl gap-y-1 p-2'
          )}
          onPress={() => setCurrentTab('leaks')}
        >
          <ShieldIcon stroke={pageName === 'leaks' ? '#00C950' : '#99A1AF'} />
          <UiText
            className={twMerge(
              'text-sm font-medium',
              pageName === 'leaks' ? 'text-primary' : ''
            )}
          >
            {t('basic.leaks')}
          </UiText>
        </Pressable>
      </View>
    </View>
  );
}
