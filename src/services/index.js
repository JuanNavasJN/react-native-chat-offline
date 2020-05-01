import React, {useEffect} from 'react';
// import CheckConnection from './CheckConnection';
import CheckQueue from './CheckQueue';
import {unsubscribe} from './isConnected';
import Messages from './Messages';

const Services = _ => {
  useEffect(_ => {
    return _ => {
      unsubscribe();
      console.log('unsubscribe...');
    };
  }, []);
  return (
    <>
      {/* <CheckConnection /> */}
      {/* <CheckQueue /> */}
      <Messages />
    </>
  );
};

export default Services;
