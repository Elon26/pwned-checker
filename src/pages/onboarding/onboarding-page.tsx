import { useConfig } from '@/hooks/use-config';

import { OnboardingA } from './variants/onboarding-a';

const Onboardings = {
  a: OnboardingA,
};

export function OnboardingPage() {
  const { onboarding_id } = useConfig();
  const Onboarding = Onboardings[onboarding_id] ?? OnboardingA;

  return <Onboarding />;
}
