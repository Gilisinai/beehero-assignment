// components/CustomButton.tsx
import React from 'react'
import { TouchableOpacity, Text, StyleSheet, ViewStyle } from 'react-native'

interface CustomButtonProps {
  title: string
  onPress: () => void
  style?: ViewStyle
}

const CustomButton: React.FC<CustomButtonProps> = ({
  title,
  onPress,
  style
}) => {
  return (
    <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'white',
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
    marginHorizontal: 5
  },
  buttonText: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold'
  }
})

export default CustomButton
