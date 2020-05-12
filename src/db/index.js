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
    avatar: {type: 'string', optional: true},
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
    chat: 'string',
    received: 'bool',
    sent: 'bool',
    pending: 'bool',
    readed: 'bool',
  },
};

const SettingSchema = {
  name: 'Setting',
  properties: {
    darkMode: {type: 'bool', optional: true},
  },
};

const realm = new Realm({schema: [UserSchema, MessageSchema, SettingSchema]});

const getSetting = _ => realm.objects('Setting')[0];

// const getSetting = _ =>
//   new Promise((resolve, reject) => {
//     realm.write(async () => {
//       let setting = realm.objects('Setting');
//       await realm.delete(setting);
//       // setting = await realm.objects('Setting');
//       resolve(null);
//     });
//   });

const updateSetting = (key, value) =>
  new Promise((resolve, reject) => {
    realm.write(async () => {
      try {
        let setting = realm.objects('Setting');
        let newSetting;
        if (setting.length === 0) {
          newSetting = realm.create('Setting', {
            [key]: value,
          });
        } else {
          newSetting = setting[0];
          newSetting[key] = value;
        }
        // console.log('setting', newSetting);
        resolve(newSetting);
      } catch (e) {
        console.log('error to updateSetting', e);
        reject(e);
      }
    });
  });

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
          avatar: user.avatar,
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
          chat: message.chat,
          createdAt: String(new Date().getTime()),
          received: message.received,
          readed: message.readed,
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

        if (typeof data.readed === 'boolean') message.readed = data.readed;

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
  updateSetting,
  getSetting,
};
