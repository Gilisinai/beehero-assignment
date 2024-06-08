import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { MapScreenNavigationProp } from '../navigation/types'
import { User } from './types'
import { GlobalStyles } from '../constants/styles'

interface UserCardProps {
  user: User
  onSelect: () => void
}

const UserCard: React.FC<UserCardProps> = ({ onSelect, user }) => {
  const navigation = useNavigation<MapScreenNavigationProp>()

  const handleCoordinatesClick = () => {
    navigation.navigate('Map', {
      latitude: parseFloat(user.address.geo.lat),
      longitude: parseFloat(user.address.geo.lng)
    })
  }

  return (
    <TouchableOpacity style={styles.card} onPress={onSelect}>
      <Text style={styles.name}>
        {user.name} ({user.username})
      </Text>
      <Text style={styles.innerText}>{user.email}</Text>
      <TouchableOpacity onPress={handleCoordinatesClick}>
        <Text style={styles.coordinates}>
          {user.address.geo.lat}, {user.address.geo.lng}
        </Text>
      </TouchableOpacity>
      <Text style={styles.innerText}>{user.company.name}</Text>
      <TouchableOpacity style={styles.removeButton}>
        <Text style={styles.removeText}>X</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  card: {
    paddingVertical: 14,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginVertical: 5,
    position: 'relative',
    backgroundColor: '#f8f8f8',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 2,
    flex: 1,
    maxWidth: '24%',
    margin: 2
  },
  name: {
    color: GlobalStyles.colors.text,
    fontWeight: 'bold',
    fontSize: 10
  },
  innerText: {
    fontSize: 8,
    color: '#333'
  },
  coordinates: {
    color: 'blue',
    textDecorationLine: 'underline',
    fontSize: 8,
    marginTop: 5
  },
  removeButton: {
    position: 'absolute',
    top: 2,
    right: 2
  },
  removeText: {
    color: 'red',
    fontWeight: 'bold'
  }
})

export default UserCard
