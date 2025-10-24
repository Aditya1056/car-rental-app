/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet } from 'react-native';

import Tabs from './src/screens/Tabs';

function App() {

  return (
    <SafeAreaView style={styleSheet.containerStyles} >
      <Tabs />
    </SafeAreaView>
  );
}

const styleSheet = StyleSheet.create({
  containerStyles:{
    height: '100%'
  }
});

export default App;
