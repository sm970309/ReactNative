import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { Image, ActivityIndicator, ScrollView, StyleSheet, Text, View, Dimensions } from 'react-native';
import * as Location from "expo-location";

const {width} = Dimensions.get("window")
const API_KEY = '3b4df97acff4c36bc34508cdc46a8704'

export default function App() {
  const [region,setRegion] = useState("Loading...");
  const [district,setDistrict] = useState('');
  const [days, setDays] = useState([]);

  const ask = async() =>{
    await Location.requestForegroundPermissionsAsync();
    const {coords:{latitude,longitude}} = await Location.getCurrentPositionAsync({accuracy:5})
    const loc = await Location.reverseGeocodeAsync({latitude:latitude,longitude,longitude},{useGoogleMaps:false})
    setRegion(loc[0].region)
    setDistrict(loc[0].district)
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
        <Text style={style.district}>{district}</Text>
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
        <View key = {index} style={style.day} >
        <View style={{flexDirection:'row' ,alignItems:'center', justifyContent:'center',}}>
          <Image style={style.icon} source = {{ uri: `http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}} />
          <Text style={style.date}>{day.dt}</Text>
        </View> 
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
  district: {
    color:'white',
    fontSize: 28,
    fontWeight: "500"
  },
  wether: {
    
  },
  date:{
    flex:1,
    color:'white',
    fontSize: 18,
  },
  day: {
    flex: 1,
    width: width,
  },
  temp: {
    color:'white',
    fontSize: 108,
    marginLeft:20,
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
  },
  icon:{
    width:100,
    height:100,
    marginLeft:20
  }
})