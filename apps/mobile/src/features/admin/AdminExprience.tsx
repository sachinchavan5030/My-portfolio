import React from 'react'
import {
  View, Text, FlatList, TouchableOpacity, StyleSheet, useColorScheme,
  ActivityIndicator, Alert,
} from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons'
import { useGetExprienceQuery, useDeleteExprienceMutation } from '../../../redux/apis/exprience.api'
import { colors, spacing, fontSize, borderRadius } from '../../styles/theme'
import { useNavigation } from '@react-navigation/native'

const AdminExprience = () => {
  const { data, isLoading } = useGetExprienceQuery()
  const [deleteExprience] = useDeleteExprienceMutation()
  const { goBack } = useNavigation()
  const theme = useColorScheme()
  const isDark = theme === 'dark'
  const c = isDark ? colors.dark : colors.light

  const handleDelete = (id: number | undefined) => {
    if (id === undefined) return
    Alert.alert('Delete', 'Are you sure?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Delete', style: 'destructive', onPress: () => deleteExprience({ id }) },
    ])
  }

  return (
    <View style={[styles.container, { backgroundColor: c.background }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={goBack}><Ionicons name="arrow-back" size={28} color={c.text} /></TouchableOpacity>
        <Text style={[styles.title, { color: c.text }]}>Manage Experience</Text>
        <View style={{ width: 28 }} />
      </View>

      {isLoading ? (
        <View style={styles.center}><ActivityIndicator size="large" color={c.primary} /></View>
      ) : (
        <FlatList
          data={data?.result || []}
          keyExtractor={(item: any) => item.id?.toString()}
          renderItem={({ item }) => (
            <View style={[styles.card, { backgroundColor: c.card, borderColor: c.border }]}>
              <View style={{ flex: 1 }}>
                <Text style={[styles.role, { color: c.text }]}>{item.role}</Text>
                <Text style={[styles.company, { color: c.secondary }]}>{item.companyName}</Text>
              </View>
              <TouchableOpacity onPress={() => handleDelete(item.id)}>
                <Ionicons name="trash-outline" size={20} color={c.danger} />
              </TouchableOpacity>
            </View>
          )}
          ListEmptyComponent={<Text style={[styles.empty, { color: c.secondary }]}>No experience entries</Text>}
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
  card: { flexDirection: 'row', alignItems: 'center', padding: spacing.lg, borderRadius: borderRadius.md, borderWidth: 1, marginBottom: spacing.sm },
  role: { fontSize: fontSize.body, fontWeight: '600' },
  company: { fontSize: fontSize.caption, marginTop: spacing.xs },
  empty: { textAlign: 'center', marginTop: spacing.xxxl, fontSize: fontSize.body },
})

export default AdminExprience
