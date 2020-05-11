import React, {useState, useEffect} from 'react';
import {Container, Card, CardItem, Text} from 'native-base';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
} from 'react-native';
import {vh, vw} from 'react-native-css-vh-vw';
import {useSelector} from 'react-redux';
import {GET_CHATS} from '../graphql/querys';
import {useLazyQuery} from '@apollo/react-hooks';

import Header from '../components/Header';

const ChatsScreen = ({navigation}) => {
  const [chats, setChats] = useState([]);
  const {content, bgCard, text} = useSelector(state => state.colors);
  const [token, setToken] = useState('');
  const {user} = useSelector(state => state.main);

  const [getChats, {called, loading, data: response}] = useLazyQuery(
    GET_CHATS,
    {
      variables: {token},
    },
  );

  useEffect(() => {
    // let newChats = [];
    // for (let i = 0; i < 15; i++) {
    //   newChats.push({
    //     name: 'ss',
    //   });
    // }
    // setChats(newChats);
  }, []);

  useEffect(
    _ => {
      if (token !== '') {
        getChats();
      }
    },
    [token],
  );

  useEffect(
    _ => {
      if (response !== undefined) {
        const data = response.getChats.data;
        // console.log(data[0]);
        setChats(
          data.map(e => ({
            name: e.name,
            avatar: e.avatar,
          })),
        );
      }
    },
    [response],
  );

  useEffect(
    _ => {
      if (user && typeof user.accessToken === 'string') {
        setToken(user.accessToken);
      }
    },
    [user],
  );

  return (
    <Container>
      <Header title="Chats" navigation={navigation} />
      <View style={[styles.content, {backgroundColor: content}]}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={chats}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item}) => (
            <TouchableOpacity
              activeOpacity={0.4}
              onPress={_ => navigation.navigate('Chat', {chat: item})}>
              <Card>
                <CardItem style={[{backgroundColor: bgCard}]}>
                  <View style={styles.avatar}>
                    <Image source={{uri: item.avatar}} style={styles.avatar} />
                  </View>
                  <View>
                    <View style={styles.line}>
                      <Text style={[{color: text}]}>{item.name}</Text>
                      {/* <View style={styles.status} /> */}
                    </View>
                    {/* <View>
                      <Text style={styles.typing}>Typing...</Text>
                    </View> */}
                  </View>
                  {/* <View style={styles.counter}>
                    <Text style={styles.counterText}>17</Text>
                  </View> */}
                </CardItem>
              </Card>
            </TouchableOpacity>
          )}
        />
        {/* {chats} */}
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  content: {
    height: '100%',
    // paddingTop: '25%',
    paddingHorizontal: '3%',
  },
  avatar: {
    backgroundColor: '#ccc',
    width: vw(15),
    height: vw(15),
    borderRadius: 100,
  },
  status: {
    backgroundColor: '#57B640',
    borderRadius: 100,
    width: vw(3),
    height: vw(3),
    marginLeft: vw(3),
  },
  line: {
    flexDirection: 'row',
    marginLeft: vw(10),
    alignItems: 'center',
  },
  typing: {
    fontSize: 8,
    textAlign: 'center',
    marginLeft: vw(5),
    color: '#999999',
  },
  counter: {
    backgroundColor: '#C4C4C4',
    position: 'absolute',
    bottom: vw(2),
    right: vw(2),
    borderRadius: 100,
    padding: 3,
  },
  counterText: {
    fontSize: 10,
    color: '#444',
  },
});

export default ChatsScreen;
