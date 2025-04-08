import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';

export default function App() {
  const [myLocation, setMyLocation] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') return;

      let location = await Location.getCurrentPositionAsync({});
      setMyLocation(location.coords);
    })();
  }, []);

  const handleMapPress = () => {
    setMessage('테스트중');
  };

  return (
    <View style={styles.container}>
      {/* 상단에 메시지 출력 */}
      <View style={styles.messageBox}>
        <Text style={styles.messageText}>{message}</Text>
      </View>

      <MapView
        style={styles.map}
        onPress={handleMapPress}
        region={{
          latitude: myLocation?.latitude || 37.5665,
          longitude: myLocation?.longitude || 126.9780,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      >
        {myLocation && (
          <Marker
            coordinate={myLocation}
            title="나의 위치"
          />
        )}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  messageBox: {
    position: 'absolute',
    top: 50,
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 10,
  },
  messageText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'tomato',
  },
  map: {
    flex: 1,
  },
});
