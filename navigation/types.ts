import { NativeStackNavigationProp } from '@react-navigation/native-stack'

export type RootStackParamList = {
  Home: undefined
  Users: undefined
  Map: {
    latitude: number
    longitude: number
  }
}

export type MapScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Map'
>
