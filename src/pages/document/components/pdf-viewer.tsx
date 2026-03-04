import { scaleX, scaleY } from '@kirz/nativewind-scale';
import { shareAsync } from 'expo-sharing';
import React, { useState } from 'react';
import { Pressable, useWindowDimensions, View } from 'react-native';
import Pdf from 'react-native-pdf';

import FileFiller from './file-filler';

type Props = {
  path: string;
  fileName: string;
};

export default function PDFViewer({ path, fileName }: Props) {
  const { width, height } = useWindowDimensions();
  const [err, setErr] = useState<object | null>(null);
  const source = {
    uri: path,
    cache: true,
  };

  function handlePress() {
    shareAsync(path);
  }

  return (
    <View className="flex-1">
      {err ? (
        <FileFiller path={path} fileName={fileName} />
      ) : (
        <Pressable onLongPress={handlePress}>
          <Pdf
            style={{ width: width - scaleX(40), height: height - scaleY(140) }}
            source={source}
            onError={(error) => {
              console.error(error);
              setErr(error);
            }}
          />
        </Pressable>
      )}
    </View>
  );
}
