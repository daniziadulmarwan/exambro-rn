/* eslint-disable prettier/prettier */
import {Image, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import Logo from '../../assets/alamin-logo.png';

function SplashPage({navigation}: any) {
  useEffect(() => {
    setTimeout(() => {
      navigation.replace('Token');
    }, 3000);
  });

  return (
    <View style={styles.container}>
      <Image source={Logo} style={styles.image} />
      <View style={styles.wrapper}>
        <Text style={styles.title}>Amin ExamBro</Text>
        <Text style={styles.subTitle}>Version 1.0</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 130,
    height: 130,
  },
  wrapper: {
    position: 'absolute',
    bottom: 25,
  },
  title: {
    fontSize: 18,
    textTransform: 'uppercase',
    marginTop: 10,
    color: '#000000',
    fontWeight: '500',
    fontFamily: 'Poppins-Bold',
  },
  subTitle: {
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
    textAlign: 'center',
    marginTop: -7,
  },
});

export default SplashPage;
