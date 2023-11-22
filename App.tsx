/* eslint-disable prettier/prettier */
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomePage from './src/pages/Home';
import WebViews from './src/pages/WebView';
import SplashPage from './src/pages/Splash';
import ClassPage from './src/pages/Class';
import {AppState, NativeModules} from 'react-native';
import InternetConnectionAlert from 'react-native-internet-connection-alert';

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
          NativeModules.DevSettings.reload();
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
    </InternetConnectionAlert>
  );
}

export default App;
