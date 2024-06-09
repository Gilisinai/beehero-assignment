import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { FontAwesome } from '@expo/vector-icons'
import { useDispatch } from 'react-redux'
import { removePost } from '../store/posts'
import { Post } from './types'
import { GlobalStyles } from '../constants/styles'

interface PostCardProps {
  post: Post
  userId: number
  onEdit: () => void
}

const PostCard: React.FC<PostCardProps> = React.memo(
  ({ post, userId, onEdit }) => {
    const dispatch = useDispatch()

    const handleRemovePost = () => {
      dispatch(removePost({ userId, postId: post.id }))
    }

    return (
      <TouchableOpacity style={styles.card} onPress={onEdit}>
        <View style={styles.header}>
          <Text numberOfLines={1} style={styles.title}>
            {post.title}
          </Text>
          <TouchableOpacity
            style={styles.removeButton}
            onPress={handleRemovePost}
          >
            <FontAwesome name="trash" size={16} color="red" />
          </TouchableOpacity>
        </View>
        <Text ellipsizeMode="tail" numberOfLines={5} style={styles.body}>
          {post.body}
        </Text>
      </TouchableOpacity>
    )
  }
)

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
    alignItems: 'center',
    marginBottom: 10
  },
  title: {
    fontWeight: 'bold',
    fontSize: 14,
    color: GlobalStyles.colors.secondary
  },
  body: {
    fontSize: 12,
    color: '#333'
  },
  removeButton: {
    position: 'absolute',
    top: 0,
    right: 0
  }
})

export default PostCard
