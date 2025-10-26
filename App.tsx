/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import { Provider } from 'react-redux';
import Toast from 'react-native-toast-message';

import store from './src/store';
import AppNavigator from './src/navigation/AppNavigator';

function App() {

  return (
    <Provider store={store} >
      <AppNavigator />
      <Toast />
    </Provider>
  );
}

export default App;
