import React, {useState, useEffect, useCallback} from 'react';
import {
  Container,
  Card,
  CardItem,
  Body,
  Content,
  Item,
  Input,
  Button,
  Text,
  Icon,
} from 'native-base';
import Header from '../components/Header';
import {View, StyleSheet, TouchableOpacity, Alert, Image} from 'react-native';
import {vh, vw} from 'react-native-css-vh-vw';
import {useSelector, useDispatch} from 'react-redux';
import {useMutation} from '@apollo/react-hooks';
import {USER_UPDATE} from '../graphql/querys';
import {updateUserById} from '../db/index';
import ImagePicker from 'react-native-image-picker';
const short = require('short-uuid');

const ProfileScreen = ({navigation}) => {
  const dispatch = useDispatch();

  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState(undefined);
  const [confirmation, setConfirmation] = useState(undefined);
  const [avatarSource, setAvatarSource] = useState({});

  const [userUpdate] = useMutation(USER_UPDATE);

  const {content, bgCard, text, placeholder, bgBotton} = useSelector(
    state => state.colors,
  );

  const setUser = useCallback(
    data => dispatch({type: 'SET_USER', payload: data}),
    [dispatch],
  );

  const {user, isConnected} = useSelector(state => state.main);

  useEffect(
    _ => {
      if (typeof user === 'object') {
        setName(user.name);
        setUsername(user.username);
      }

      // if (user === undefined) navigation.navigate('SignIn');
      // console.log('user -> ', user);
    },
    [user],
  );

  const handleSave = async _ => {
    let {accessToken} = user;

    if (accessToken === null || accessToken === undefined) {
      navigation.navigate('SignIn');
    }

    // --------------------------------- Validations --------------------------------------

    if (isConnected === false) {
      Alert.alert('', 'Sorry 😕 there is no internet conection.');
      return;
    }

    if (/^[a-zA-Z0-9]+$/.test(username) === false) {
      Alert.alert('', 'Username must be alphanumeric.');
      return;
    }

    if (password !== undefined && password !== confirmation) {
      Alert.alert('', 'Password and confirmation password must be equals.');
      return;
    }

    if (password !== undefined && password.length < 6) {
      Alert.alert('', 'Password must have at least 6 characters.');
      return;
    }

    // --------------------------------- End - Validations --------------------------------------

    let data = {
      _id: user._id,
      name,
      username: username.toLowerCase(),
      password,
      avatar: 'avatar',
    };

    // console.log(accessToken, data);

    try {
      let res = await userUpdate({
        variables: {accessToken, data},
      });

      let userUpd = res.data.userUpdate;
      userUpd.accessToken = accessToken;

      setUser(userUpd);
      await updateUserById(userUpd._id, {
        username: userUpd.username,
        name: userUpd.name,
      });

      Alert.alert('', 'Updated profile 😀');
      // console.log('res ', res);
    } catch (e) {
      if (/E11000 duplicate key error collection/.test(e)) {
        Alert.alert('', 'New username not available 😕');
        return;
      }

      Alert.alert('', 'Error to update profile 😕');

      console.log('error to update profile ->');
      console.log(e);
    } finally {
      setPassword(undefined);
      setConfirmation(undefined);
    }
  };

  const handleAvatar = _ => {
    console.log('handle avatar...');

    // More info on all the options is below in the API Reference... just some common use cases shown here
    const options = {
      title: 'Select Avatar',
      // customButtons: [{name: 'fb', title: 'Choose Photo from Facebook'}],
      // storageOptions: {
      //   skipBackup: true,
      //   path: 'images',
      // },
    };

    /**
     * The first arg is the options object for customization (it can also be null or omitted for default options),
     * The second arg is the callback which sends object: response (more info in the API Reference)
     */
    ImagePicker.showImagePicker(options, response => {
      // console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const type = response.type;

        const name = short.generate() + '.' + type.split('/')[1];

        const source = {uri: response.uri, name, type};
        // response.fileName
        // response.type

        console.log(source);
        setAvatarSource(source);

        //----------------------------------
      }
    });
  };

  return (
    <Container>
      <Header title="Profile" navigation={navigation} />
      <View style={[styles.content, {backgroundColor: content}]}>
        <View style={[styles.row2]}>
          <TouchableOpacity style={styles.avatar} onPress={handleAvatar}>
            <Image source={avatarSource} style={styles.avatarImg} />
            <Icon
              type="MaterialIcons"
              name="camera-alt"
              style={[styles.icon, {color: text}]}
            />
          </TouchableOpacity>
        </View>
        <Card>
          <CardItem style={[{backgroundColor: bgCard}]}>
            <Body style={styles.body}>
              <Content>
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
                      secureTextEntry={true}
                      value={password}
                      onChangeText={e => setPassword(e)}
                    />
                  </Item>
                </View>
                <View style={styles.row}>
                  <Item style={styles.item}>
                    <Input
                      placeholder="Confirm Password"
                      placeholderTextColor={placeholder}
                      style={{color: text}}
                      secureTextEntry={true}
                      onChangeText={e => setConfirmation(e)}
                      value={confirmation}
                    />
                  </Item>
                </View>

                <View style={[styles.row, {marginTop: 20}]}>
                  <Button
                    style={[styles.button, {backgroundColor: bgBotton}]}
                    onPress={handleSave}>
                    <Text>Save</Text>
                  </Button>
                </View>
              </Content>
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
    // paddingTop: '25%',
    paddingHorizontal: '3%',
  },
  row: {
    width: vw(81),
    padding: 5,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  row2: {
    alignItems: 'center',
    marginVertical: vh(4),
  },
  button: {
    minWidth: vw(35),
    textAlign: 'center',
    justifyContent: 'center',
  },
  item: {
    width: '100%',
  },
  avatar: {
    backgroundColor: '#E5E5E5',
    width: vw(30),
    height: vw(30),
    borderRadius: 100,
    elevation: 4,
    alignItems: 'flex-end',
  },
  avatarImg: {
    width: vw(30),
    height: vw(30),
    borderRadius: 100,
  },
  icon: {
    position: 'absolute',
    bottom: 0,
    elevation: 5,
    fontSize: 27,
  },
});

export default ProfileScreen;
