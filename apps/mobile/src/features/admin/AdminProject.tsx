import React, { useState } from 'react'
import {
  View, Text, FlatList, TouchableOpacity, TextInput, StyleSheet, useColorScheme,
  ActivityIndicator, Alert, Modal, ScrollView, Image,
} from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons'
import { useGetProjectQuery, useAddProjectMutation, useUpdateProjectMutation, useDeleteProjectMutation } from '../../../redux/apis/project.api'
import { colors, spacing, fontSize, borderRadius } from '../../styles/theme'
import { useNavigation } from '@react-navigation/native'
import Toast from 'react-native-toast-message'
import * as ImagePicker from 'expo-image-picker'

const AdminProject = () => {
  const { data, isLoading } = useGetProjectQuery()
  const [addProject] = useAddProjectMutation()
  const [updateProject] = useUpdateProjectMutation()
  const [deleteProject] = useDeleteProjectMutation()
  const { goBack } = useNavigation()
  const theme = useColorScheme()
  const isDark = theme === 'dark'
  const c = isDark ? colors.dark : colors.light

  const [modal, setModal] = useState(false)
  const [editId, setEditId] = useState<number | undefined>(undefined)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [gitLink, setGitLink] = useState('')
  const [liveLink, setLiveLink] = useState('')
  const [imageUri, setImageUri] = useState<string | null>(null)

  const handleDelete = (id: number | undefined) => {
    if (id === undefined) return
    Alert.alert('Delete', 'Are you sure?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Delete', style: 'destructive', onPress: () => deleteProject({ id }) },
    ])
  }

  const openAdd = () => {
    setEditId(undefined)
    setTitle('')
    setDescription('')
    setGitLink('')
    setLiveLink('')
    setImageUri(null)
    setModal(true)
  }

  const openEdit = (item: any) => {
    setEditId(item.id)
    setTitle(item.title || '')
    setDescription(item.description || '')
    setGitLink(item.gitLink || '')
    setLiveLink(item.liveLink || '')
    setImageUri(null)
    setModal(true)
  }

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({ mediaTypes: ['images'], quality: 0.8 })
    if (!result.canceled) setImageUri(result.assets[0].uri)
  }

  const handleSubmit = async () => {
    if (!title.trim()) { Toast.show({ type: 'error', text1: 'Title is required' }); return }
    const fd = new FormData()
    fd.append('title', title)
    fd.append('description', description)
    fd.append('gitLink', gitLink)
    fd.append('liveLink', liveLink)
    if (imageUri) {
      const filename = imageUri.split('/').pop() || 'photo.jpg'
      const ext = filename.split('.').pop() || 'jpg'
      fd.append('projectImage', { uri: imageUri, name: filename, type: `image/${ext}` } as any)
    }
    try {
      if (editId) {
        await updateProject({ id: editId, fd }).unwrap()
        Toast.show({ type: 'success', text1: 'Project updated' })
      } else {
        await addProject(fd).unwrap()
        Toast.show({ type: 'success', text1: 'Project added' })
      }
      setModal(false)
    } catch {
      Toast.show({ type: 'error', text1: editId ? 'Failed to update' : 'Failed to add' })
    }
  }

  return (
    <View style={[styles.container, { backgroundColor: c.background }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={goBack}><Ionicons name="arrow-back" size={28} color={c.text} /></TouchableOpacity>
        <Text style={[styles.title, { color: c.text }]}>Manage Projects</Text>
        <TouchableOpacity onPress={openAdd}>
          <Ionicons name="add" size={28} color={c.primary} />
        </TouchableOpacity>
      </View>

      {isLoading ? (
        <View style={styles.center}><ActivityIndicator size="large" color={c.primary} /></View>
      ) : (
        <FlatList
          data={data?.result || []}
          keyExtractor={(item: any) => item.id?.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity style={[styles.card, { backgroundColor: c.card, borderColor: c.border }]} onPress={() => openEdit(item)}>
              {item.projectImage && <Image source={{ uri: item.projectImage }} style={styles.thumb} />}
              <View style={{ flex: 1 }}>
                <Text style={[styles.itemTitle, { color: c.text }]}>{item.title}</Text>
                <Text style={[styles.itemDesc, { color: c.secondary }]} numberOfLines={2}>{item.description}</Text>
              </View>
              <TouchableOpacity onPress={() => handleDelete(item.id)} style={styles.actionBtn}>
                <Ionicons name="trash-outline" size={20} color={c.danger} />
              </TouchableOpacity>
            </TouchableOpacity>
          )}
          ListEmptyComponent={<Text style={[styles.empty, { color: c.secondary }]}>No projects yet</Text>}
        />
      )}

      <Modal visible={modal} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <ScrollView contentContainerStyle={[styles.modalContent, { backgroundColor: c.card }]}>
            <Text style={[styles.modalTitle, { color: c.text }]}>{editId ? 'Edit Project' : 'Add Project'}</Text>
            <TextInput style={[styles.input, { backgroundColor: isDark ? '#1e293b' : '#f1f5f9', color: c.text, borderColor: c.border }]} placeholder="Title" placeholderTextColor={c.secondary} value={title} onChangeText={setTitle} />
            <TextInput style={[styles.input, { backgroundColor: isDark ? '#1e293b' : '#f1f5f9', color: c.text, borderColor: c.border }]} placeholder="Description" placeholderTextColor={c.secondary} value={description} onChangeText={setDescription} multiline />
            <TextInput style={[styles.input, { backgroundColor: isDark ? '#1e293b' : '#f1f5f9', color: c.text, borderColor: c.border }]} placeholder="GitHub Link" placeholderTextColor={c.secondary} value={gitLink} onChangeText={setGitLink} />
            <TextInput style={[styles.input, { backgroundColor: isDark ? '#1e293b' : '#f1f5f9', color: c.text, borderColor: c.border }]} placeholder="Live Demo Link" placeholderTextColor={c.secondary} value={liveLink} onChangeText={setLiveLink} />
            <TouchableOpacity style={styles.imagePicker} onPress={pickImage}>
              <Ionicons name="camera-outline" size={24} color={c.primary} />
              <Text style={[styles.imagePickerText, { color: c.primary }]}>Pick Project Image</Text>
            </TouchableOpacity>
            {imageUri && <Image source={{ uri: imageUri }} style={styles.preview} />}
            <View style={styles.modalButtons}>
              <TouchableOpacity style={[styles.modalBtn, { backgroundColor: c.border }]} onPress={() => setModal(false)}>
                <Text style={[styles.modalBtnText, { color: c.text }]}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.modalBtn, { backgroundColor: '#2563eb' }]} onPress={handleSubmit}>
                <Text style={styles.modalBtnText}>{editId ? 'Update' : 'Add'}</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  container: { flex: 1, padding: spacing.lg },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: spacing.xl, marginTop: spacing.xxl },
  title: { fontSize: fontSize.h3, fontWeight: '700' },
  card: { flexDirection: 'row', alignItems: 'center', padding: spacing.lg, borderRadius: borderRadius.md, borderWidth: 1, marginBottom: spacing.sm, gap: spacing.md },
  thumb: { width: 50, height: 50, borderRadius: borderRadius.sm },
  itemTitle: { fontSize: fontSize.body, fontWeight: '600' },
  itemDesc: { fontSize: fontSize.caption, marginTop: spacing.xs },
  actionBtn: { padding: spacing.sm },
  empty: { textAlign: 'center', marginTop: spacing.xxxl, fontSize: fontSize.body },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', padding: spacing.xl },
  modalContent: { borderRadius: borderRadius.xl, padding: spacing.xl, maxHeight: '80%' },
  modalTitle: { fontSize: fontSize.h3, fontWeight: '700', marginBottom: spacing.lg },
  input: { borderRadius: borderRadius.md, paddingHorizontal: spacing.lg, paddingVertical: 12, fontSize: fontSize.body, borderWidth: 1, marginBottom: spacing.md },
  imagePicker: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm, padding: spacing.md, marginBottom: spacing.md },
  imagePickerText: { fontSize: fontSize.body, fontWeight: '600' },
  preview: { width: 100, height: 100, borderRadius: borderRadius.md, alignSelf: 'center', marginBottom: spacing.md },
  modalButtons: { flexDirection: 'row', gap: spacing.sm, justifyContent: 'flex-end', marginTop: spacing.md },
  modalBtn: { paddingVertical: 10, paddingHorizontal: 24, borderRadius: borderRadius.md, minWidth: 80, alignItems: 'center' },
  modalBtnText: { color: '#fff', fontWeight: '600', fontSize: fontSize.body },
})

export default AdminProject
