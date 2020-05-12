import React, {useState, useEffect, useCallback} from 'react';
import {
  Platform,
  KeyboardAvoidingView,
  SafeAreaView,
  View,
  Alert,
} from 'react-native';
import {GiftedChat} from 'react-native-gifted-chat';
import {useSelector, useDispatch} from 'react-redux';
import userParse from '../utils/userParse';
// import {createMessage, getUser} from '../db/index';
const short = require('short-uuid');
import {vh, vw} from 'react-native-css-vh-vw';
import {useMutation} from '@apollo/react-hooks';
import {MESSAGE_CREATE} from '../graphql/querys';

const mongoose = require('mongoose');

const Chat = ({id}) => {
  const dispatch = useDispatch();

  const {messages: allMessages, user, isConnected} = useSelector(
    state => state.main,
  );
  const {bgCard} = useSelector(state => state.colors);

  const [messages, setMessages] = useState([]);

  const [messagCreate] = useMutation(MESSAGE_CREATE);

  const pushMessages = useCallback(
    data => dispatch({type: 'PUSH_MESSAGES', payload: data}),
    [dispatch],
  );

  useEffect(
    _ => {
      setMessages(allMessages.filter(m => m.chat === id));
    },
    [allMessages],
  );
  const onSend = async messages => {
    messages[0].chat = id;
    pushMessages(messages);

    if (isConnected) {
      // console.log();
      console.log('sending message ------------');
      // console.log(messages[0]);
      const data = {
        _id: messages[0]._id,
        text: messages[0].text,
        user: messages[0].user._id,
        chat: id,
        sent: true,
        pending: false,
        received: false,
        readed: false,
      };

      try {
        const res = await messagCreate({
          variables: {
            token: user.accessToken,
            data,
          },
        });

        console.log('sent');
      } catch (e) {
        Alert.alert('', 'Error to send message 😕');

        console.log('error to send message ->');
        console.log(e);
      }
    }
  };

  const handleTyping = _ => {
    // console.log('typing');
  };

  if (Platform.OS === 'android') {
    return (
      <KeyboardAvoidingView
        style={{flex: 1, backgroundColor: bgCard}}
        // behavior="padding"
        keyboardVerticalOffset={30}
        enabled>
        <GiftedChat
          messages={messages}
          onSend={onSend}
          user={userParse(user)}
          alwaysShowSend
          messageIdGenerator={short.generate}
          onInputTextChanged={handleTyping}
        />
      </KeyboardAvoidingView>
    );
  }
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{width: vw(100), height: vh(91), backgroundColor: bgCard}}>
        <GiftedChat
          messages={messages}
          onSend={onSend}
          user={userParse(user)}
          alwaysShowSend
          messageIdGenerator={mongoose.Types.ObjectId}
          onInputTextChanged={handleTyping}
        />
      </View>
    </SafeAreaView>
  );
};

export default Chat;
