import { StatusBar } from 'expo-status-bar';
import { ScrollView, StyleSheet, Text, View, Dimensions } from 'react-native';

const { height, width } = Dimensions.get("window")

export default function App() {
  return (
    <View style={style.container}>
      <StatusBar style='light'> </StatusBar>
      <View style={style.city}>
        <Text style={style.cityName}>SEOUL</Text>
      </View>
      <ScrollView
        pagingEnabled
        horizontal
        showsHorizontalScrollIndicator ={false}
        contentContainerStyle={style.wether}>
        <View style={style.day}>
          <Text style={style.temp}>27º</Text>
          <Text style={style.description}>Sunny</Text>
        </View>
        <View style={style.day}>
          <Text style={style.temp}>29º</Text>
          <Text style={style.description}>Cloudy</Text>
        </View>
        <View style={style.day}>
          <Text style={style.temp}>22º</Text>
          <Text style={style.description}>Rain</Text>
        </View>
        <View style={style.day}>
          <Text style={style.temp}>17º</Text>
          <Text style={style.description}>Snow</Text>
        </View>

      </ScrollView>
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
    alignItems: 'center',
  },
  cityName: {
    fontSize: 68,
    fontWeight: "500"
  },
  wether: {

  },
  day: {
    flex: 1,
    width: width,
    alignItems: 'center',

  },
  temp: {
    marginTop: 10,
    fontSize: 178,
  },
  description: {
    marginTop: -30,
    fontSize: 48
  }
})