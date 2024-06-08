import React from 'react'
import { View, StyleSheet, Image } from 'react-native'
import MapView, { Marker } from 'react-native-maps'
import { RouteProp, useRoute } from '@react-navigation/native'

type RootStackParamList = {
  Map: {
    latitude: number
    longitude: number
  }
}

type MapScreenRouteProp = RouteProp<RootStackParamList, 'Map'>

const MapScreen: React.FC = () => {
  const route = useRoute<MapScreenRouteProp>()
  const { latitude, longitude } = route.params

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude,
          longitude,
          latitudeDelta: 20,
          longitudeDelta: 20
        }}
      >
        <Marker coordinate={{ latitude, longitude }}>
          <Image
            source={{ uri: 'https://i.ibb.co/Bs2xB7S/beehero-icon.png' }}
            style={styles.marker}
          />
        </Marker>
      </MapView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  map: {
    ...StyleSheet.absoluteFillObject
  },
  marker: {
    width: 50,
    height: 50
  }
})

export default MapScreen
