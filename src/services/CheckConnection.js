import React, {useCallback, useEffect} from 'react';
import {useDispatch} from 'react-redux';

import NetInfo from '@react-native-community/netinfo';

const CheckConnection = _ => {
  const dispatch = useDispatch();

  const setStatus = useCallback(
    data => dispatch({type: 'SET_CONNECTION_STATUS', payload: data}),
    [dispatch],
  );

  useEffect(_ => {
    const unsubscribe = NetInfo.addEventListener(state => {
      // console.log('Connection type', state.type);
      // console.log('Is connected?', state.isConnected);
      setStatus(state.isConnected);
    });

    return _ => {
      unsubscribe();
    };
  }, []);
  return null;
};

export default CheckConnection;
