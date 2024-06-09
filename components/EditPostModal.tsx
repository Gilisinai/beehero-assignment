import React, { useState, useEffect, useRef } from 'react'
import { View, Text, TextInput, StyleSheet, Modal } from 'react-native'
import { useDispatch } from 'react-redux'
import { updatePost } from '../store/slices/posts'
import { Post } from './types'
import { GlobalStyles } from '../constants/styles'
import CustomButton from './CustomButton'

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
  const [titleError, setTitleError] = useState('')
  const [bodyError, setBodyError] = useState('')
  const titleInputRef = useRef<TextInput>(null)
  const bodyInputRef = useRef<TextInput>(null)
  const dispatch = useDispatch()

  useEffect(() => {
    if (post) {
      setTitle(post.title)
      setBody(post.body)
      setTitleError('')
      setBodyError('')
    }
  }, [post])

  const handleSave = () => {
    let valid = true
    if (title.trim() === '') {
      setTitleError('Title cannot be empty')
      valid = false
    } else {
      setTitleError('')
    }

    if (body.trim() === '') {
      setBodyError('Body cannot be empty')
      valid = false
    } else {
      setBodyError('')
    }

    if (valid && post) {
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
            ref={titleInputRef}
            style={[styles.input, titleError ? styles.errorInput : null]}
            value={title}
            onChangeText={setTitle}
            placeholder="Title"
            returnKeyType="next"
            onSubmitEditing={() => bodyInputRef.current?.focus()}
          />
          {titleError ? (
            <Text style={styles.errorText}>{titleError}</Text>
          ) : null}
          <TextInput
            ref={bodyInputRef}
            style={[styles.input, bodyError ? styles.errorInput : null]}
            value={body}
            onChangeText={setBody}
            placeholder="Body"
            multiline
            returnKeyType="done"
            onSubmitEditing={handleSave}
          />
          {bodyError ? <Text style={styles.errorText}>{bodyError}</Text> : null}
          <View style={styles.buttonContainer}>
            <CustomButton title="Cancel" onPress={onClose} />
            <CustomButton
              title="Save"
              onPress={handleSave}
              style={{ backgroundColor: GlobalStyles.colors.primary }}
            />
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
  errorInput: {
    borderColor: 'red'
  },
  errorText: {
    color: 'red',
    alignSelf: 'flex-start',
    marginBottom: 10
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%'
  }
})

export default EditPostModal
