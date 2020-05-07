const Realm = require('realm');
// const short = require('short-uuid');

const UserSchema = {
  name: 'User',
  primaryKey: '_id',
  properties: {
    _id: 'string',
    name: 'string',
    username: {type: 'string', indexed: true},
    accessToken: {type: 'string', optional: true},
  },
};

const MessageSchema = {
  name: 'Message',
  primaryKey: '_id',
  properties: {
    _id: 'string',
    text: 'string',
    createdAt: 'string',
    user: 'User',
    received: 'bool',
    sent: 'bool',
    pending: 'bool',
  },
};

const realm = new Realm({schema: [UserSchema, MessageSchema]});

const createUser = user =>
  new Promise((resolve, reject) => {
    realm.write(async () => {
      try {
        // first delete all users

        let allUsers = realm.objects('User');
        realm.delete(allUsers);

        // after insert a user

        let newUser = realm.create('User', {
          // _id: short.generate(),
          _id: user._id,
          name: user.name,
          username: user.username,
          accessToken: user.accessToken,
        });
        resolve(newUser);
      } catch (e) {
        console.log('error to createUser', e);
        reject(e);
      }
    });
  });

const getUser = _ =>
  new Promise((resolve, reject) => {
    realm.write(() => {
      try {
        resolve(realm.objects('User')[0]);
      } catch (e) {
        console.log('error to getUser', e);
        reject(e);
      }
    });
  });

const updateUserById = (id, data) =>
  new Promise((resolve, reject) => {
    realm.write(() => {
      try {
        let user = realm.objects('User').filtered('_id = "' + id + '"')[0];

        for (let key in data) {
          user[key] = data[key];
        }

        resolve(user);
      } catch (e) {
        console.log('error to updateUserById', e);
        reject(e);
      }
    });
  });

const deleteUser = _ =>
  new Promise((resolve, reject) => {
    realm.write(() => {
      try {
        let allUsers = realm.objects('User');
        realm.delete(allUsers);
        resolve();
      } catch (e) {
        console.log('error to getUser', e);
        reject(e);
      }
    });
  });

const createMessage = message =>
  new Promise((resolve, reject) => {
    // console.log('write message');
    realm.write(() => {
      try {
        // console.log('createdAt', String(new Date().getTime()));
        let newMessage = realm.create('Message', {
          // _id: short.generate(),
          _id: message._id,
          text: message.text,
          createdAt: String(new Date().getTime()),
          received: message.received,
          sent: message.sent,
          pending: message.pending,
          user: message.user,
        });
        resolve(newMessage);
      } catch (e) {
        console.log('error to createMessage', e);
        reject(e);
      }
    });
  });

const updateMessageById = (id, data) =>
  new Promise((resolve, reject) => {
    realm.write(() => {
      try {
        let message = realm
          .objects('Message')
          .filtered('_id = "' + id + '"')[0];

        if (typeof data.sent === 'boolean') message.sent = data.sent;

        if (typeof data.pending === 'boolean') message.pending = data.pending;

        if (typeof data.received === 'boolean')
          message.received = data.received;

        resolve(message);
      } catch (e) {
        console.log('error to updateMessageById', e);
        reject(e);
      }
    });
  });

const getAllMessages = _ => {
  return realm.objects('Message');
};

const deleteMessage = message => {
  return realm.write(() => {
    realm.delete(message);
  });
};

const deleteAllMessages = _ => {
  return realm.write(() => {
    realm.delete(getAllMessages());
  });
};

// realm.close();

export {
  realm,
  createMessage,
  getAllMessages,
  deleteAllMessages,
  deleteMessage,
  createUser,
  getUser,
  deleteUser,
  updateUserById,
  updateMessageById,
};
