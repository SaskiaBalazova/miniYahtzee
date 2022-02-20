import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
import styles from './style/Styles';
import Header from './components/Header';
import Footer from './components/Footer';

export default function App() {
  return (
    <View style={styles.container}>
      <Header />
      <Text>Open up App.js to start working on your app!</Text>
      <Footer />
      <StatusBar style="auto" />
    </View>
  );
}

