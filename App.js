import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, Text, View, Dimensions } from 'react-native';
import * as Location from "expo-location";
const {width} = Dimensions.get("window")
const API_KEY = '3b4df97acff4c36bc34508cdc46a8704'
export default function App() {
  const [region,setRegion] = useState("Loading...");
  const [days, setDays] = useState([]);
  const [ok,setOk] = useState(true);
  const ask = async() =>{
    const {granted} = await Location.requestForegroundPermissionsAsync();
    if (!granted){
      setOk(false);
    }
    const {coords:{latitude,longitude}} = await Location.getCurrentPositionAsync({accuracy:5})
    const loc = await Location.reverseGeocodeAsync({latitude:latitude,longitude,longitude},{useGoogleMaps:false})
    setRegion(loc[0].region)
    const res = await fetch(`http://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`)
    const json = await res.json();
    setDays(json.daily)
  }
  useEffect(()=>{
    ask();
  },[])
  return (
    <View style={style.container}>
      <StatusBar style='light'> </StatusBar>
      <View style={style.city}>
        <Text style={style.cityName}>{region}</Text>
      </View>
      <ScrollView
        pagingEnabled
        horizontal
        showsHorizontalScrollIndicator ={false}
        contentContainerStyle={style.wether}>
        {days.length ===0 ?(
        <View style={style.day}>
          <ActivityIndicator color="white" size="large"/>
        </View>):(
          days.map((day,index) => (
        <View key = {index} style={style.day}>
        <Text style={style.description}>{day.dt}</Text>
        <Text style={style.temp}>{parseFloat(day.temp.day).toFixed(1)}º</Text>
        <Text style={style.main}>{day.weather[0].main}</Text>
        <Text style={style.description}>{day.weather[0].description}</Text>
        </View>))
        )}
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
    fontSize: 138,
  },
  main: {
    marginTop: -30,
    fontSize: 48
  },
  description:{
    fontSize: 18
  }
})