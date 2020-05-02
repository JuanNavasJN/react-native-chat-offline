import React, {useEffect} from 'react';
import CheckConnection from './CheckConnection';
import CheckQueue from './CheckQueue';
import Messages from './Messages';

const Services = _ => {
  return (
    <>
      <CheckConnection />
      <CheckQueue />
      <Messages />
    </>
  );
};

export default Services;
