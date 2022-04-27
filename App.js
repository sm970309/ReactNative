import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, Text, View, Dimensions } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import * as Location from "expo-location";

const {width} = Dimensions.get("window")
const API_KEY = '3b4df97acff4c36bc34508cdc46a8704'
const icon ={
  "Clouds":"md-cloudy-outline",
  "Clear":"md-sunny-outline",
  "Rain":"rainy-outline"
}


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
    console.log(days)
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
        <Ionicons style={{marginLeft:20}} name={icon[day.weather[0].main]} size={36} color="white" />
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
    color:'white',
    fontSize: 68,
    fontWeight: "500"
  },
  wether: {
    
  },
  day: {
    flex: 1,
    width: width,

  },
  temp: {
    color:'white',
    marginTop: 10,
    fontSize: 108,
    marginLeft:20
  },
  main: {
    color:'white',
    marginTop: -30,
    fontSize: 48,
    marginLeft:20
  },
  description:{
    color:'white',
    fontSize: 18,
    marginLeft:20
  }
})