import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { Post } from './types'
import { useDispatch } from 'react-redux'
import { removePost } from '../store/posts'

interface PostCardProps {
  post: Post
  userId: number
}

const PostCard: React.FC<PostCardProps> = ({ post, userId }) => {
  const dispatch = useDispatch()

  const handleRemovePost = () => {
    dispatch(removePost({ userId, postId: post.id }))
  }

  return (
    <TouchableOpacity
      style={styles.card}
      // onPress={onSelect}
    >
      <Text style={styles.title}>{post.title}</Text>
      <Text style={styles.body}>{post.body}</Text>
      <TouchableOpacity style={styles.removeButton} onPress={handleRemovePost}>
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
  title: {
    fontWeight: 'bold',
    fontSize: 10
  },
  body: {
    fontSize: 8
  },
  removeButton: {
    position: 'absolute',
    top: 5,
    right: 5
  },
  removeText: {
    color: 'red'
  }
})

export default PostCard
