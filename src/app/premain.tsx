import { withAuthenticationRequired } from 'expo-with-pincode';

import PremainPage from '@/pages/premain';

function PremainScreen() {
  return <PremainPage />;
}

export default withAuthenticationRequired(PremainScreen);
