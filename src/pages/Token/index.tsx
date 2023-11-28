/* eslint-disable prettier/prettier */
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {showMessage} from 'react-native-flash-message';
import {apiUrl} from '../../utils/url';

const TokenPage = ({navigation}: any) => {
  const [token, setToken] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${apiUrl}/token`, {
        method: 'post',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({token}),
      });

      const data = await res.json();

      setLoading(false);
      if (data.status === 'ok') {
        navigation.replace('Home');
      } else {
        showMessage({
          message: 'Invalid token',
          type: 'danger',
        });
      }
    } catch (error) {
      setLoading(false);
      showMessage({
        message: 'Something wrong',
        type: 'danger',
      });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.cnt}>
        <Text style={styles.welcome}>Hello, Welcome Back!</Text>
        <Text style={styles.subText}>
          Sabr is when you are facing a big hardship but still say,
          Alhamdulillah.
        </Text>
        <Text style={styles.tokenText}>Please input token first</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Enter your token"
          onChangeText={setToken}
          value={token}
          autoCapitalize="none"
        />
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>
            {loading ? 'Loading...' : 'Get Started'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default TokenPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 7,
    backgroundColor: 'white',
  },
  cnt: {
    flex: 1,
    paddingHorizontal: 24,
    paddingBottom: 20,
    marginTop: 46,
  },
  welcome: {
    fontSize: 40,
    fontFamily: 'Poppins-Bold',
    color: '#000000',
  },
  subText: {
    marginTop: 32,
    color: '#898989',
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
  },
  tokenText: {
    marginTop: 32,
    fontFamily: 'Poppins-Regular',
    textAlign: 'left',
    marginBottom: 5,
    fontSize: 16,
    color: '#FD9340',
    textDecorationLine: 'underline',
  },
  textInput: {
    width: '100%',
    borderColor: '#B3B1B0',
    borderWidth: 1,
    borderRadius: 14,
    height: 60,
    paddingHorizontal: 24,
    fontFamily: 'Poppins-Regular',
    color: '#FD9340',
  },
  button: {
    backgroundColor: '#FD9340',
    paddingVertical: 16,
    width: '100%',
    marginTop: 25,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
  },
});
