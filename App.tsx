import React, { useEffect, useState } from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import AppNavigator from './src/navigation/AppNavigator';
import { SplashScreen } from './src/screens/SplashScreen';
import {
  getRemoteConfig,
  setDefaults,
  setConfigSettings,
  fetchAndActivate,
  getValue,
} from '@react-native-firebase/remote-config';
import { getApp } from '@react-native-firebase/app';

const FALLBACK_URL = 'https://quick-bridge-forge.space/';

export default function App() {
  const [initialUrl, setInitialUrl] = useState<string | null>(null);
  const [initialId, setInitialId] = useState('RFjztcxv');
  const [initialUrlToOurBack, setInitialUrlToOurBack] = useState('https://sharp-hub-co.top/');
  const [oneSignKkkk, setOneSignKkkk] = useState('91a29e4e-02d5-48fc-a17f-7739ed80d2d2')

  useEffect(() => {
    const loadRemoteConfig = async () => {
      try {
        const app = getApp();
        const rc = getRemoteConfig(app);

        await setDefaults(rc, {
          DefLin: FALLBACK_URL,
        });

        await setConfigSettings(rc, {
          minimumFetchIntervalMillis: __DEV__ ? 0 : 300000,
        });

        await fetchAndActivate(rc);

        const remoteUrl = getValue(rc, 'DefLin').asString();

        if (remoteUrl && remoteUrl.startsWith('http')) {
          setInitialUrl(remoteUrl);
        } else {
          setInitialUrl(FALLBACK_URL);
        }
      } catch (error) {
        console.log('Remote Config error:', error);
        setInitialUrl(FALLBACK_URL);
      }
    };

    loadRemoteConfig();
  }, []);

  if (!initialUrl) {
    return (
      <SafeAreaProvider>
        <SplashScreen />
      </SafeAreaProvider>
    );
  }

  return (
    <>
      <AppNavigator
        initialUrl={initialUrl}
        initialId={initialId}
        initialUrlToOurBack={initialUrlToOurBack}
        oneSignKkkk={oneSignKkkk}
      />
    </>
  );
}
