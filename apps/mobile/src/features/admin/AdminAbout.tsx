import React from 'react'
import {
  View, Text, FlatList, TouchableOpacity, StyleSheet, useColorScheme,
  ActivityIndicator, Alert,
} from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons'
import { useGetAboutQuery, useDeleteAboutMutation } from '../../../redux/apis/about.api'
import { colors, spacing, fontSize, borderRadius } from '../../styles/theme'
import { useNavigation } from '@react-navigation/native'

const AdminAbout = () => {
  const { data, isLoading } = useGetAboutQuery()
  const [deleteAbout] = useDeleteAboutMutation()
  const { goBack } = useNavigation()
  const theme = useColorScheme()
  const isDark = theme === 'dark'
  const c = isDark ? colors.dark : colors.light

  const handleDelete = (id: number | undefined) => {
    if (id === undefined) return
    Alert.alert('Delete', 'Are you sure?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Delete', style: 'destructive', onPress: () => deleteAbout({ id }) },
    ])
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
        <View style={{ width: 28 }} />
      </View>

      <FlatList
        data={data?.result || []}
        keyExtractor={(item: any) => item.id?.toString()}
        renderItem={({ item }) => (
          <View style={[styles.card, { backgroundColor: c.card, borderColor: c.border }]}>
            <Text style={[styles.name, { color: c.text }]}>{item.name}</Text>
            <Text style={[styles.email, { color: c.secondary }]}>{item.email}</Text>
            <TouchableOpacity style={styles.deleteBtn} onPress={() => handleDelete(item.id)}>
              <Ionicons name="trash-outline" size={20} color={c.danger} />
            </TouchableOpacity>
          </View>
        )}
        ListEmptyComponent={
          <Text style={[styles.empty, { color: c.secondary }]}>No about data found</Text>
        }
      />
    </View>
  )
}

const styles = StyleSheet.create({
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  container: { flex: 1, padding: spacing.lg },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: spacing.xl, marginTop: spacing.xxl },
  title: { fontSize: fontSize.h3, fontWeight: '700' },
  card: { flexDirection: 'row', alignItems: 'center', padding: spacing.lg, borderRadius: borderRadius.md, borderWidth: 1, marginBottom: spacing.md },
  name: { fontSize: fontSize.body, fontWeight: '600', flex: 1 },
  email: { fontSize: fontSize.caption, flex: 1 },
  deleteBtn: { padding: spacing.sm },
  empty: { textAlign: 'center', marginTop: spacing.xxxl, fontSize: fontSize.body },
})

export default AdminAbout
