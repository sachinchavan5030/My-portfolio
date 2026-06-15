import React from 'react'
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  Linking,
  StyleSheet,
  useColorScheme,
  ActivityIndicator,
} from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons'
import { useGetAboutQuery } from '../../../redux/apis/about.api'
import { useGetProjectQuery } from '../../../redux/apis/project.api'
import { useGetExprienceQuery } from '../../../redux/apis/exprience.api'
import { colors, spacing, fontSize, borderRadius } from '../../styles/theme'
import Footer from '../../components/Footer'

const HomeScreen = () => {
  const { data, isLoading: aboutLoading } = useGetAboutQuery()
  const { data: projectData, isLoading: projectLoading } = useGetProjectQuery()
  const { data: exprienceData, isLoading: expLoading } = useGetExprienceQuery()

  const theme = useColorScheme()
  const isDark = theme === 'dark'
  const c = isDark ? colors.dark : colors.light

  const user = data?.result?.[0]
  const exprience = exprienceData?.result?.[0]

  const skills = [
    'React.js', 'Next.js', 'TypeScript', 'Node.js',
    'Tailwind CSS', 'Redux', 'MongoDB', 'GraphQL',
  ]

  const stats = [
    { icon: 'trophy-outline', label: 'Experience', value: exprience?.exprienceYear || 0 },
    { icon: 'code-slash-outline', label: 'Projects', value: exprience?.projects || 0 },
    { icon: 'briefcase-outline', label: 'Technologies', value: exprience?.technologies || 0 },
    { icon: 'people-outline', label: 'Clients', value: exprience?.happyClient || 0 },
  ]

  const handleLoading = aboutLoading || projectLoading || expLoading

  const renderProject = ({ item }: any) => (
    <View style={[styles.projectCard, { backgroundColor: c.card, borderColor: c.border }]}>
      <Image source={{ uri: item.projectImage || 'https://via.placeholder.com/300' }} style={styles.projectImage} />
      <Text style={[styles.projectTitle, { color: c.text }]}>{item.title}</Text>
      <Text style={[styles.projectDesc, { color: c.secondary }]} numberOfLines={3}>{item.description}</Text>
      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.primaryBtn} onPress={() => Linking.openURL(item.liveLink)}>
          <Text style={styles.btnText}>Live</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.darkBtn} onPress={() => Linking.openURL(item.gitLink)}>
          <Text style={styles.btnText}>Code</Text>
        </TouchableOpacity>
      </View>
    </View>
  )

  if (handleLoading) {
    return (
      <View style={[styles.center, { backgroundColor: c.background }]}>
        <ActivityIndicator size="large" color={c.primary} />
      </View>
    )
  }

  return (
    <FlatList
      showsVerticalScrollIndicator={false}
      style={{ backgroundColor: c.background }}
      data={projectData?.result || []}
      keyExtractor={(item: any, index: number) => item?.id?.toString() || index.toString()}
      renderItem={renderProject}
      ListHeaderComponent={
        <>
          <View style={styles.heroSection}>
            <Image source={{ uri: user?.profilePic || 'https://via.placeholder.com/300' }} style={styles.profileImage} />
            <Text style={[styles.title, { color: c.text }]}>Hi, I'm {user?.name?.split(' ')[0]}</Text>
            <Text style={[styles.subtitle, { color: c.secondary }]}>Full Stack Developer</Text>
            <Text style={[styles.heroText, { color: c.secondary }]}>
              Building clean, responsive and user-friendly applications with modern technologies.
            </Text>

            <View style={styles.heroBtnRow}>
              <TouchableOpacity style={styles.btn} onPress={() => Linking.openURL(exprience?.resume as string)}>
                <Ionicons name="download-outline" size={18} color="#fff" />
                <Text style={styles.btnText}>Download CV</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.outlineBtn, { borderColor: c.border }]}>
                <Text style={{ color: c.text, fontWeight: '600' }}>Contact</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.socialRow}>
              <TouchableOpacity><Ionicons name="logo-github" size={26} color={c.secondary} /></TouchableOpacity>
              <TouchableOpacity><Ionicons name="logo-linkedin" size={26} color={c.secondary} /></TouchableOpacity>
              <TouchableOpacity onPress={() => Linking.openURL(`mailto:${user?.email}`)}>
                <Ionicons name="mail-outline" size={26} color={c.secondary} />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={[styles.heading, { color: c.text }]}>About Me</Text>
            <Text style={[styles.aboutText, { color: c.secondary }]}>{user?.bio}</Text>
          </View>

          <View style={styles.section}>
            <FlatList
              data={stats}
              numColumns={2}
              scrollEnabled={false}
              keyExtractor={(_, i) => i.toString()}
              renderItem={({ item }) => (
                <View style={[styles.statCard, { backgroundColor: c.card, borderColor: c.border }]}>
                  <Ionicons name={item.icon as any} size={30} color={c.secondary} />
                  <Text style={[styles.statNumber, { color: c.text }]}>{item.value}+</Text>
                  <Text style={{ color: c.secondary }}>{item.label}</Text>
                </View>
              )}
            />
          </View>

          <View style={styles.section}>
            <Text style={[styles.heading, { color: c.text }]}>Skills</Text>
            <View style={styles.skillsContainer}>
              {skills.map((skill, i) => (
                <View key={i} style={[styles.skillBox, { backgroundColor: c.card }]}>
                  <Text style={{ color: c.text }}>{skill}</Text>
                </View>
              ))}
            </View>
          </View>

          <View style={styles.section}>
            <Text style={[styles.heading, { color: c.text }]}>Projects</Text>
            <Text style={{ color: c.secondary }}>Some of my recent work</Text>
          </View>
        </>
      }
      ListFooterComponent={<Footer about={user} />}
    />
  )
}

const styles = StyleSheet.create({
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  heroSection: { padding: spacing.xxl, alignItems: 'center', paddingTop: 50 },
  section: { paddingHorizontal: spacing.xl, paddingVertical: spacing.xxl },
  profileImage: { width: 180, height: 180, borderRadius: 100, marginBottom: spacing.xl },
  title: { fontSize: fontSize.h2, fontWeight: 'bold', textAlign: 'center' },
  subtitle: { fontSize: 18, marginTop: spacing.sm },
  heroText: { textAlign: 'center', marginTop: spacing.lg, lineHeight: 24, fontSize: fontSize.body, paddingHorizontal: spacing.md },
  heroBtnRow: { flexDirection: 'row', gap: spacing.md, marginTop: spacing.xxl },
  btn: { backgroundColor: '#111827', paddingHorizontal: 18, paddingVertical: 12, borderRadius: borderRadius.md, flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  outlineBtn: { paddingHorizontal: 18, paddingVertical: 12, borderRadius: borderRadius.md, borderWidth: 1, justifyContent: 'center', alignItems: 'center' },
  btnText: { color: '#fff', fontWeight: '600' },
  socialRow: { flexDirection: 'row', gap: spacing.xl, marginTop: spacing.xxl },
  heading: { fontSize: fontSize.h2, fontWeight: 'bold', marginBottom: spacing.lg },
  aboutText: { lineHeight: 24, fontSize: fontSize.body },
  statCard: { flex: 1, margin: spacing.sm, padding: 22, borderRadius: borderRadius.xl, alignItems: 'center', borderWidth: 1 },
  statNumber: { fontSize: 26, fontWeight: 'bold', marginVertical: spacing.md },
  skillsContainer: { flexDirection: 'row', flexWrap: 'wrap' },
  skillBox: { paddingHorizontal: spacing.lg, paddingVertical: spacing.md, borderRadius: borderRadius.md, margin: spacing.xs },
  projectCard: { marginHorizontal: spacing.xl, marginBottom: spacing.xl, borderRadius: borderRadius.xl, overflow: 'hidden', borderWidth: 1, paddingBottom: spacing.lg },
  projectImage: { width: '100%', height: 200 },
  projectTitle: { fontSize: fontSize.h3, fontWeight: 'bold', marginTop: spacing.lg, marginHorizontal: spacing.lg },
  projectDesc: { marginTop: spacing.sm, marginHorizontal: spacing.lg, lineHeight: 24 },
  buttonRow: { flexDirection: 'row', marginTop: spacing.lg, marginHorizontal: spacing.lg },
  primaryBtn: { backgroundColor: '#111827', paddingHorizontal: 14, paddingVertical: 10, borderRadius: borderRadius.md, marginRight: spacing.md, alignItems: 'center', flex: 1 },
  darkBtn: { backgroundColor: '#111827', paddingHorizontal: 14, paddingVertical: 10, borderRadius: borderRadius.md, alignItems: 'center', flex: 1 },
})

export default HomeScreen
