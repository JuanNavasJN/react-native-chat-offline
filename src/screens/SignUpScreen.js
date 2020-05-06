import React, {useState, useEffect} from 'react';
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
import {useSelector} from 'react-redux';
import {useMutation} from '@apollo/react-hooks';
import {USER_CREATE} from '../graphql/querys';
import {createUser as userCreateDB} from '../db/index';

const SignUpScreen = ({navigation}) => {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmation, setConfirmation] = useState('');

  const {user} = useSelector(state => state.main);

  const {content, bgCard, text, placeholder, bgBotton} = useSelector(
    state => state.colors,
  );

  const [userCreate] = useMutation(USER_CREATE);

  useEffect(
    _ => {
      if (user && typeof user.accessToken === 'string') {
        navigation.navigate('Chats');
      }
    },
    [user],
  );

  const handleSubmit = async _ => {
    // --------------------------------- Validations --------------------------------------
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

    let data = {
      name,
      username,
      password,
    };

    try {
      let res = await userCreate({
        variables: {data},
      });

      let userId = res.data.userCreate._id;

      // --- All good then --------

      let newUser = await userCreateDB({
        _id: userId,
        name,
        username,
      });

      console.log('user saved on DB -> ', newUser);

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
                      // value={name}
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
                      // value={username}
                      onChangeText={e => setUsername(e.toLowerCase())}
                    />
                  </Item>
                </View>
                <View style={styles.row}>
                  <Item style={styles.item}>
                    <Input
                      placeholder="Password"
                      placeholderTextColor={placeholder}
                      style={{color: text}}
                      // value={password}
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
                      // value={confirmation}
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
