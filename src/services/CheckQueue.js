import React, {useEffect, useCallback} from 'react';
import {useSelector, useDispatch} from 'react-redux';

const CheckQueue = _ => {
  const dispatch = useDispatch();

  const {messagesQueue, isConnected} = useSelector(state => state.main);

  const setQueue = useCallback(
    data => dispatch({type: 'SET_MESSAGES_QUEUE', payload: data}),
    [dispatch],
  );

  useEffect(
    _ => {
      console.log('new change on queue');
      console.log(messagesQueue);
    },
    [messagesQueue],
  );

  useEffect(
    _ => {
      if (isConnected && messagesQueue.length > 0) {
        console.log('send queue');
        console.log(messagesQueue);
        setQueue([]);
      }
    },
    [isConnected],
  );

  return null;
};

export default CheckQueue;
