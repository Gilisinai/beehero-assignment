import { useEffect, useState } from 'react'
import { StyleSheet, Text, View, FlatList, ScrollView } from 'react-native'
import UserCard from '../components/UserCard'
import { Post, User } from '../components/types'
import PostCard from '../components/PostCard'
import { GlobalStyles } from '../constants/styles'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { RootState } from '../store/rootReducer'
import { fetchUsers } from '../store/users'
import { AppDispatch } from '../store/store'
import { fetchUserPosts } from '../store/posts'
import EditPostModal from '../components/EditPostModal'

const UsersScreen = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { users, selectedUser } = useSelector((state: RootState) => state.users)
  const usersStatus = useSelector((state: RootState) => state.users.status)
  const posts = useSelector((state: RootState) =>
    selectedUser ? state.posts.userPosts[selectedUser.id] || [] : []
  )
  const postsStatus = useSelector((state: RootState) => state.posts.status)
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [editablePost, setEditablePost] = useState<Post | null>(null)

  useEffect(() => {
    if (usersStatus === 'idle') {
      dispatch(fetchUsers())
    }
  }, [usersStatus, dispatch])

  useEffect(() => {
    if (selectedUser && !posts.length) {
      dispatch(fetchUserPosts(selectedUser.id))
    }
  }, [selectedUser, dispatch])

  const handlePostEdit = (post: Post) => {
    setEditablePost(post)
    setIsModalVisible(true)
  }

  const handleModalClose = () => {
    setIsModalVisible(false)
    setEditablePost(null)
  }

  return (
    <ScrollView style={styles.container}>
      {users.length > 0 ? (
        <FlatList
          data={users}
          renderItem={({ item }) => <UserCard user={item} />}
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

      {posts.length > 0 ? (
        <FlatList
          data={posts}
          renderItem={({ item }) => (
            <PostCard
              post={item}
              userId={selectedUser!.id}
              onEdit={() => handlePostEdit(item)}
            />
          )}
          keyExtractor={(item) => item.id.toString()}
          numColumns={4}
          contentContainerStyle={styles.postCardContainer}
        />
      ) : (
        <Text style={styles.noUsersText}>No posts found</Text>
      )}

      {editablePost && selectedUser && (
        <EditPostModal
          post={editablePost}
          userId={selectedUser.id}
          visible={isModalVisible}
          onClose={handleModalClose}
        />
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
