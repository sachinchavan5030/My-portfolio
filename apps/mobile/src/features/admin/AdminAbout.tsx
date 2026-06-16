import React, { useState } from 'react'
import {
  View, Text, FlatList, TouchableOpacity, TextInput, StyleSheet, useColorScheme,
  ActivityIndicator, Alert, Modal, ScrollView, Image,
} from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons'
import { useGetAboutQuery, useUpdateAboutMutation, useDeleteAboutMutation } from '../../../redux/apis/about.api'
import { colors, spacing, fontSize, borderRadius } from '../../styles/theme'
import { useNavigation } from '@react-navigation/native'
import Toast from 'react-native-toast-message'
import * as ImagePicker from 'expo-image-picker'

const AdminAbout = () => {
  const { data, isLoading } = useGetAboutQuery()
  const [updateAbout] = useUpdateAboutMutation()
  const [deleteAbout] = useDeleteAboutMutation()
  const { goBack } = useNavigation()
  const theme = useColorScheme()
  const isDark = theme === 'dark'
  const c = isDark ? colors.dark : colors.light

  const aboutItem = data?.result?.[0]
  const [editModal, setEditModal] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [mobile, setMobile] = useState('')
  const [location, setLocation] = useState('')
  const [bio, setBio] = useState('')
  const [gitHubLink, setGitHubLink] = useState('')
  const [linkdinLink, setLinkdinLink] = useState('')
  const [imageUri, setImageUri] = useState<string | null>(null)

  const handleDelete = (id: number | undefined) => {
    if (id === undefined) return
    Alert.alert('Delete', 'Are you sure?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Delete', style: 'destructive', onPress: () => deleteAbout({ id }) },
    ])
  }

  const openEdit = () => {
    if (!aboutItem) return
    setName(aboutItem.name || '')
    setEmail(aboutItem.email || '')
    setMobile(aboutItem.mobile || '')
    setLocation(aboutItem.location || '')
    setBio(aboutItem.bio || '')
    setGitHubLink(aboutItem.gitHubLink || '')
    setLinkdinLink(aboutItem.linkdinLink || '')
    setImageUri(null)
    setEditModal(true)
  }

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({ mediaTypes: ['images'], quality: 0.8 })
    if (!result.canceled) setImageUri(result.assets[0].uri)
  }

  const handleUpdate = async () => {
    if (!aboutItem?.id) return
    const fd = new FormData()
    fd.append('name', name)
    fd.append('email', email)
    fd.append('mobile', mobile)
    fd.append('location', location)
    fd.append('bio', bio)
    fd.append('gitHubLink', gitHubLink)
    fd.append('linkdinLink', linkdinLink)
    if (imageUri) {
      const filename = imageUri.split('/').pop() || 'photo.jpg'
      const ext = filename.split('.').pop() || 'jpg'
      fd.append('profilePic', { uri: imageUri, name: filename, type: `image/${ext}` } as any)
    }
    try {
      await updateAbout({ id: aboutItem.id, fd }).unwrap()
      Toast.show({ type: 'success', text1: 'About updated' })
      setEditModal(false)
    } catch {
      Toast.show({ type: 'error', text1: 'Failed to update' })
    }
  }

  if (isLoading) {
    return <View style={[styles.center, { backgroundColor: c.background }]}>
      <ActivityIndicator size="large" color={c.primary} />
    </View>
  }

  return (
    <View style={[styles.container, { backgroundColor: c.background }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={goBack}><Ionicons name="arrow-back" size={28} color={c.text} /></TouchableOpacity>
        <Text style={[styles.title, { color: c.text }]}>Manage About</Text>
        <TouchableOpacity onPress={openEdit}>
          <Ionicons name="create-outline" size={28} color={c.primary} />
        </TouchableOpacity>
      </View>

      {aboutItem ? (
        <ScrollView>
          <View style={[styles.card, { backgroundColor: c.card, borderColor: c.border }]}>
            {aboutItem.profilePic && (
              <Image source={{ uri: aboutItem.profilePic }} style={styles.avatar} />
            )}
            <Text style={[styles.fieldLabel, { color: c.secondary }]}>Name</Text>
            <Text style={[styles.fieldValue, { color: c.text }]}>{aboutItem.name}</Text>
            <Text style={[styles.fieldLabel, { color: c.secondary }]}>Email</Text>
            <Text style={[styles.fieldValue, { color: c.text }]}>{aboutItem.email}</Text>
            <Text style={[styles.fieldLabel, { color: c.secondary }]}>Mobile</Text>
            <Text style={[styles.fieldValue, { color: c.text }]}>{aboutItem.mobile}</Text>
            <Text style={[styles.fieldLabel, { color: c.secondary }]}>Location</Text>
            <Text style={[styles.fieldValue, { color: c.text }]}>{aboutItem.location}</Text>
            <Text style={[styles.fieldLabel, { color: c.secondary }]}>Bio</Text>
            <Text style={[styles.fieldValue, { color: c.text }]}>{aboutItem.bio}</Text>
            <Text style={[styles.fieldLabel, { color: c.secondary }]}>GitHub</Text>
            <Text style={[styles.fieldValue, { color: c.text }]}>{aboutItem.gitHubLink}</Text>
            <Text style={[styles.fieldLabel, { color: c.secondary }]}>LinkedIn</Text>
            <Text style={[styles.fieldValue, { color: c.text }]}>{aboutItem.linkdinLink}</Text>
          </View>
          <TouchableOpacity style={styles.deleteRow} onPress={() => handleDelete(aboutItem.id)}>
            <Ionicons name="trash-outline" size={20} color={c.danger} />
            <Text style={[styles.deleteText, { color: c.danger }]}>Delete this entry</Text>
          </TouchableOpacity>
        </ScrollView>
      ) : (
        <Text style={[styles.empty, { color: c.secondary }]}>No about data found</Text>
      )}

      <Modal visible={editModal} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <ScrollView contentContainerStyle={[styles.modalContent, { backgroundColor: c.card }]}>
            <Text style={[styles.modalTitle, { color: c.text }]}>Edit About</Text>
            <TextInput style={[styles.input, { backgroundColor: isDark ? '#1e293b' : '#f1f5f9', color: c.text, borderColor: c.border }]} placeholder="Name" placeholderTextColor={c.secondary} value={name} onChangeText={setName} />
            <TextInput style={[styles.input, { backgroundColor: isDark ? '#1e293b' : '#f1f5f9', color: c.text, borderColor: c.border }]} placeholder="Email" placeholderTextColor={c.secondary} value={email} onChangeText={setEmail} keyboardType="email-address" />
            <TextInput style={[styles.input, { backgroundColor: isDark ? '#1e293b' : '#f1f5f9', color: c.text, borderColor: c.border }]} placeholder="Mobile" placeholderTextColor={c.secondary} value={mobile} onChangeText={setMobile} keyboardType="phone-pad" />
            <TextInput style={[styles.input, { backgroundColor: isDark ? '#1e293b' : '#f1f5f9', color: c.text, borderColor: c.border }]} placeholder="Location" placeholderTextColor={c.secondary} value={location} onChangeText={setLocation} />
            <TextInput style={[styles.input, { backgroundColor: isDark ? '#1e293b' : '#f1f5f9', color: c.text, borderColor: c.border }]} placeholder="Bio" placeholderTextColor={c.secondary} value={bio} onChangeText={setBio} multiline />
            <TextInput style={[styles.input, { backgroundColor: isDark ? '#1e293b' : '#f1f5f9', color: c.text, borderColor: c.border }]} placeholder="GitHub Link" placeholderTextColor={c.secondary} value={gitHubLink} onChangeText={setGitHubLink} />
            <TextInput style={[styles.input, { backgroundColor: isDark ? '#1e293b' : '#f1f5f9', color: c.text, borderColor: c.border }]} placeholder="LinkedIn Link" placeholderTextColor={c.secondary} value={linkdinLink} onChangeText={setLinkdinLink} />
            <TouchableOpacity style={styles.imagePicker} onPress={pickImage}>
              <Ionicons name="camera-outline" size={24} color={c.primary} />
              <Text style={[styles.imagePickerText, { color: c.primary }]}>Pick Profile Image</Text>
            </TouchableOpacity>
            {imageUri && <Image source={{ uri: imageUri }} style={styles.preview} />}
            <View style={styles.modalButtons}>
              <TouchableOpacity style={[styles.modalBtn, { backgroundColor: c.border }]} onPress={() => setEditModal(false)}>
                <Text style={[styles.modalBtnText, { color: c.text }]}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.modalBtn, { backgroundColor: '#2563eb' }]} onPress={handleUpdate}>
                <Text style={styles.modalBtnText}>Save</Text>
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
  card: { borderRadius: borderRadius.md, borderWidth: 1, padding: spacing.lg, gap: spacing.xs },
  avatar: { width: 80, height: 80, borderRadius: 40, alignSelf: 'center', marginBottom: spacing.md },
  fieldLabel: { fontSize: fontSize.caption, marginTop: spacing.sm },
  fieldValue: { fontSize: fontSize.body, fontWeight: '500', marginBottom: spacing.sm },
  deleteRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: spacing.sm, marginTop: spacing.xl, padding: spacing.lg },
  deleteText: { fontSize: fontSize.body, fontWeight: '600' },
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

export default AdminAbout
