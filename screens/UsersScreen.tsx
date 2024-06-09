import { useEffect, useState } from 'react'
import { StyleSheet, Text, View, FlatList, ScrollView } from 'react-native'
import { getUserPosts, getUsers } from '../services/api'
import UserCard from '../components/UserCard'
import { Post, User } from '../components/types'
import PostCard from '../components/PostCard'
import { GlobalStyles } from '../constants/styles'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { RootState } from '../store/rootReducer'
import { fetchUsers } from '../store/users'
import { AppDispatch } from '../store/store'

const UsersScreen = () => {
  const dispatch = useDispatch<AppDispatch>()
  const users = useSelector((state: RootState) => state.users.users)
  const usersStatus = useSelector((state: RootState) => state.users.status)
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [userPosts, setUserPosts] = useState<Post[]>([])

  useEffect(() => {
    if (usersStatus === 'idle') {
      dispatch(fetchUsers())
    }
  }, [usersStatus, dispatch])

  const fetchUserPosts = async (userId: number) => {
    try {
      const response = await getUserPosts(userId)
      setUserPosts(response.data)
    } catch (error) {
      console.error('Failed to fetch user posts:', error)
    }
  }

  const handleUserSelect = (user: User) => {
    setSelectedUser(user)
    fetchUserPosts(user.id)
  }

  return (
    <ScrollView style={styles.container}>
      {users.length > 0 ? (
        <FlatList
          data={users}
          renderItem={({ item }) => (
            <UserCard onSelect={() => handleUserSelect(item)} user={item} />
          )}
          keyExtractor={(item) => item.id.toString()}
          numColumns={4}
          contentContainerStyle={styles.userCardContainer}
          ListFooterComponent={
            selectedUser && (
              <>
                <Text style={styles.title}>{selectedUser.name}'s Posts</Text>
              </>
            )
          }
        />
      ) : (
        <Text style={styles.noUsersText}>No users found</Text>
      )}

      {userPosts.length > 0 ? (
        <FlatList
          data={userPosts}
          renderItem={({ item }) => <PostCard post={item} />}
          keyExtractor={(item) => item.id.toString()}
          numColumns={4}
          contentContainerStyle={styles.postCardContainer}
        />
      ) : (
        <Text style={styles.noUsersText}>No posts found</Text>
      )}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: GlobalStyles.colors.primary,
    padding: 10
  },
  userCardContainer: {
    paddingBottom: 10
  },
  postCardContainer: {
    paddingBottom: 40
  },
  noUsersText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10
  }
})

export default UsersScreen
