import { NativeModules, Platform } from 'react-native';
const { SecureWindow } = NativeModules;

const setSecure = (enabled: boolean) => {
  if (Platform.OS === 'android' && SecureWindow && SecureWindow.setSecure) {
    SecureWindow.setSecure(enabled);
  }
}

export default setSecure;