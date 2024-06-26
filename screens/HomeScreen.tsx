import React from 'react'
import { Text, Image, StyleSheet, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '../navigation/types'
import { GlobalStyles } from '../constants/styles'
import CustomButton from '../components/CustomButton'

type HomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Home'
>

const HomeScreen = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>()

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Text style={styles.text}>Gili Sinai's Home Assignment</Text>
        <Image
          source={{ uri: 'https://i.ibb.co/Bs2xB7S/beehero-icon.png' }}
          style={styles.img}
        />
      </View>
      <View style={styles.buttonContainer}>
        <CustomButton
          style={styles.button}
          onPress={() => navigation.navigate('Users')}
          title="Enter App"
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 50,
    backgroundColor: GlobalStyles.colors.backgorund
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8
  },
  text: {
    color: GlobalStyles.colors.secondary,
    fontSize: 22
  },
  img: {
    width: 150,
    height: 150,
    borderWidth: 1
  },
  buttonContainer: {
    width: '50%',
    paddingHorizontal: 20,
    paddingBottom: 30
  },
  button: {
    backgroundColor: GlobalStyles.colors.primary,
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    borderWidth: 1
  },
  buttonText: {
    color: GlobalStyles.colors.secondary,
    fontSize: 16
  }
})

export default HomeScreen
