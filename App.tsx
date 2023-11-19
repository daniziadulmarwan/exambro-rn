import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomePage from './src/pages/Home';
import WebViews from './src/pages/WebView';
import SplashPage from './src/pages/Splash';
import ClassPage from './src/pages/Class';

const Stack = createNativeStackNavigator();

function App() {
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
          options={({route}: any) => ({title: `${route.params?.name}`})}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
