import React, {useState, useEffect} from 'react';
import {Container, Card, CardItem, Text} from 'native-base';
import {View, StyleSheet, TouchableOpacity, FlatList} from 'react-native';
import {vh, vw} from 'react-native-css-vh-vw';

import Header from '../components/Header';

const ChatsScreen = ({navigation}) => {
  const [chats, setChats] = useState([]);

  useEffect(() => {
    let newChats = [];

    for (let i = 0; i < 15; i++) {
      newChats.push({
        name: 'ss',
      });
    }

    setChats(newChats);
  }, []);
  return (
    <Container>
      <Header title="Chats" navigation={navigation} />
      <View style={styles.content}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={chats}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item}) => (
            <TouchableOpacity
              activeOpacity={0.4}
              onPress={_ => navigation.navigate('Chat')}>
              <Card>
                <CardItem>
                  <View style={styles.avatar} />
                  <View>
                    <View style={styles.line}>
                      <Text>John Doe</Text>
                      <View style={styles.status} />
                    </View>
                    <View>
                      <Text style={styles.typing}>Typing...</Text>
                    </View>
                  </View>
                  <View style={styles.counter}>
                    <Text style={styles.counterText}>17</Text>
                  </View>
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
  body: {height: 210, width: 500},
  content: {
    backgroundColor: '#fafafa',
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