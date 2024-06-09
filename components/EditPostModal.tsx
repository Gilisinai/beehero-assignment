// components/EditPostModal.tsx
import React, { useState, useEffect } from 'react'
import { View, Text, TextInput, Button, StyleSheet, Modal } from 'react-native'
import { useDispatch } from 'react-redux'
import { updatePost } from '../store/posts'
import { Post } from './types'
import { GlobalStyles } from '../constants/styles'

interface EditPostModalProps {
  post: Post | null
  userId: number
  visible: boolean
  onClose: () => void
}

const EditPostModal: React.FC<EditPostModalProps> = ({
  post,
  userId,
  visible,
  onClose
}) => {
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const dispatch = useDispatch()

  useEffect(() => {
    if (post) {
      setTitle(post.title)
      setBody(post.body)
    }
  }, [post])

  const handleSave = () => {
    if (post) {
      dispatch(updatePost({ userId, postId: post.id, title, body }))
      onClose()
    }
  }

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.title}>Edit Post</Text>
          <TextInput
            style={styles.input}
            value={title}
            onChangeText={setTitle}
            placeholder="Title"
          />
          <TextInput
            style={styles.input}
            value={body}
            onChangeText={setBody}
            placeholder="Body"
            multiline
          />
          <View style={styles.buttonContainer}>
            <Button title="Save" onPress={handleSave} />
            <Button title="Cancel" onPress={onClose} />
          </View>
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },
  modalContent: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center'
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10
  },
  input: {
    width: '100%',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%'
  }
})

export default EditPostModal
