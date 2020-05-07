import {createMessage} from '../db/index';

const initialState = {
  isConnected: false,
  messagesQueue: [],
  user: undefined,
  isLogged: false,
  messages: [
    // {
    //   _id: 'qweqweqweq',
    //   text: 'message 1',
    //   createdAt: new Date(),
    //   received: false,
    //   sent: false,
    //   pending: false,
    //   user: {
    //     _id: 'vrsVmSkschXWxGMT1uuNXq',
    //     name: 'Juan Navas',
    //     username: 'jn',
    //   },
    // },
  ],
};

const PUSH_MESSAGES = (state, action) => {
  const newMessages = action.payload;
  let {messages, messagesQueue, user, isConnected} = state;

  for (let message of newMessages) {
    message.user = user;
    // message.received = true;
    // message.sent = true;
    message.readed = true;
    // If it is connected then save to DB a send to server
    if (isConnected) {
      console.log('connected');
      message.sent = true;
      message.received = false;
      message.pending = false;
      createMessage(message);
    } else {
      message.sent = false;
      message.received = false;
      message.pending = true;
      // else save to DB and push to messages queue on DB
      createMessage(message);
      console.log('not connected');
    }
  }
  return {...state};
};

export default (state = initialState, {type, ...action}) => {
  switch (type) {
    case 'PUSH_MESSAGES':
      return PUSH_MESSAGES(state, action);
    case 'SET_MESSAGES':
      return {...state, messages: action.payload};
    case 'SET_CONNECTION_STATUS':
      return {...state, isConnected: action.payload};
    case 'SET_MESSAGES_QUEUE':
      return {...state, messagesQueue: action.payload};
    case 'SET_IS_LOGGED':
      return {...state, isLogged: action.payload};
    case 'SET_USER':
      // console.log('SET_USER', action.payload);
      return {...state, user: action.payload};
    default:
      return state;
  }
};
