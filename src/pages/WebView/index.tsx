/* eslint-disable prettier/prettier */
import React, {useState, useEffect} from 'react';
import {StyleSheet, View, TouchableOpacity, Image, Text} from 'react-native';
import WebView from 'react-native-webview';
import LeftArrow from '../../assets/left-arrow.png';
import Countdown from 'react-countdown';

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
        <Text style={styles.headerText}>{name}</Text>
        <Countdown
          date={Date.now() + 200000}
          renderer={({hours, minutes, seconds, completed}: any) => {
            return (
              <Text>
                {hours}:{minutes}:{seconds}
              </Text>
            );
          }}
        />
      </View>
      <WebView
        source={{
          uri: url,
        }}
        style={styles.webView}
      />
    </View>
  );
}

const styles = StyleSheet.create({
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
