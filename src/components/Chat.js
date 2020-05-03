import React, {useState, useEffect, useCallback} from 'react';
import {Platform, KeyboardAvoidingView, SafeAreaView, View} from 'react-native';
import {GiftedChat} from 'react-native-gifted-chat';
import {useSelector, useDispatch} from 'react-redux';
import userParse from '../utils/userParse';
// import {createMessage, getUser} from '../db/index';
const short = require('short-uuid');
import {vh, vw} from 'react-native-css-vh-vw';

const Chat = _ => {
  const dispatch = useDispatch();

  const {messages, user} = useSelector(state => state.main);
  const {bgCard} = useSelector(state => state.colors);

  const pushMessages = useCallback(
    data => dispatch({type: 'PUSH_MESSAGES', payload: data}),
    [dispatch],
  );

  const onSend = messages => {
    pushMessages(messages);
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
          messageIdGenerator={short.generate}
          onInputTextChanged={handleTyping}
        />
      </View>
    </SafeAreaView>
  );
};

export default Chat;
