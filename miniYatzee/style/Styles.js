import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
      marginTop: 30,
      backgroundColor: '#deb887',
      flexDirection: 'row',
  },
  title: {
      color: '#808000',
      fontWeight: 'bold',
      flex: 1,
      fontSize: 23,
      textAlign: 'center',
      margin: 10,
  },
  footer: {
      marginTop: 20,
      backgroundColor: '#deb887',
      flexDirection: 'row',
  },
  author: {
      color: '#808000',
      fontWeight: 'bold',
      flex: 1,
      fontSize: 15,
      textAlign: 'center',
      margin: 10,
  },
});