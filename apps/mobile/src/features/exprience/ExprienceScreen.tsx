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
import { useGetExprienceQuery } from '../../../redux/apis/exprience.api'
import { useGetAboutQuery } from '../../../redux/apis/about.api'
import { colors, spacing, fontSize, borderRadius } from '../../styles/theme'
import Footer from '../../components/Footer'

const formatDate = (d: string | Date | null): string => {
  if (!d) return ''
  const date = new Date(d)
  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
  return `${months[date.getMonth()]} ${date.getFullYear()}`
}

const ExperienceScreen = () => {
  const { data, isLoading } = useGetExprienceQuery()
  const { data: aboutData } = useGetAboutQuery()
  const theme = useColorScheme()
  const isDark = theme === 'dark'
  const c = isDark ? colors.dark : colors.light

  const experiences = data?.result || []

  if (isLoading) {
    return (
      <View style={[styles.center, { backgroundColor: c.background }]}>
        <ActivityIndicator size="large" color={c.primary} />
      </View>
    )
  }

  return (
    <FlatList
      data={experiences}
      keyExtractor={(item: any) => item.id?.toString()}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={[styles.container, { backgroundColor: c.background }]}
      ListHeaderComponent={
        <View style={styles.header}>
          <Text style={[styles.heading, { color: c.text }]}>Experience</Text>
          <Text style={[styles.subHeading, { color: c.secondary }]}>
            My professional journey and the roles I've worked in so far.
          </Text>
        </View>
      }
      renderItem={({ item, index }) => (
        <View style={styles.timelineWrapper}>
          {index !== experiences.length - 1 && (
            <View style={[styles.line, { backgroundColor: c.border }]} />
          )}
          <View style={styles.dot} />
          <View style={[styles.card, { backgroundColor: c.card }]}>
            <View style={styles.cardHeader}>
              <View style={{ flex: 1 }}>
                <Text style={[styles.role, { color: c.text }]}>{item.role}</Text>
                <Text style={styles.company}>{item.companyName}</Text>
              </View>
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{`${formatDate(item.doj)} - ${formatDate(item.dor) || 'Present'}`}</Text>
              </View>
            </View>
            <Text style={[styles.desc, { color: c.secondary }]}>{item.eDesc}</Text>
          </View>
        </View>
      )}
      ListFooterComponent={<Footer about={aboutData?.result?.[0]} />}
    />
  )
}

const styles = StyleSheet.create({
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  container: { padding: spacing.lg },
  header: { marginBottom: 30, alignItems: 'center' },
  heading: { fontSize: fontSize.h1, fontWeight: '700', marginBottom: spacing.md },
  subHeading: { textAlign: 'center', lineHeight: 24, fontSize: fontSize.body },
  timelineWrapper: { position: 'relative', paddingLeft: 30, marginBottom: 25 },
  line: { position: 'absolute', left: 10, top: 20, width: 2, height: '100%' },
  dot: { position: 'absolute', left: 2, top: 12, width: 18, height: 18, borderRadius: 20, backgroundColor: '#3b82f6' },
  card: { borderRadius: borderRadius.round, padding: 18, elevation: 4 },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 14, gap: 10 },
  role: { fontSize: 19, fontWeight: '700' },
  company: { marginTop: spacing.xs, color: '#64748b', fontSize: 14 },
  badge: { backgroundColor: '#e2e8f0', paddingHorizontal: spacing.md, paddingVertical: spacing.xs, borderRadius: borderRadius.round },
  badgeText: { fontSize: fontSize.small, fontWeight: '600', color: '#334155' },
  desc: { fontSize: fontSize.body, lineHeight: 24 },
})

export default ExperienceScreen
