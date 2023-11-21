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
import moment from 'moment';
// import Countdown from 'react-countdown';

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
  const {url, name, start, end}: any = route.params;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.icon}
          onPress={() => navigation.goBack()}>
          <Image source={LeftArrow} style={styles.image} />
        </TouchableOpacity>
        <View style={styles.headerTextWrapper}>
          <Text style={styles.headerText}>{name}</Text>
          <Text style={styles.headerSubText}>
            {moment(start).format('LT')} - {moment(end).format('LT')}
          </Text>
        </View>
        {/* <Countdown
          date={Date.now() + +hasil}
          renderer={({hours, minutes, seconds, completed}: any) => {
            return (
              <Text style={styles.timer}>
                {hours}:{minutes}:{seconds}
              </Text>
            );
          }}
        /> */}
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
    paddingTop: 25,
  },
  header: {
    paddingVertical: 10,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  headerTextWrapper: {
    flex: 1,
  },
  headerText: {
    textAlign: 'center',
    color: '#000000',
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
    textTransform: 'uppercase',
  },
  headerSubText: {
    textAlign: 'center',
    marginTop: -8,
  },
  timer: {
    color: '#FD9340',
    fontFamily: 'Poppins-Medium',
  },
  image: {
    width: 24,
    height: 24,
  },
  icon: {
    justifyContent: 'center',
    alignItems: 'center',

    width: 46,
    height: 46,
    borderRadius: 16,
    backgroundColor: 'white',
    elevation: 8,
    shadowColor: '#000000',
  },
  webView: {
    flex: 1,
  },
});

export default WebViews;
