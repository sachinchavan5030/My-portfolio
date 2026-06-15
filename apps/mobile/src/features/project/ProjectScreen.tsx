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
import { useGetProjectQuery } from '../../../redux/apis/project.api'
import { useGetAboutQuery } from '../../../redux/apis/about.api'
import { colors, spacing, fontSize, borderRadius } from '../../styles/theme'
import Footer from '../../components/Footer'

const ProjectScreen = () => {
  const { data, isLoading } = useGetProjectQuery()
  const { data: aboutData } = useGetAboutQuery()
  const theme = useColorScheme()
  const isDark = theme === 'dark'
  const c = isDark ? colors.dark : colors.light

  const projects = data?.result || []

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
        data={projects}
        keyExtractor={(item: any) => item._id?.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
        ListHeaderComponent={
          <View style={styles.header}>
            <Text style={[styles.heading, { color: c.text }]}>My Projects</Text>
            <Text style={[styles.subHeading, { color: c.secondary }]}>A collection of my recent work and builds.</Text>
          </View>
        }
        renderItem={({ item }) => (
          <View style={[styles.card, { backgroundColor: c.card, borderColor: c.border }]}>
            <Image
              source={{ uri: item.projectImage || 'https://via.placeholder.com/300' }}
              style={styles.image}
            />
            <View style={styles.cardBody}>
              <Text style={[styles.title, { color: c.text }]}>{item.title}</Text>
              <Text style={[styles.desc, { color: c.secondary }]}>{item.description}</Text>
              <View style={styles.buttonRow}>
                <TouchableOpacity style={styles.primaryBtn} onPress={() => item.liveLink && Linking.openURL(item.liveLink)}>
                  <Text style={styles.btnText}>Live Demo</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.darkBtn} onPress={() => item.gitLink && Linking.openURL(item.gitLink)}>
                  <Text style={styles.btnText}>GitHub</Text>
                </TouchableOpacity>
              </View>
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
  listContainer: { padding: spacing.lg },
  header: { marginBottom: spacing.xxl, alignItems: 'center' },
  heading: { fontSize: fontSize.h1, fontWeight: '700' },
  subHeading: { marginTop: spacing.sm, fontSize: fontSize.body, textAlign: 'center' },
  card: { borderRadius: borderRadius.round, marginBottom: fontSize.h3, overflow: 'hidden', borderWidth: 1, elevation: 4 },
  image: { width: '100%', height: 220, resizeMode: 'cover' },
  cardBody: { padding: 18 },
  title: { fontSize: fontSize.h3, fontWeight: '700', marginBottom: spacing.md },
  desc: { fontSize: fontSize.body, lineHeight: 24 },
  buttonRow: { flexDirection: 'row', marginTop: spacing.xl, gap: spacing.md },
  primaryBtn: { flex: 1, backgroundColor: '#2563eb', paddingVertical: 12, borderRadius: borderRadius.md, alignItems: 'center' },
  darkBtn: { flex: 1, backgroundColor: '#111827', paddingVertical: 12, borderRadius: borderRadius.md, alignItems: 'center' },
  btnText: { color: '#fff', fontWeight: '700' },
})

export default ProjectScreen
