/* eslint-disable prettier/prettier */
import React from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  Text,
  ActivityIndicator,
} from 'react-native';
import WebView from 'react-native-webview';
import LeftArrow from '../../assets/left-arrow.png';
import Countdown from 'react-countdown';

const ActivityIndicatorElement = () => {
  return (
    <ActivityIndicator
      color="#009688"
      size="large"
      style={styles.activityIndicatorStyle}
    />
  );
};

function WebViews({route, navigation}: any) {
  const {id, url, name, start, end}: any = route.params;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.icon}
          onPress={() => navigation.goBack()}>
          <Image source={LeftArrow} style={styles.image} />
        </TouchableOpacity>
        <Text style={styles.headerText}>{name}</Text>
        <Countdown
          date={Date.now() + 7200000}
          renderer={({hours, minutes, seconds, completed}: any) => {
            if (completed) {
              navigation.goBack({id});
            }
            return (
              <Text style={styles.timer}>
                {hours}:{minutes}:{seconds}
              </Text>
            );
          }}
        />
      </View>
      <WebView
        renderLoading={ActivityIndicatorElement}
        startInLoadingState={true}
        source={{
          uri: url,
        }}
        style={styles.webView}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  activityIndicatorStyle: {
    flex: 1,
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
  },
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    paddingVertical: 15,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  timer: {
    color: '#FD9340',
    fontFamily: 'Poppins-Medium',
  },
  headerText: {
    flex: 1,
    textAlign: 'center',
    color: '#000000',
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
    textTransform: 'uppercase',
  },
  image: {
    width: 24,
    height: 24,
  },
  icon: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  webView: {
    flex: 1,
  },
});

export default WebViews;
