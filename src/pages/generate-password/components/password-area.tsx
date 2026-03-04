import { View } from 'react-native';
import { twMerge } from 'tailwind-merge';

import { UiText } from '@/ui/ui-text';

type Props = {
  password: string;
};

export default function PasswordArea({ password }: Props) {
  const isWeakPassword = checkPassword(password);

  function checkPassword(password: string): boolean {
    const minLength = 8;
    const hasLowercase = /[a-z]/.test(password);
    const hasUppercase = /[A-Z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    const safetySum =
      Number(hasLowercase) +
      Number(hasUppercase) +
      Number(hasNumber) +
      Number(hasSpecialChar);

    return password.length < minLength || safetySum < 3;
  }

  return (
    <View>
      {password ? (
        <View
          className={twMerge(
            'justify-center rounded-xl border border-gray h-20',
            isWeakPassword ? 'bg-red' : 'bg-green'
          )}
        >
          <UiText className="text-center text-white">{password}</UiText>
          <UiText className="text-center text-white">
            {isWeakPassword
              ? t('pages.generate-password.dangerous-password')
              : t('pages.generate-password.strong-password')}
          </UiText>
        </View>
      ) : (
        <View className="justify-center rounded-xl border border-gray bg-gray/20 h-20">
          <UiText className="text-center text-gray">
            {t('pages.generate-password.tap-generate')}
          </UiText>
        </View>
      )}
    </View>
  );
}
