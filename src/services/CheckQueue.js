import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {realm, updateMessageById} from '../db/index';

const CheckQueue = _ => {
  const [queue, setQueue] = useState(0);

  const {isConnected} = useSelector(state => state.main);

  function listener(messages, changes) {
    setQueue(messages);
  }

  useEffect(_ => {
    let messagesPending = realm.objects('Message').filtered('pending = true');

    messagesPending.addListener(listener);

    return _ => {
      messagesPending.removeListener(listener);
    };
  }, []);

  const sendQueue = async _ => {
    queue.forEach(e => {
      updateMessageById(e._id, {
        sent: true,
        pending: false,
      });
    });
  };

  useEffect(
    _ => {
      if (isConnected === true && queue.length > 0) {
        console.log('send queue');

        sendQueue();
      }
    },
    [isConnected],
  );

  return null;
};

export default CheckQueue;
