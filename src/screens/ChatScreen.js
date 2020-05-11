import React, {useEffect} from 'react';
import {Container} from 'native-base';
import Header from '../components/Header';
import Chat from '../components/Chat';

const ChatScreen = ({navigation}) => {
  return (
    <Container>
      <Header
        title={navigation.state.params.chat.name}
        avatar={navigation.state.params.chat.avatar}
        navigation={navigation}
      />
      <Chat />
    </Container>
  );
};

export default ChatScreen;
