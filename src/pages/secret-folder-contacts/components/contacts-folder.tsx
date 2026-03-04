// eslint-disable-next-line simple-import-sort/imports
import { useAnalytics, usePurchases } from '@kirz/expo-toolkit';
import { scaleY } from '@kirz/nativewind-scale';
import { Suspense, useEffect, useState } from 'react';
import {
  Alert,
  InteractionManager,
  TouchableOpacity,
  View,
} from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { groupBy } from 'remeda';

import { EmptyList } from '@/components/empty-list';
import { Loader } from '@/components/scan-loader';
import { useConfig } from '@/hooks/use-config';
import { useModals } from '@/hooks/use-modals';
import { useSelectedContacts } from '@/hooks/use-secret-contacts/use-selected-contacts';
import {
  createOrImportPrivateContact,
  deletePrivateContacts,
  usePrivateCnContacts,
  usePrivateContactIds,
} from '@/modules/contacts-kit/react';
import { UiButton } from '@/ui/ui-button';
import { UiText } from '@/ui/ui-text';
import { isNotNullOrUndefined } from '@/utils/array';
import { Deferred } from '@/utils/deferred';

import GroupContactsListView from './group-contacts-list-view';
import Vail from '@/ui/vail';

export default function ContactsFolder() {
  const { hasPremium } = usePurchases();
  const { safe_storage_free_add_mode } = useConfig();
  const insets = useSafeAreaInsets();
  const [loading, setLoading] = useState(true);
  const { logEvent } = useAnalytics();
  const { ids, refetch, status } = usePrivateContactIds();
  const contacts = usePrivateCnContacts();

  const [zipped, setZipped] = useState<[string, string[]][]>([]);

  useEffect(() => {
    InteractionManager.runAfterInteractions(() => {
      const groupedByAlphabet = groupBy(ids, (id) => {
        const { familyName, givenName } = contacts[id] ?? {};
        return (familyName ?? givenName ?? '#').charAt(0).toUpperCase();
      });

      const z = Object.entries(groupedByAlphabet).sort(([a], [b]) =>
        a.localeCompare(b)
      );
      setZipped(z);
      setLoading(false);
    });
  }, [contacts, ids]);

  const {
    selectedContacts,
    handleContactSelect,
    isContactSelected,
    setSelectedContacts,
  } = useSelectedContacts(ids);

  const { openModal } = useModals();

  const handleAddContact = async () => {
    setLoading(true);
    try {
      const contacts = await createOrImportPrivateContact();
      const filtered = contacts.filter(isNotNullOrUndefined);
      if (filtered.length > 0) {
        openModal('AddedFilesModal', { count: filtered.length });
      }
    } finally {
      setLoading(false);
    }
    logEvent('tap_add_to_secret_folder');
  };

  const handleDeleteContacts = async () => {
    setLoading(true);
    try {
      await deletePrivateContacts(Array.from(selectedContacts), async () => {
        const d = new Deferred<boolean>();
        Alert.alert(
          'Are you sure you want to delete?',
          'This action is permanent. Deleted files can’t be restored.',
          [
            {
              text: 'Cancel',
              onPress: () => d.reject(),
              style: 'cancel',
            },
            {
              text: 'Delete',
              onPress: () => d.resolve(false),
              style: 'destructive',
            },
          ]
        );
        return await d.promise;
      });
      setSelectedContacts(new Set<string>());
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    return () => {
      setSelectedContacts(new Set<string>());
    };
  }, [setSelectedContacts]);

  return (
    <View className="flex-1">
      {!ids.length && <EmptyList text={t('pages.safe-storage.nothing-here')} />}
      {ids.length > 0 && (
        <View className="flex-1">
          {!hasPremium && safe_storage_free_add_mode && <Vail />}
          <Suspense fallback={<Loader />}>
            <Animated.View className="flex-1" entering={FadeIn}>
              <GroupContactsListView
                data={zipped.map((group) => group[1])}
                groupHeader={(_, index) => zipped[index][0]}
                handleContactSelect={handleContactSelect}
                isContactSelected={isContactSelected}
                isRefreshing={status === 'loading'}
                refresh={refetch}
                type="private-contacts"
              />
            </Animated.View>
          </Suspense>
        </View>
      )}
      <View
        className="absolute inset-x-2 bottom-0"
        style={{ paddingBottom: insets.bottom + scaleY(10) }}
      >
        {selectedContacts.size ? (
          <TouchableOpacity
            className="items-center justify-center overflow-hidden rounded-2xl bg-red h-13 w-full"
            disabled={selectedContacts.size === 0 || loading}
            onPress={handleDeleteContacts}
          >
            <UiText className="text-base font-semibold text-white">
              Delete {selectedContacts.size} Contact
              {selectedContacts.size === 1 ? '' : 's'}
            </UiText>
          </TouchableOpacity>
        ) : (
          <UiButton
            className="h-12 w-full"
            disabled={loading}
            loading={loading}
            onPress={handleAddContact}
          >
            <UiText className="text-base font-semibold text-white">
              {t('pages.safe-storage.add-contact')}
            </UiText>
          </UiButton>
        )}
      </View>
    </View>
  );
}
