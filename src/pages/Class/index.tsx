/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable prettier/prettier */
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  RefreshControl,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import LeftArrow from '../../assets/left-arrow.png';
import Book from '../../assets/cover.png';
import moment from 'moment';
import 'moment/locale/id';
import {apiUrl} from '../../utils/url';

moment.locale('id');

export default function ClassPage({route, navigation}: any) {
  const {id, name} = route.params;

  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(false);

  const getApi = async () => {
    setLoading(true);
    let res = await fetch(`${apiUrl}/class/${id}`);
    let data = await res.json();
    setLoading(false);
    setClasses(data.data.exams);
  };

  useEffect(() => {
    getApi();
  }, [id]);

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
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={getApi} />
        }>
        {classes.length > 0 ? (
          <View style={styles.cnt}>
            {classes.map((item: any) => {
              return (
                <TouchableOpacity
                  style={styles.card}
                  key={item.id}
                  onPress={() =>
                    navigation.navigate('WebView', {
                      url: item.url,
                      name: item.mapel,
                      end: item.end_time,
                      start: item.start_time,
                    })
                  }>
                  <View style={styles.cover}>
                    <Image source={Book} style={styles.book} />
                  </View>

                  <View style={styles.wrapper}>
                    <View>
                      <Text style={styles.title}>{item.mapel}</Text>
                      <Text style={styles.subTitle}>
                        {moment(new Date(item.start_time)).format('dddd')},{' '}
                        {moment(new Date(item.start_time)).format('ll')}
                      </Text>
                      <Text style={styles.subTitle2}>
                        {moment(new Date(item.start_time)).format('LT')} -{' '}
                        {moment(new Date(item.end_time)).format('LT')}
                      </Text>
                    </View>
                    <Text style={styles.activeStatus}>Active</Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        ) : (
          <View style={styles.cnt}>
            <Text style={styles.textEmpty}>Data empty</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: 25,
  },
  cnt: {
    paddingHorizontal: 24,
    paddingBottom: 20,
  },
  textEmpty: {
    textAlign: 'center',
    marginTop: '50%',
    fontSize: 18,
    fontFamily: 'Poppins-Regular',
  },
  header: {
    marginTop: 16,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingBottom: 7,
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
  subTitle2: {
    color: '#B3B1B0',
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    marginTop: -6,
  },
  activeStatus: {
    color: '#FD9340',
    fontSize: 13,
    fontWeight: '600',
    fontFamily: 'Poppins-SemiBold',
    textTransform: 'uppercase',
  },
  nonactiveStatus: {
    color: '#E5E4E3',
    fontSize: 13,
    fontWeight: '600',
    fontFamily: 'Poppins-SemiBold',
    textTransform: 'uppercase',
  },
});
