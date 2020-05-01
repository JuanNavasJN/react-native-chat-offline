import NetInfo from '@react-native-community/netinfo';

global.isConnected = false;

const unsubscribe = NetInfo.addEventListener(state => {
  // console.log('Connection type', state.type);
  // console.log('Is connected?', state.isConnected);
  global.isConnected = state.isConnected;
});
// unsubscribe();

export {unsubscribe};
