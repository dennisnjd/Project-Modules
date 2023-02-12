import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import * as Location from 'expo-location';
// import Map from '../components/mapview';
import MapView,{Marker} from 'react-native-maps';


const App = () => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [mapRegion , setMapRegion] = useState({
    latitude: 40.000,
    longitude: 32.8116347,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
});


  const curLoc=async()=>{
    let acc=0;
    count=1;
  let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      setErrorMsg('Permission to access location was denied');
    }

    let location = await Location.getCurrentPositionAsync({ enableHighAccuracy: true,
      accuracy: Location.Accuracy.High,});
    setLocation(location); 

    setMapRegion({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      latitudeDelta:  0.0922,
      longitudeDelta: 0.0421,
    })
    console.log(location);
  }

  useEffect(() => {
    curLoc();
    let locationSubscription = Location.watchPositionAsync({
      accuracy: Location.Accuracy.High,
      timeInterval: 1000,
      distanceInterval: 1,
    }, location => {
      console.log(location);
      setMapRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta:  0.0922,
        longitudeDelta: 0.0421,
      })
    });
    
  }, []);

  const showmap=()=>{
    console.log("hi")
  
  }

  return (
    <View>
      <Text style={{marginTop:80}}>longitude:{mapRegion.longitude}</Text>
      <Text>latitude:{mapRegion.latitude}</Text>
      <MapView style={styles.map} 
      // mapType={'hybrid'}
       region={mapRegion}>
        <Marker coordinate={mapRegion} title='Marker' />
      </MapView>
         </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
});
export default App;




