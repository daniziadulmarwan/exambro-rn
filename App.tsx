import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomePage from './src/pages/Home';
import WebViews from './src/pages/WebView';
import SplashPage from './src/pages/Splash';
import ClassPage from './src/pages/Class';
import {hideNavigationBar} from 'react-native-navigation-bar-color';

const Stack = createNativeStackNavigator();

function App() {
  React.useEffect(() => {
    hideNavigationBar();
  }, []);
  return (
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
  );
}

export default App;
