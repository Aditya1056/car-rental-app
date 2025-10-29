/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import { Provider } from 'react-redux';
import Toast from 'react-native-toast-message';

import store from './src/store';
import OnBoarding from './src/screens/OnBoarding';
import { SafeAreaView } from 'react-native-safe-area-context';

function App() {

  return (
    <Provider store={store} >
      <SafeAreaView>
        <OnBoarding />
      </SafeAreaView>
      <Toast />
    </Provider>
  );
}

export default App;
