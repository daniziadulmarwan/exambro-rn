/* eslint-disable prettier/prettier */
import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  ScrollView,
  RefreshControl,
  BackHandler,
} from 'react-native';
import Notif from '../../assets/notif.png';
import Book from '../../assets/fzm.png';
import Lock from '../../assets/lock.png';
import {apiUrl} from '../../utils/url';

function HomePage({navigation}: {navigation: any}) {
  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchExamData = async () => {
    setLoading(true);
    try {
      let res = await fetch(`${apiUrl}/class`, {
        method: 'get',
      });
      let data = await res.json();
      setLoading(false);
      setExams(data.datas);
    } catch (error) {
      setLoading(false);
      setExams([]);
    }
  };

  useEffect(() => {
    fetchExamData();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.welcome}>Welcome</Text>
          <Text style={styles.headerText}>MA Al Amin, Students</Text>
        </View>
        <TouchableOpacity style={styles.icon}>
          <Image source={Notif} style={styles.image} />
          <View style={styles.dot} />
        </TouchableOpacity>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={fetchExamData} />
        }>
        <View style={styles.cnt}>
          {exams.map((item: any) => (
            <TouchableOpacity
              style={styles.card}
              key={item.id}
              onPress={() =>
                navigation.navigate('Class', {
                  id: item.id,
                  name: item.title,
                })
              }>
              <View style={styles.cover}>
                <Image source={Book} style={styles.book} />
              </View>

              <View style={styles.wrapper}>
                <View>
                  <Text style={styles.title}>{item.title}</Text>
                  <Text style={styles.subTitle}>Tahun 2023/2024</Text>
                </View>
                <Text style={styles.activeStatus}>
                  {item.exams.length} Soal
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      <View style={styles.exitWrapper}>
        <TouchableOpacity
          style={styles.exitButton}
          onPress={() => {
            BackHandler.exitApp();
          }}>
          <Image source={Lock} style={styles.exitImage} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: 7,
  },
  cnt: {
    paddingHorizontal: 24,
    paddingBottom: 20,
  },
  header: {
    paddingHorizontal: 24,
    marginTop: 16,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 7,
  },
  welcome: {
    color: '#B3B1B0',
    fontSize: 14,
    fontWeight: '600',
    fontFamily: 'Poppins-Semibold',
  },
  headerText: {
    textAlign: 'center',
    color: '#000000',
    fontSize: 18,
    fontFamily: 'Poppins-Regular',
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
  dot: {
    width: 10,
    height: 10,
    backgroundColor: '#FD9340',
    borderRadius: 5,
    position: 'absolute',
    top: 10,
    right: 13,
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
    fontWeight: '600',
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
    fontSize: 14,
    fontWeight: '600',
    fontFamily: 'Poppins-SemiBold',
    textTransform: 'uppercase',
  },
  exitWrapper: {
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
  exitButton: {
    width: 60,
    height: 60,
    borderRadius: 40,
    backgroundColor: '#FD9340',
    justifyContent: 'center',
    alignItems: 'center',
  },
  exitImage: {
    width: 30,
    height: 30,
  },
});

export default HomePage;
