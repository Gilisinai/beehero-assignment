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
import { conditionalFetchUserPosts, fetchUserPosts } from '../store/posts'
import EditPostModal from '../components/EditPostModal'
import { getUsers, getSelectedUser } from '../store/selectors/userSelectors'
import { getPostsByUserId } from '../store/selectors/postSelectors'
import { useAppSelector } from '../store/hooks/hooks'

const UsersScreen = () => {
  const dispatch = useDispatch<AppDispatch>()
  const users = useAppSelector(getUsers)
  const selectedUser = useAppSelector(getSelectedUser)
  const usersStatus = useAppSelector((state: RootState) => state.users.status)
  const posts = useAppSelector((state: RootState) => state.posts.userPosts)

  const [isModalVisible, setIsModalVisible] = useState(false)
  const [editablePost, setEditablePost] = useState<Post | null>(null)

  useEffect(() => {
    if (usersStatus === 'idle') {
      dispatch(fetchUsers())
    }
  }, [])

  useEffect(() => {
    if (selectedUser) {
      dispatch(conditionalFetchUserPosts(selectedUser.id))
    }
  }, [selectedUser])

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
          scrollEnabled={false}
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

      {selectedUser &&
      posts &&
      Object.keys(posts).length > 0 &&
      posts[selectedUser.id]?.length > 0 ? (
        <FlatList
          data={posts[selectedUser.id]}
          renderItem={({ item }) => (
            <PostCard
              post={item}
              userId={selectedUser!.id}
              onEdit={() => handlePostEdit(item)}
            />
          )}
          keyExtractor={(item) => item.id.toString()}
          numColumns={4}
          scrollEnabled={false}
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
  userCardsContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    flex: 1
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
