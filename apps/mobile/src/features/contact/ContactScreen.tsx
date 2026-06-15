import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  useColorScheme,
} from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import z from 'zod'
import { useGetAboutQuery } from '../../../redux/apis/about.api'
import { useAddContactMutation } from '../../../redux/apis/contact.api'
import { CREATE_CONTACT_REQUEST } from '@repo/types'
import Toast from 'react-native-toast-message'
import { colors, spacing, fontSize, borderRadius } from '../../styles/theme'

const contactSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email'),
  msg: z.string().min(1, 'Message is required'),
}) satisfies z.ZodType<CREATE_CONTACT_REQUEST>

const ContactScreen = () => {
  const { data } = useGetAboutQuery()
  const [addContact, { isLoading }] = useAddContactMutation()
  const theme = useColorScheme()
  const isDark = theme === 'dark'
  const c = isDark ? colors.dark : colors.light

  const { control, reset, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(contactSchema),
  })

  const handleContact = async (formData: CREATE_CONTACT_REQUEST) => {
    try {
      await addContact(formData).unwrap()
      Toast.show({ type: 'success', text1: 'Message sent successfully' })
      reset()
    } catch {
      Toast.show({ type: 'error', text1: 'Something went wrong' })
    }
  }

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={[styles.container, { backgroundColor: c.background }]}
    >
      <View style={styles.header}>
        <Text style={[styles.heading, { color: c.text }]}>Contact Me</Text>
        <Text style={[styles.subHeading, { color: c.secondary }]}>
          Let's connect and build something amazing together
        </Text>
      </View>

      <View style={[styles.card, { backgroundColor: c.card }]}>
        <Text style={[styles.cardTitle, { color: c.text }]}>Get In Touch</Text>
        {[
          { icon: 'mail-outline', text: data?.result?.[0]?.email },
          { icon: 'call-outline', text: data?.result?.[0]?.mobile },
          { icon: 'location-outline', text: data?.result?.[0]?.location },
        ].map((info, i) => (
          <View key={i} style={styles.infoRow}>
            <Ionicons name={info.icon as any} size={20} color={c.secondary} />
            <Text style={[styles.infoText, { color: c.secondary }]}>{info.text}</Text>
          </View>
        ))}
        <View style={{ marginTop: spacing.xl }}>
          <Text style={[styles.socialTitle, { color: c.text }]}>Follow Me</Text>
          <View style={styles.socialRow}>
            <TouchableOpacity><Ionicons name="logo-github" size={30} color={c.secondary} /></TouchableOpacity>
            <TouchableOpacity><Ionicons name="logo-linkedin" size={30} color={c.secondary} /></TouchableOpacity>
            <TouchableOpacity><Ionicons name="mail" size={30} color={c.secondary} /></TouchableOpacity>
          </View>
        </View>
      </View>

      <View style={[styles.card, { backgroundColor: c.card }]}>
        <Text style={[styles.cardTitle, { color: c.text }]}>Send Message</Text>
        {(['name', 'email', 'msg'] as const).map((field) => (
          <View key={field} style={styles.inputContainer}>
            <Controller
              control={control}
              name={field}
              render={({ field: { onChange, value } }) => (
                <TextInput
                  placeholder={field === 'name' ? 'Your Name' : field === 'email' ? 'Your Email' : 'Your Message'}
                  style={[
                    styles.input,
                    { backgroundColor: isDark ? '#1e293b' : '#f1f5f9', color: c.text },
                    field === 'msg' && styles.textArea,
                  ]}
                  keyboardType={field === 'email' ? 'email-address' : 'default'}
                  autoCapitalize={field === 'email' ? 'none' : 'sentences'}
                  multiline={field === 'msg'}
                  numberOfLines={field === 'msg' ? 5 : 1}
                  textAlignVertical={field === 'msg' ? 'top' : 'center'}
                  value={value}
                  onChangeText={onChange}
                  placeholderTextColor={c.secondary}
                />
              )}
            />
            {errors[field] && <Text style={styles.error}>{errors[field]?.message}</Text>}
          </View>
        ))}
        <TouchableOpacity style={styles.button} onPress={handleSubmit(handleContact)} disabled={isLoading}>
          {isLoading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Send Message</Text>
          )}
        </TouchableOpacity>
      </View>

      <View style={[styles.footer, { borderTopColor: c.border }]}>
        <Text style={[styles.footerName, { color: c.text }]}>{data?.result?.[0]?.name}</Text>
        <Text style={[styles.footerText, { color: c.secondary }]}>
          Full Stack Developer building modern mobile and web applications.
        </Text>
        <View style={styles.footerBottom}>
          <Text style={{ color: c.secondary }}>© 2026 Sachin — Built with ❤️</Text>
        </View>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: { padding: spacing.lg },
  header: { alignItems: 'center', marginBottom: spacing.xl },
  heading: { fontSize: fontSize.h1, fontWeight: 'bold' },
  subHeading: { marginTop: spacing.md, textAlign: 'center', lineHeight: 22, fontSize: fontSize.body },
  card: { borderRadius: borderRadius.round, padding: spacing.xl, marginBottom: spacing.xl, elevation: 4 },
  cardTitle: { fontSize: fontSize.h3, fontWeight: '700', marginBottom: spacing.xl },
  infoRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.md, marginBottom: spacing.lg },
  infoText: { fontSize: fontSize.body },
  socialTitle: { fontSize: fontSize.body, fontWeight: '600', marginBottom: spacing.md },
  socialRow: { flexDirection: 'row', gap: spacing.xl },
  inputContainer: { marginBottom: 18 },
  input: { borderRadius: borderRadius.md, paddingHorizontal: spacing.lg, paddingVertical: 14, fontSize: fontSize.body },
  textArea: { height: 140 },
  error: { color: 'red', marginTop: spacing.xs, fontSize: fontSize.caption },
  button: { backgroundColor: '#0f172a', paddingVertical: spacing.lg, borderRadius: borderRadius.lg, alignItems: 'center', marginTop: spacing.md },
  buttonText: { color: '#fff', fontSize: fontSize.body, fontWeight: '700' },
  footer: { marginTop: spacing.md, paddingTop: spacing.xl, borderTopWidth: 1, alignItems: 'center', paddingBottom: spacing.xl },
  footerName: { fontSize: fontSize.h3, fontWeight: '700' },
  footerText: { marginTop: spacing.md, textAlign: 'center', lineHeight: 22 },
  footerBottom: { marginTop: spacing.xl },
})

export default ContactScreen
