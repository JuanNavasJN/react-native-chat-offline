import {createMessage} from '../db/index';

const initialState = {
  isConnected: false,
  messagesQueue: [],
  user: {},
  messages: [
    // {
    //   _id: 'qweqweqweq',
    //   text: 'message 1',
    //   createdAt: new Date(),
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
  // console.log('newMessages', newMessages);
  let {messages, messagesQueue, user} = state;

  for (let message of newMessages) {
    // console.log('mess', message);
    message.user = user;
    createMessage(message);
  }
  console.log('messageCreated...');
  // console.log('messages: ', messages);
  // console.log('user: ', user);
  return {...state, user, messages, messagesQueue};
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
    case 'SET_USER':
      // console.log('SET_USER', action.payload);
      return {...state, user: action.payload};
    default:
      return state;
  }
};
