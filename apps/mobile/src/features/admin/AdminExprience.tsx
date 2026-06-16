import React, { useState } from 'react'
import {
  View, Text, FlatList, TouchableOpacity, TextInput, StyleSheet, useColorScheme,
  ActivityIndicator, Alert, Modal, ScrollView, Image,
} from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons'
import { useGetExprienceQuery, useAddExprienceMutation, useUpdateExprienceMutation, useDeleteExprienceMutation } from '../../../redux/apis/exprience.api'
import { colors, spacing, fontSize, borderRadius } from '../../styles/theme'
import { useNavigation } from '@react-navigation/native'
import Toast from 'react-native-toast-message'
import * as ImagePicker from 'expo-image-picker'

const AdminExprience = () => {
  const { data, isLoading } = useGetExprienceQuery()
  const [addExprience] = useAddExprienceMutation()
  const [updateExprience] = useUpdateExprienceMutation()
  const [deleteExprience] = useDeleteExprienceMutation()
  const { goBack } = useNavigation()
  const theme = useColorScheme()
  const isDark = theme === 'dark'
  const c = isDark ? colors.dark : colors.light

  const [modal, setModal] = useState(false)
  const [editId, setEditId] = useState<number | undefined>(undefined)
  const [companyName, setCompanyName] = useState('')
  const [role, setRole] = useState('')
  const [doj, setDoj] = useState('')
  const [dor, setDor] = useState('')
  const [eDesc, setEDesc] = useState('')
  const [exprienceYear, setExprienceYear] = useState('')
  const [projects, setProjects] = useState('')
  const [happyClient, setHappyClient] = useState('')
  const [technologies, setTechnologies] = useState('')
  const [description, setDescription] = useState('')
  const [imageUri, setImageUri] = useState<string | null>(null)

  const handleDelete = (id: number | undefined) => {
    if (id === undefined) return
    Alert.alert('Delete', 'Are you sure?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Delete', style: 'destructive', onPress: () => deleteExprience({ id }) },
    ])
  }

  const openAdd = () => {
    setEditId(undefined)
    setCompanyName('')
    setRole('')
    setDoj('')
    setDor('')
    setEDesc('')
    setExprienceYear('')
    setProjects('')
    setHappyClient('')
    setTechnologies('')
    setDescription('')
    setImageUri(null)
    setModal(true)
  }

  const openEdit = (item: any) => {
    setEditId(item.id)
    setCompanyName(item.companyName || '')
    setRole(item.role || '')
    setDoj(item.doj ? new Date(item.doj).toISOString().split('T')[0] : '')
    setDor(item.dor ? new Date(item.dor).toISOString().split('T')[0] : '')
    setEDesc(item.eDesc || '')
    setExprienceYear(item.exprienceYear || '')
    setProjects(item.projects || '')
    setHappyClient(item.happyClient || '')
    setTechnologies(item.technologies || '')
    setDescription(item.description || '')
    setImageUri(null)
    setModal(true)
  }

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({ mediaTypes: ['images'], quality: 0.8 })
    if (!result.canceled) setImageUri(result.assets[0].uri)
  }

  const handleSubmit = async () => {
    if (!companyName.trim() || !role.trim()) {
      Toast.show({ type: 'error', text1: 'Company and Role are required' })
      return
    }
    const fd = new FormData()
    fd.append('companyName', companyName)
    fd.append('role', role)
    fd.append('eDesc', eDesc)
    fd.append('exprienceYear', exprienceYear)
    fd.append('projects', projects)
    fd.append('happyClient', happyClient)
    fd.append('technologies', technologies)
    fd.append('description', description)
    if (doj) fd.append('doj', doj)
    if (dor) fd.append('dor', dor)
    if (imageUri) {
      const filename = imageUri.split('/').pop() || 'photo.jpg'
      const ext = filename.split('.').pop() || 'jpg'
      fd.append('resume', { uri: imageUri, name: filename, type: `image/${ext}` } as any)
    }
    try {
      if (editId) {
        await updateExprience({ id: editId, fd }).unwrap()
        Toast.show({ type: 'success', text1: 'Experience updated' })
      } else {
        await addExprience(fd).unwrap()
        Toast.show({ type: 'success', text1: 'Experience added' })
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
        <Text style={[styles.title, { color: c.text }]}>Manage Experience</Text>
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
              <View style={{ flex: 1 }}>
                <Text style={[styles.itemRole, { color: c.text }]}>{item.role}</Text>
                <Text style={[styles.itemCompany, { color: c.secondary }]}>{item.companyName}</Text>
              </View>
              <TouchableOpacity onPress={() => handleDelete(item.id)} style={styles.actionBtn}>
                <Ionicons name="trash-outline" size={20} color={c.danger} />
              </TouchableOpacity>
            </TouchableOpacity>
          )}
          ListEmptyComponent={<Text style={[styles.empty, { color: c.secondary }]}>No experience entries</Text>}
        />
      )}

      <Modal visible={modal} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <ScrollView contentContainerStyle={[styles.modalContent, { backgroundColor: c.card }]}>
            <Text style={[styles.modalTitle, { color: c.text }]}>{editId ? 'Edit Experience' : 'Add Experience'}</Text>
            <TextInput style={[styles.input, { backgroundColor: isDark ? '#1e293b' : '#f1f5f9', color: c.text, borderColor: c.border }]} placeholder="Company Name *" placeholderTextColor={c.secondary} value={companyName} onChangeText={setCompanyName} />
            <TextInput style={[styles.input, { backgroundColor: isDark ? '#1e293b' : '#f1f5f9', color: c.text, borderColor: c.border }]} placeholder="Role *" placeholderTextColor={c.secondary} value={role} onChangeText={setRole} />
            <TextInput style={[styles.input, { backgroundColor: isDark ? '#1e293b' : '#f1f5f9', color: c.text, borderColor: c.border }]} placeholder="Date of Joining (YYYY-MM-DD)" placeholderTextColor={c.secondary} value={doj} onChangeText={setDoj} />
            <TextInput style={[styles.input, { backgroundColor: isDark ? '#1e293b' : '#f1f5f9', color: c.text, borderColor: c.border }]} placeholder="Date of Resignation (YYYY-MM-DD)" placeholderTextColor={c.secondary} value={dor} onChangeText={setDor} />
            <TextInput style={[styles.input, { backgroundColor: isDark ? '#1e293b' : '#f1f5f9', color: c.text, borderColor: c.border }]} placeholder="Experience Year" placeholderTextColor={c.secondary} value={exprienceYear} onChangeText={setExprienceYear} />
            <TextInput style={[styles.input, { backgroundColor: isDark ? '#1e293b' : '#f1f5f9', color: c.text, borderColor: c.border }]} placeholder="Projects" placeholderTextColor={c.secondary} value={projects} onChangeText={setProjects} />
            <TextInput style={[styles.input, { backgroundColor: isDark ? '#1e293b' : '#f1f5f9', color: c.text, borderColor: c.border }]} placeholder="Happy Clients" placeholderTextColor={c.secondary} value={happyClient} onChangeText={setHappyClient} />
            <TextInput style={[styles.input, { backgroundColor: isDark ? '#1e293b' : '#f1f5f9', color: c.text, borderColor: c.border }]} placeholder="Technologies" placeholderTextColor={c.secondary} value={technologies} onChangeText={setTechnologies} />
            <TextInput style={[styles.input, { backgroundColor: isDark ? '#1e293b' : '#f1f5f9', color: c.text, borderColor: c.border }]} placeholder="Description" placeholderTextColor={c.secondary} value={description} onChangeText={setDescription} multiline />
            <TextInput style={[styles.input, { backgroundColor: isDark ? '#1e293b' : '#f1f5f9', color: c.text, borderColor: c.border }]} placeholder="E-Description" placeholderTextColor={c.secondary} value={eDesc} onChangeText={setEDesc} multiline />
            <TouchableOpacity style={styles.imagePicker} onPress={pickImage}>
              <Ionicons name="camera-outline" size={24} color={c.primary} />
              <Text style={[styles.imagePickerText, { color: c.primary }]}>Pick Resume Image</Text>
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
  card: { flexDirection: 'row', alignItems: 'center', padding: spacing.lg, borderRadius: borderRadius.md, borderWidth: 1, marginBottom: spacing.sm },
  itemRole: { fontSize: fontSize.body, fontWeight: '600' },
  itemCompany: { fontSize: fontSize.caption, marginTop: spacing.xs },
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

export default AdminExprience
