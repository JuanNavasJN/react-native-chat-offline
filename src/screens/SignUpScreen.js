import React, {useState, useEffect, useCallback} from 'react';
import {View, StyleSheet, KeyboardAvoidingView, Alert} from 'react-native';
import {
  Container,
  Card,
  CardItem,
  Body,
  Button,
  Text,
  // Content,
  Item,
  Input,
} from 'native-base';
import Header from '../components/Header';
import {vh, vw} from 'react-native-css-vh-vw';
import {useSelector, useDispatch} from 'react-redux';
import {useMutation} from '@apollo/react-hooks';
import {USER_CREATE} from '../graphql/querys';

const SignUpScreen = ({navigation}) => {
  const dispatch = useDispatch();

  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmation, setConfirmation] = useState('');

  const {user, isConnected} = useSelector(state => state.main);

  const {content, bgCard, text, placeholder, bgBotton} = useSelector(
    state => state.colors,
  );

  const setIsLogged = useCallback(
    data => dispatch({type: 'SET_IS_LOGGED', payload: data}),
    [dispatch],
  );

  const setUser = useCallback(
    data => dispatch({type: 'SET_USER', payload: data}),
    [dispatch],
  );

  const [userCreate] = useMutation(USER_CREATE);

  useEffect(
    _ => {
      if (user && typeof user.accessToken === 'string') {
        navigation.navigate('Chats');
        setIsLogged(true);
      }
    },
    [user],
  );

  const handleSubmit = async _ => {
    // --------------------------------- Validations --------------------------------------

    if (isConnected === false) {
      Alert.alert('', 'Sorry 😕 there is no internet conection.');
      return;
    }

    if (
      name === '' ||
      username === '' ||
      password === '' ||
      confirmation === ''
    ) {
      Alert.alert('', 'Please complete all fields.');
      return;
    }

    if (/^[a-zA-Z0-9]+$/.test(username) === false) {
      Alert.alert('', 'Username must be alphanumeric.');
      return;
    }

    if (password !== confirmation) {
      Alert.alert('', 'Password and confirmation password must be equals.');
      return;
    }

    if (password.length < 6) {
      Alert.alert('', 'Password must have at least 6 characters.');
      return;
    }

    // --------------------------------- End - Validations --------------------------------------

    setUser(undefined);

    let data = {
      name,
      username: username.toLowerCase(),
      password,
    };

    try {
      await userCreate({
        variables: {data},
      });

      // --- All good then --------

      Alert.alert('', 'User created! 😀');
      navigation.navigate('SignIn');
    } catch (e) {
      Alert.alert('', 'Error to create User 😕, possibly the username exists.');

      console.log('error to create user ->');
      console.log(e);
    } finally {
      setUsername('');
      setName('');
      setPassword('');
      setConfirmation('');
    }
  };

  return (
    <Container>
      <Header title="Sign Up" navigation={navigation} />
      <View style={[styles.content, {backgroundColor: content}]}>
        <Card>
          <CardItem style={[{backgroundColor: bgCard}]}>
            <Body style={styles.body}>
              <KeyboardAvoidingView>
                <View style={styles.row}>
                  <Item style={styles.item}>
                    <Input
                      placeholder="Name"
                      placeholderTextColor={placeholder}
                      style={{color: text}}
                      value={name}
                      onChangeText={e => setName(e)}
                    />
                  </Item>
                </View>
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
                      placeholder="Password"
                      placeholderTextColor={placeholder}
                      style={{color: text}}
                      value={password}
                      onChangeText={e => setPassword(e)}
                      secureTextEntry={true}
                    />
                  </Item>
                </View>
                <View style={styles.row}>
                  <Item style={styles.item}>
                    <Input
                      placeholder="Confirm Password"
                      placeholderTextColor={placeholder}
                      style={{color: text}}
                      value={confirmation}
                      onChangeText={e => setConfirmation(e)}
                      secureTextEntry={true}
                    />
                  </Item>
                </View>

                <View style={[styles.row, {marginTop: 20}]}>
                  <Button
                    style={[styles.button, {backgroundColor: bgBotton}]}
                    onPress={_ => navigation.navigate('SignIn')}>
                    <Text>Sign In</Text>
                  </Button>
                  <Button
                    style={[styles.button, {backgroundColor: bgBotton}]}
                    onPress={handleSubmit}>
                    <Text>Save</Text>
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
  body: {height: vh(50)},
  content: {
    height: '100%',
    paddingTop: '20%',
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
  },
  item: {
    width: '100%',
  },
});

export default SignUpScreen;
