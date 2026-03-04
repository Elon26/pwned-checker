import DocumentItem from '@/types/document-item';
import HistoryItem from '@/types/history-item';

/**
 * The initial state of the storage.
 *
 * @warning
 * All keys must be defined. Use `null` for `undefined` values.
 */
export const initialStorageState = {
  isOnboardingFinished: false,
  hasDeveloperPremium: false,
  fakeCheckPassed: false,
  lastCheckTimestamp: 0,
  checkQuantity: 0,
  emailCheckHistory: [] as HistoryItem[],
  passwordCheckHistory: [] as HistoryItem[],
  savedDocuments: [] as DocumentItem[],
  freeLeakCheckAvailable: true,
};

export type Storage = typeof initialStorageState;
