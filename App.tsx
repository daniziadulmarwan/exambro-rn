/* eslint-disable prettier/prettier */
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomePage from './src/pages/Home';
import WebViews from './src/pages/WebView';
import SplashPage from './src/pages/Splash';
import ClassPage from './src/pages/Class';
import {AppState} from 'react-native';
import InternetConnectionAlert from 'react-native-internet-connection-alert';
import RNRestart from 'react-native-restart';
import TokenPage from './src/pages/Token';
import FlashMessage from 'react-native-flash-message';

const Stack = createNativeStackNavigator();

function App() {
  const appState = React.useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = React.useState(
    appState.current,
  );

  console.log(appStateVisible);

  React.useEffect(() => {
    const subscription = AppState.addEventListener(
      'change',
      (nextAppState: any) => {
        if (
          appState.current.match(/inactive|background/) &&
          nextAppState === 'active'
        ) {
          RNRestart.restart();
          console.log('App has come to the foreground!');
        }

        appState.current = nextAppState;
        setAppStateVisible(appState.current);
        console.log('AppState', appState.current);
      },
    );

    return () => {
      subscription.remove();
    };
  }, [appStateVisible]);

  return (
    <InternetConnectionAlert>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Splash">
          <Stack.Screen
            name="Splash"
            component={SplashPage}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Token"
            component={TokenPage}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Home"
            component={HomePage}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Class"
            component={ClassPage}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="WebView"
            component={WebViews}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      </NavigationContainer>
      <FlashMessage position="top" />
    </InternetConnectionAlert>
  );
}

export default App;
