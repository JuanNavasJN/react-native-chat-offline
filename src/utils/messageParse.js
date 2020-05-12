import userParse from './userParse';
const moment = require('moment');

const messageParse = message => {
  let user = null;

  if (message.user) {
    user = userParse(message.user);
  }

  let date = moment.unix(Number(message.createdAt) / 1000);

  return {
    _id: message._id,
    text: message.text,
    createdAt: date,
    sent: message.sent,
    pending: message.pending,
    received: message.received,
    readed: message.readed,
    chat: message.chat,
    user,
  };
};

export default messageParse;
