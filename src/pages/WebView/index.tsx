/* eslint-disable prettier/prettier */
import React from 'react';
import {StyleSheet} from 'react-native';
import WebView from 'react-native-webview';

function WebViews({route}: any) {
  const {url} = route.params;
  return (
    <WebView
      source={{
        uri: url,
      }}
      style={styles.container}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default WebViews;
