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
  gameboard: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  gameinfo: {
    backgroundColor: '#fff',
    textAlign: 'center',
    justifyContent: 'center',
    fontSize: 20,
    marginTop: 10,
  },
  bonusinfo: {
    backgroundColor: '#fff',
    textAlign: 'center',
    justifyContent: 'center',
    fontSize: 15,
    marginTop: 5,
    marginBottom: 5,
  },
  row: {
    marginTop: 20,
    padding: 10,
  },
  flex: {
    flexDirection: "row",
  },
  button: {
    margin: 30,
    flexDirection: "row",
    padding: 10,
    backgroundColor: "#deb887",
    width: 150,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: "#808000",
    fontSize: 20,
  },
  points: {
    textAlign: 'center',
    justifyContent: 'center',
  }

});