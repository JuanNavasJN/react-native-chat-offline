import React, {useState, useCallback, useEffect} from 'react';
import {View, StyleSheet, KeyboardAvoidingView, Alert} from 'react-native';
import {
  Container,
  Card,
  CardItem,
  Body,
  Button,
  Text,
  Content,
  Item,
  Input,
} from 'native-base';
import Header from '../components/Header';
import {vh, vw} from 'react-native-css-vh-vw';
import {LOGIN} from '../graphql/querys';
import {useMutation} from '@apollo/react-hooks';
import {useDispatch, useSelector} from 'react-redux';
import {createUser} from '../db/index';

const SignInScreen = ({navigation}) => {
  const dispatch = useDispatch();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const {isConnected} = useSelector(state => state.main);

  const setUser = useCallback(
    data => dispatch({type: 'SET_USER', payload: data}),
    [dispatch],
  );

  const setIsLogged = useCallback(
    data => dispatch({type: 'SET_IS_LOGGED', payload: data}),
    [dispatch],
  );

  const {content, bgCard, text, placeholder, bgBotton} = useSelector(
    state => state.colors,
  );

  const [login, {error}] = useMutation(LOGIN);

  // useEffect(
  //   _ => {
  //     if (user && typeof user.accessToken === 'string') {
  //       navigation.navigate('Chats');
  //       setIsLogged(true);
  //     }
  //   },
  //   [user],
  // );

  const handleSubmit = async _ => {
    // --------------------------------- Validations --------------------------------------
    if (isConnected === false) {
      Alert.alert('', 'Sorry 😕 there is no internet conection.');
      return;
    }

    if (username === '' || password === '') {
      Alert.alert('', 'Please complete all fields.');
      return;
    }

    if (/^[a-zA-Z0-9]+$/.test(username) === false) {
      Alert.alert('', 'Username must be alphanumeric.');
      return;
    }

    if (password.length < 6) {
      Alert.alert('', 'Password must have at least 6 characters.');
      return;
    }

    // --------------------------------- End - Validations --------------------------------------

    let data = {
      username: username.toLowerCase(),
      password,
    };

    try {
      // alert('Loading...');

      let res = await login({
        variables: {data},
      });

      if (res.data && res.data.login.accessToken) {
        let data = res.data.login;

        let newUser = await createUser({
          _id: data._id,
          name: data.name,
          username: data.username,
          accessToken: data.accessToken,
          avatar: data.avatar || '',
        });

        setUser(newUser); // set user to redux
        setIsLogged(true);
        navigation.navigate('Chats');
      } else {
        Alert.alert('', 'Error to login 😕');
        return;
      }

      // alert('User created! 😀');
      // navigation.navigate('SignIn');
    } catch (e) {
      let err = String(e);

      if (/Incorrect username or password/.test(err)) {
        Alert.alert('', 'Incorrect username or password 😕');
        return;
      }

      Alert.alert('', 'Error to login 😕');

      console.log('error to login ->');
      console.log(err);
    } finally {
      setUsername('');
      setPassword('');
    }
  };

  return (
    <Container>
      <Header title="Sign In" navigation={navigation} />
      <View style={[styles.content, {backgroundColor: content}]}>
        <Card>
          <CardItem style={[{backgroundColor: bgCard}]}>
            <Body style={styles.body}>
              <KeyboardAvoidingView>
                <View style={styles.row}>
                  <Item style={styles.item}>
                    <Input
                      placeholder="Username"
                      placeholderTextColor={placeholder}
                      style={{color: text}}
                      value={username}
                      onChangeText={e => setUsername(e)}
                    />
                  </Item>
                </View>
                <View style={styles.row}>
                  <Item style={styles.item}>
                    <Input
                      placeholderTextColor={placeholder}
                      placeholder="Password"
                      style={{color: text}}
                      secureTextEntry={true}
                      value={password}
                      onChangeText={e => setPassword(e)}
                    />
                  </Item>
                </View>

                <View style={[styles.row, {marginTop: 20}]}>
                  <Button
                    style={[styles.button, {backgroundColor: bgBotton}]}
                    onPress={_ => navigation.navigate('SignUp')}>
                    <Text>Sign Up</Text>
                  </Button>
                  <Button
                    style={[styles.button, {backgroundColor: bgBotton}]}
                    onPress={handleSubmit}>
                    <Text>Login</Text>
                  </Button>
                </View>
              </KeyboardAvoidingView>
            </Body>
          </CardItem>
        </Card>
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  body: {height: vh(32)},
  content: {
    height: '100%',
    paddingTop: '25%',
    paddingHorizontal: '3%',
  },
  row: {
    width: vw(81),
    padding: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    minWidth: vw(32),
    textAlign: 'center',
    justifyContent: 'center',
    backgroundColor: '#3949ab',
  },
  item: {
    width: '100%',
  },
});

export default SignInScreen;
