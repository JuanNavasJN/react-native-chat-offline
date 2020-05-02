import React, {useEffect, useCallback} from 'react';
import {getAllMessages} from '../db/index';
import messageParse from '../utils/messageParse';
import {useDispatch} from 'react-redux';
import {realm} from '../db/index';

const Messages = _ => {
  const dispatch = useDispatch();

  const setMessages = useCallback(
    data => dispatch({type: 'SET_MESSAGES', payload: data}),
    [dispatch],
  );

  function listener(messages, changes) {
    fetchMessages();
    // Update UI in response to inserted objects
    // changes.insertions.forEach(index => {
    //   let insertedMessage = messages[index];
    //   console.log('insertedMessage', insertedMessage);
    //   fetchMessages();
    // });

    // Update UI in response to modified objects
    // changes.modifications.forEach(index => {
    //   let modifiedMessage = messages[index];
    //   console.log('modifiedMessage', modifiedMessage);
    //   fetchMessages()
    // });

    // Update UI in response to deleted objects
    // changes.deletions.forEach((index) => {
    //   // Deleted objects cannot be accessed directly
    //   // Support for accessing deleted objects coming soon...

    // });
  }

  // Get all messages from DB
  const fetchMessages = _ => {
    let all = getAllMessages();

    if (all && all.length > 0) {
      let newMessages = [];
      all.forEach(e => {
        newMessages.push(messageParse(e));
      });

      setMessages(newMessages.reverse());
    } else {
      setMessages([]);
    }
  };

  useEffect(_ => {
    fetchMessages();
    //-------------------------------------------
    // Listening Messages changes on DB
    let messagesDB = realm.objects('Message');
    messagesDB.addListener(listener);

    return _ => {
      messagesDB.removeListener(listener);
    };

    //---------------------------------------
  }, []);
  return null;
};

export default Messages;
