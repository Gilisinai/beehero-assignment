import { useEffect, useState } from 'react'
import { StyleSheet, Text, View, FlatList } from 'react-native'
import { getUsers } from '../services/api'
import UserCard from '../components/UserCard'
import { User } from '../components/types'

const UsersScreen = () => {
  const [users, setUsers] = useState<User[]>([])

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    try {
      const response = await getUsers()
      setUsers(response.data)
    } catch (error) {
      console.error('Failed to fetch users:', error)
    }
  }

  return (
    <View style={styles.container}>
      {users.length > 0 ? (
        <FlatList
          data={users}
          renderItem={({ item }) => <UserCard user={item} />}
          keyExtractor={(item) => item.id.toString()}
          numColumns={4}
          contentContainerStyle={styles.userCardContainer}
        />
      ) : (
        <Text style={styles.noUsersText}>No users found</Text>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10
  },
  userCardContainer: {
    paddingVertical: 10
  },
  noUsersText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16
  }
})

export default UsersScreen
