import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { FontAwesome } from '@expo/vector-icons'
import { MapScreenNavigationProp } from '../navigation/types'
import { User } from './types'
import { GlobalStyles } from '../constants/styles'
import { useDispatch } from 'react-redux'
import { removeUser, selectUser } from '../store/slices/users'

interface UserCardProps {
  user: User
}

const UserCard: React.FC<UserCardProps> = React.memo(({ user }) => {
  const navigation = useNavigation<MapScreenNavigationProp>()
  const dispatch = useDispatch()

  const handleCoordinatesClick = () => {
    navigation.navigate('Map', {
      latitude: parseFloat(user.address.geo.lat),
      longitude: parseFloat(user.address.geo.lng)
    })
  }

  const handleRemoveUser = () => {
    dispatch(removeUser(user.id))
  }

  const handleSelectUser = () => {
    dispatch(selectUser(user))
  }

  return (
    <TouchableOpacity style={styles.card} onPress={handleSelectUser}>
      <View style={styles.header}>
        <Text numberOfLines={1} ellipsizeMode="tail" style={styles.name}>
          {user.name}
        </Text>
        <TouchableOpacity
          style={styles.removeButton}
          onPress={handleRemoveUser}
        >
          <FontAwesome name="trash" size={16} color="red" />
        </TouchableOpacity>
      </View>
      <Text style={styles.username}>@{user.username}</Text>
      <Text style={styles.innerText}>{user.email}</Text>
      <TouchableOpacity
        onPress={handleCoordinatesClick}
        style={styles.coordinatesContainer}
      >
        <FontAwesome name="map-marker" size={14} color="blue" />
        <Text style={styles.coordinates}>
          {user.address.geo.lat}, {user.address.geo.lng}
        </Text>
      </TouchableOpacity>
      <Text style={styles.innerText}>{user.company.name}</Text>
    </TouchableOpacity>
  )
})

const styles = StyleSheet.create({
  card: {
    paddingVertical: 14,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginVertical: 5,
    position: 'relative',
    backgroundColor: GlobalStyles.colors.primary,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 2,
    flex: 1,
    maxWidth: '48%',
    margin: 4
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  name: {
    color: GlobalStyles.colors.secondary,
    fontWeight: 'bold',
    fontSize: 14,
    maxWidth: '90%'
  },
  username: {
    color: '#666',
    fontSize: 12,
    marginBottom: 5
  },
  innerText: {
    fontSize: 12,
    color: '#333',
    marginBottom: 5
  },
  coordinatesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5
  },
  coordinates: {
    color: 'blue',
    textDecorationLine: 'underline',
    fontSize: 12,
    marginLeft: 5
  },
  removeButton: {
    position: 'absolute',
    top: 0,
    right: 0
  }
})

export default UserCard
