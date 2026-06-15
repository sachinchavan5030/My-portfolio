import React from 'react'
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Linking,
  useColorScheme,
  ActivityIndicator,
} from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons'
import { useGetSkillQuery } from '../../../redux/apis/skill.api'
import { useGetAboutQuery } from '../../../redux/apis/about.api'
import { colors, spacing, fontSize, borderRadius } from '../../styles/theme'
import Footer from '../../components/Footer'

const SkillScreen = () => {
  const { data, isLoading } = useGetSkillQuery()
  const { data: aboutData } = useGetAboutQuery()
  const theme = useColorScheme()
  const isDark = theme === 'dark'
  const c = isDark ? colors.dark : colors.light

  if (isLoading) {
    return (
      <View style={[styles.center, { backgroundColor: c.background }]}>
        <ActivityIndicator size="large" color={c.primary} />
      </View>
    )
  }

  return (
    <View style={[styles.container, { backgroundColor: c.background }]}>
      <FlatList
        data={data?.result || []}
        keyExtractor={(item: any, index: number) => item.id?.toString() || index.toString()}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
        columnWrapperStyle={{ justifyContent: 'space-between' }}
        ListHeaderComponent={
          <View style={styles.header}>
            <Text style={[styles.title, { color: c.text }]}>My Skills</Text>
            <Text style={[styles.subtitle, { color: c.secondary }]}>Technologies and tools I use</Text>
          </View>
        }
        renderItem={({ item }) => (
          <View style={[styles.card, { backgroundColor: c.card, borderColor: c.border }]}>
            <Text style={[styles.cardText, { color: c.text }]}>{item.skills}</Text>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>Technology</Text>
            </View>
          </View>
        )}
        ListFooterComponent={<Footer about={aboutData?.result?.[0]} />}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  container: { flex: 1 },
  header: { alignItems: 'center', marginTop: spacing.xl, marginBottom: spacing.xl },
  title: { fontSize: fontSize.h1, fontWeight: '700' },
  subtitle: { marginTop: spacing.xs, fontSize: fontSize.body },
  listContainer: { paddingHorizontal: spacing.lg, paddingBottom: spacing.xxl },
  card: { width: '48%', borderRadius: borderRadius.xl, paddingVertical: 28, paddingHorizontal: spacing.md, marginBottom: spacing.lg, alignItems: 'center', borderWidth: 1, elevation: 3 },
  cardText: { fontSize: fontSize.body, fontWeight: '700', textAlign: 'center' },
  badge: { marginTop: spacing.md, backgroundColor: '#2563eb', paddingHorizontal: spacing.md, paddingVertical: spacing.xs, borderRadius: borderRadius.round },
  badgeText: { color: '#fff', fontSize: fontSize.small, fontWeight: '600' },
})

export default SkillScreen
