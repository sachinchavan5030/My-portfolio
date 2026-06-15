import React from 'react'
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  Linking,
  useColorScheme,
  ActivityIndicator,
} from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons'
import { useGetAboutQuery } from '../../../redux/apis/about.api'
import { colors, spacing, fontSize, borderRadius } from '../../styles/theme'
import Footer from '../../components/Footer'

const AboutScreen = () => {
  const { data, isLoading } = useGetAboutQuery()
  const theme = useColorScheme()
  const isDark = theme === 'dark'
  const c = isDark ? colors.dark : colors.light

  const renderItem = ({ item }: any) => (
    <View style={[styles.card, { backgroundColor: c.card }]}>
      <View style={styles.profileContainer}>
        <Image source={{ uri: item.profilePic }} style={styles.profileImage} />
        <Text style={[styles.name, { color: c.text }]}>{item.name}</Text>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>Full Stack Developer</Text>
        </View>
      </View>

      <View style={styles.sectionBlock}>
        <Text style={[styles.sectionTitle, { color: c.text }]}>Bio</Text>
        <Text style={[styles.text, { color: c.secondary }]}>{item.bio}</Text>
      </View>

      <View style={styles.sectionBlock}>
        <Text style={[styles.sectionTitle, { color: c.text }]}>Education</Text>
        <View style={styles.eduCard}>
          <Text style={[styles.eduTitle, { color: c.text }]}>Bachelor of Computer Applications (BCA)</Text>
          <Text style={[styles.eduText, { color: c.secondary }]}>
            Dr. Babasaheb Ambedkar Marathwada University, Chhatrapati Sambhajinagar
          </Text>
        </View>
      </View>

      <View style={styles.sectionBlock}>
        <Text style={[styles.sectionTitle, { color: c.text }]}>Personal Information</Text>
        {[
          { label: 'Name:', value: item.name },
          { label: 'Email:', value: item.email },
          { label: 'Mobile:', value: item.mobile },
          { label: 'DOB:', value: item.dob },
          { label: 'Location:', value: item.location },
        ].map((info, i) => (
          <View key={i} style={styles.infoRow}>
            <Text style={[styles.label, { color: c.text }]}>{info.label}</Text>
            <Text style={[styles.value, { color: c.secondary }]}>{info.value}</Text>
          </View>
        ))}
      </View>
    </View>
  )

  if (isLoading) {
    return (
      <View style={[styles.center, { backgroundColor: c.background }]}>
        <ActivityIndicator size="large" color={c.primary} />
      </View>
    )
  }

  return (
    <FlatList
      data={data?.result || []}
      keyExtractor={(item: any) => item._id}
      renderItem={renderItem}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={[styles.container, { backgroundColor: c.background }]}
      ListHeaderComponent={
        <View style={styles.header}>
          <Text style={[styles.heading, { color: c.text }]}>About Me</Text>
          <Text style={[styles.subHeading, { color: c.secondary }]}>
            Get to know more about me, my education, and personal details.
          </Text>
        </View>
      }
      ListFooterComponent={<Footer about={data?.result?.[0]} />}
    />
  )
}

const styles = StyleSheet.create({
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  container: { padding: spacing.lg },
  header: { marginBottom: spacing.xl, alignItems: 'center' },
  heading: { fontSize: fontSize.h1, fontWeight: 'bold' },
  subHeading: { marginTop: spacing.md, textAlign: 'center', color: '#64748b', lineHeight: 22, fontSize: fontSize.body },
  card: { backgroundColor: '#fff', borderRadius: borderRadius.round, padding: spacing.xl, marginBottom: spacing.xl, elevation: 4 },
  profileContainer: { alignItems: 'center', marginBottom: spacing.xl },
  profileImage: { width: 140, height: 140, borderRadius: 70 },
  name: { fontSize: fontSize.h2, fontWeight: 'bold', marginTop: spacing.lg },
  badge: { marginTop: spacing.md, backgroundColor: '#e2e8f0', paddingHorizontal: spacing.lg, paddingVertical: spacing.xs, borderRadius: borderRadius.round },
  badgeText: { color: '#334155', fontWeight: '600' },
  sectionBlock: { marginTop: spacing.xl },
  sectionTitle: { fontSize: fontSize.h3, fontWeight: '700', marginBottom: spacing.md },
  text: { fontSize: fontSize.body, lineHeight: 26 },
  eduCard: { backgroundColor: '#f1f5f9', padding: spacing.lg, borderRadius: borderRadius.lg },
  eduTitle: { fontSize: 18, fontWeight: '700', marginBottom: spacing.xs },
  eduText: { color: '#64748b', lineHeight: 22 },
  infoRow: { flexDirection: 'row', marginBottom: spacing.md },
  label: { width: 90, fontWeight: '700' },
  value: { flex: 1, color: '#475569' },
})

export default AboutScreen
