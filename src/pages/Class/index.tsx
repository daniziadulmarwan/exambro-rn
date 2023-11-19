/* eslint-disable prettier/prettier */
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import LeftArrow from '../../assets/left-arrow.png';
import Book from '../../assets/cover.png';
import moment from 'moment';
import 'moment/locale/id';

moment.locale('id');

export default function ClassPage({route, navigation}: any) {
  const apiUrl = 'http://10.0.2.2:3000/api/v1/classes';
  const {id, name} = route.params;
  // const id = 1;

  const [classes, setClasses] = useState([]);

  useEffect(() => {
    const getApi = async () => {
      let res = await fetch(`${apiUrl}/${id}`);
      let data = await res.json();
      setClasses(data.data.exam);
    };

    getApi();
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.icon}
          onPress={() => navigation.goBack()}>
          <Image source={LeftArrow} style={styles.image} />
        </TouchableOpacity>
        <Text style={styles.headerText}>{name}</Text>
      </View>
      {classes.map((item: any) => (
        <TouchableOpacity
          style={styles.card}
          key={item.id}
          onPress={() =>
            navigation.navigate('WebView', {
              url: item.url,
              name: item.mapel,
            })
          }>
          <View style={styles.cover}>
            <Image source={Book} style={styles.book} />
          </View>

          <View style={styles.wrapper}>
            <View>
              <Text style={styles.title}>{item.mapel}</Text>
              <Text style={styles.subTitle}>
                {moment(new Date(item.start_time)).format('LT')} -{' '}
                {moment(new Date(item.end_time)).format('LT')}
              </Text>
            </View>
            {item.start_time > Date.now() ? (
              <Text style={styles.activeStatus}>Active</Text>
            ) : (
              <Text style={styles.nonactiveStatus}>Non Active</Text>
            )}
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    backgroundColor: 'white',
  },
  header: {
    marginTop: 16,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerText: {
    flex: 1,
    textAlign: 'center',
    color: '#000000',
    fontSize: 18,
    fontFamily: 'Poppins-Bold',
  },
  icon: {
    width: 46,
    height: 46,
    borderRadius: 16,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',

    elevation: 8,
    shadowColor: '#000000',
  },
  card: {
    marginTop: 24,
    display: 'flex',
    flexDirection: 'row',
    paddingHorizontal: 6,
    paddingVertical: 6,
    marginBottom: 15,
    backgroundColor: 'white',
    borderRadius: 16,

    elevation: 8,
    shadowColor: '#000000',
  },
  cover: {
    backgroundColor: '#F8F8F8',
    borderRadius: 16,
    width: 100,
    height: 100,
  },
  image: {
    width: 24,
    height: 24,
  },
  book: {
    width: 100,
    height: 100,
  },
  wrapper: {
    marginLeft: 15,
    marginTop: 10,
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  title: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000000',
    fontFamily: 'Poppins-Semibold',
  },
  subTitle: {
    color: '#B3B1B0',
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
  },
  activeStatus: {
    color: '#FD9340',
    fontSize: 18,
    fontWeight: '600',
    fontFamily: 'Poppins-Semibold',
  },
  nonactiveStatus: {
    color: '#E5E4E3',
    fontSize: 18,
    fontWeight: '600',
    fontFamily: 'Poppins-Semibold',
  },
});