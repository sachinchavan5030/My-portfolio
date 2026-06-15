import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Linking, useColorScheme } from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons'
import { colors, spacing, fontSize, borderRadius } from '../styles/theme'
import { About } from '@repo/types'

interface FooterProps {
  about: About | undefined
}

const Footer = ({ about }: FooterProps) => {
  const isDark = useColorScheme() === 'dark'
  const c = isDark ? colors.dark : colors.light

  return (
    <View style={[styles.container, { borderTopColor: c.border }]}>
      <View style={styles.section}>
        <Text style={[styles.name, { color: c.text }]}>{about?.name}</Text>
        <Text style={[styles.desc, { color: c.secondary }]}>
          Full Stack Developer passionate about building scalable and modern applications.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: c.text }]}>Contact</Text>
        <View style={styles.row}>
          <Ionicons name="mail-outline" size={18} color={c.secondary} />
          <Text style={[styles.text, { color: c.secondary }]}>{about?.email}</Text>
        </View>
        <View style={styles.row}>
          <Ionicons name="call-outline" size={18} color={c.secondary} />
          <Text style={[styles.text, { color: c.secondary }]}>{about?.mobile}</Text>
        </View>
        <View style={styles.row}>
          <Ionicons name="location-outline" size={18} color={c.secondary} />
          <Text style={[styles.text, { color: c.secondary }]}>{about?.location}, Maharashtra</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: c.text }]}>Follow Me</Text>
        <View style={styles.socialRow}>
          <TouchableOpacity onPress={() => Linking.openURL('https://github.com/')}>
            <Ionicons name="logo-github" size={28} color={c.secondary} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => Linking.openURL('https://linkedin.com/')}>
            <Ionicons name="logo-linkedin" size={28} color={c.secondary} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => Linking.openURL(`mailto:${about?.email}`)}>
            <Ionicons name="mail" size={28} color={c.secondary} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={[styles.bottom, { borderTopColor: c.border }]}>
        <Text style={{ color: c.secondary, fontSize: fontSize.caption }}>
          © 2026 {about?.name || 'Sachin'} — Built with ❤️
        </Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: spacing.xl,
    paddingTop: spacing.xxl,
    borderTopWidth: 1,
    paddingBottom: spacing.xl,
  },
  section: {
    marginBottom: spacing.xxl,
  },
  name: {
    fontSize: fontSize.h3,
    fontWeight: '700',
    marginBottom: spacing.sm,
  },
  desc: {
    fontSize: fontSize.body,
    lineHeight: 22,
  },
  sectionTitle: {
    fontSize: fontSize.h3,
    fontWeight: '700',
    marginBottom: spacing.md,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
  text: {
    fontSize: fontSize.body,
  },
  socialRow: {
    flexDirection: 'row',
    gap: spacing.xl,
    marginTop: spacing.sm,
  },
  bottom: {
    borderTopWidth: 1,
    paddingTop: spacing.lg,
    alignItems: 'center',
  },
})

export default Footer
