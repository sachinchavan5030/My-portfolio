import React, { useState } from 'react'
import {
  View, Text, FlatList, TouchableOpacity, TextInput, StyleSheet, useColorScheme,
  ActivityIndicator, Alert,
} from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons'
import { useGetSkillQuery, useAddSkillMutation, useDeleteSkillMutation } from '../../../redux/apis/skill.api'
import { colors, spacing, fontSize, borderRadius } from '../../styles/theme'
import { useNavigation } from '@react-navigation/native'
import Toast from 'react-native-toast-message'

const AdminSkill = () => {
  const { data, isLoading } = useGetSkillQuery()
  const [addSkill] = useAddSkillMutation()
  const [deleteSkill] = useDeleteSkillMutation()
  const { goBack } = useNavigation()
  const [text, setText] = useState('')
  const theme = useColorScheme()
  const isDark = theme === 'dark'
  const c = isDark ? colors.dark : colors.light

  const handleAdd = async () => {
    if (!text.trim()) return
    try {
      await addSkill({ skills: text }).unwrap()
      Toast.show({ type: 'success', text1: 'Skill added' })
      setText('')
    } catch {
      Toast.show({ type: 'error', text1: 'Failed to add' })
    }
  }

  const handleDelete = (id: number | undefined) => {
    if (id === undefined) return
    Alert.alert('Delete', 'Are you sure?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Delete', style: 'destructive', onPress: () => deleteSkill({ id }) },
    ])
  }

  return (
    <View style={[styles.container, { backgroundColor: c.background }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={goBack}><Ionicons name="arrow-back" size={28} color={c.text} /></TouchableOpacity>
        <Text style={[styles.title, { color: c.text }]}>Manage Skills</Text>
        <View style={{ width: 28 }} />
      </View>

      <View style={styles.inputRow}>
        <TextInput
          style={[styles.input, { backgroundColor: isDark ? '#1e293b' : '#f1f5f9', color: c.text, borderColor: c.border }]}
          placeholder="Enter skill name"
          placeholderTextColor={c.secondary}
          value={text}
          onChangeText={setText}
        />
        <TouchableOpacity style={styles.addBtn} onPress={handleAdd}>
          <Ionicons name="add" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      {isLoading ? (
        <View style={styles.center}><ActivityIndicator size="large" color={c.primary} /></View>
      ) : (
        <FlatList
          data={data?.result || []}
          keyExtractor={(item: any) => item.id?.toString()}
          renderItem={({ item }) => (
            <View style={[styles.card, { backgroundColor: c.card, borderColor: c.border }]}>
              <Text style={[styles.skillText, { color: c.text }]}>{item.skills}</Text>
              <TouchableOpacity onPress={() => handleDelete(item.id)}>
                <Ionicons name="trash-outline" size={20} color={c.danger} />
              </TouchableOpacity>
            </View>
          )}
          ListEmptyComponent={<Text style={[styles.empty, { color: c.secondary }]}>No skills yet</Text>}
        />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  container: { flex: 1, padding: spacing.lg },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: spacing.xl, marginTop: spacing.xxl },
  title: { fontSize: fontSize.h3, fontWeight: '700' },
  inputRow: { flexDirection: 'row', marginBottom: spacing.xl, gap: spacing.sm },
  input: { flex: 1, borderRadius: borderRadius.md, paddingHorizontal: spacing.lg, paddingVertical: 12, fontSize: fontSize.body, borderWidth: 1 },
  addBtn: { backgroundColor: '#2563eb', borderRadius: borderRadius.md, padding: 12, justifyContent: 'center' },
  card: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: spacing.lg, borderRadius: borderRadius.md, borderWidth: 1, marginBottom: spacing.sm },
  skillText: { fontSize: fontSize.body, fontWeight: '600' },
  empty: { textAlign: 'center', marginTop: spacing.xxxl, fontSize: fontSize.body },
})

export default AdminSkill
