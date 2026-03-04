import { PropsWithChildren } from 'react';
import { Easing } from 'react-native';
import {
  createModalStack,
  type ModalOptions,
  type ModalStack,
} from 'react-native-modalfy';

import { PaywallModal } from '@/pages/paywall/components/paywall-modal';
import { AddedFilesModal } from '@/pages/secret-folder-documents/components/added-files-modal';
import { LimitFilesModal } from '@/pages/secret-folder-documents/components/limit-files-modal';
import { ProtectFilesModal } from '@/pages/secret-folder-documents/components/protect-files-modal';

import { CleanerHappyModal } from './cleaner-happy-modal';
import { CleaningModal } from './cleaning-modal';
import { LimitDeletionsModal } from './limit-deletions-modal';
import { LoaderModal } from './loader-modal';
import { SuccessModal } from './success-modal';

const defaultOptions: ModalOptions = {
  position: 'center',
  disableFlingGesture: true,
  backBehavior: 'none',
  backdropOpacity: 0.2,
  animateInConfig: {
    easing: Easing.inOut(Easing.exp),
    duration: 1000,
  },
} as const;

export type ModalStackParams = {
  LoaderModal: typeof LoaderModal;
  SuccessModal: {
    filesQuantity: number;
    freedSpace: string;
  };
  CleanerHappyModal: PropsWithChildren;
  CleaningModal: never;
  LimitDeletionsModal: {
    count: number;
  };
  ProtectFilesModal: never;
  AddedFilesModal: {
    count: number;
  };
  LimitFilesModal: {
    count: number;
  };
  Paywall: {
    type: 'a' | 'b' | 'c';
  };
};

export const modalsStack: ModalStack<ModalStackParams> = createModalStack(
  {
    LoaderModal,
    SuccessModal,
    CleanerHappyModal,
    CleaningModal,
    LimitDeletionsModal,
    ProtectFilesModal,
    AddedFilesModal,
    LimitFilesModal,
    Paywall: {
      modal: PaywallModal,
      position: 'top',
    },
  },
  defaultOptions
);
