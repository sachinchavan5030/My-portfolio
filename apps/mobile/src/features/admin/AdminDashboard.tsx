import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet, useColorScheme, ScrollView } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import Ionicons from '@expo/vector-icons/Ionicons'
import { colors, spacing, fontSize, borderRadius } from '../../styles/theme'

const menuItems = [
  { name: 'About', icon: 'person-outline', route: 'adminAbout' as const },
  { name: 'Skill', icon: 'code-slash-outline', route: 'adminSkill' as const },
  { name: 'Experience', icon: 'briefcase-outline', route: 'adminExprience' as const },
  { name: 'Project', icon: 'folder-open-outline', route: 'adminProject' as const },
]

const AdminDashboard = () => {
  const { navigate } = useNavigation<any>()
  const theme = useColorScheme()
  const isDark = theme === 'dark'
  const c = isDark ? colors.dark : colors.light

  return (
    <ScrollView contentContainerStyle={[styles.container, { backgroundColor: c.background }]}>
      <Text style={[styles.title, { color: c.text }]}>Admin Panel</Text>
      <Text style={[styles.subtitle, { color: c.secondary }]}>Manage your portfolio content</Text>

      <View style={styles.grid}>
        {menuItems.map((item) => (
          <TouchableOpacity
            key={item.name}
            style={[styles.card, { backgroundColor: c.card, borderColor: c.border }]}
            onPress={() => navigate(item.route)}
          >
            <Ionicons name={item.icon as any} size={36} color={c.primary} />
            <Text style={[styles.cardLabel, { color: c.text }]}>{item.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, padding: spacing.xl },
  title: { fontSize: fontSize.h1, fontWeight: 'bold', textAlign: 'center', marginTop: spacing.xxl },
  subtitle: { textAlign: 'center', marginBottom: spacing.xxxl, marginTop: spacing.sm },
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  card: {
    width: '48%', borderRadius: borderRadius.xl, paddingVertical: 32, paddingHorizontal: spacing.md,
    marginBottom: spacing.lg, alignItems: 'center', borderWidth: 1, elevation: 3,
  },
  cardLabel: { marginTop: spacing.md, fontSize: fontSize.body, fontWeight: '700' },
})

export default AdminDashboard
