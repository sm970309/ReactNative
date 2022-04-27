import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View style={style.container}>
      <StatusBar style='light'> </StatusBar>
      <View style={style.city}>
        <Text style={style.cityName}>SEOUL</Text>
      </View>
      <View style={style.wether}>
        <View style={style.day}>
          <Text style={style.temp}>27º</Text>
          <Text style={style.description}>Sunny</Text>
        </View>
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1, backgroundColor: 'gold'
  },
  city: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  cityName: {
    fontSize: 68,
    fontWeight: "500"
  },
  wether: {
    flex: 3,
  },
  day: {
    flex: 1,
    alignItems: 'center',
  },
  temp:{
    marginTop:10,
    fontSize:178
  },
  description:{
    marginTop:-30,
    fontSize:48
  }
})