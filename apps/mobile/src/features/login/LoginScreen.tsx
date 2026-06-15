import React from 'react'
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  useColorScheme,
  KeyboardAvoidingView,
  Platform,
} from 'react-native'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import z from 'zod'
import { useSigninMutation } from '../../../redux/apis/admin.api'
import { LOGIN_REQUEST } from '@repo/types'
import { useNavigation } from '@react-navigation/native'
import { AppNavigation } from '../../../types/Navigation'
import Toast from 'react-native-toast-message'
import { colors, spacing, fontSize, borderRadius } from '../../styles/theme'

const loginSchema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(3, 'Password must be at least 3 characters'),
}) satisfies z.ZodType<LOGIN_REQUEST>

const LoginScreen = () => {
  const [signIn, { isLoading }] = useSigninMutation()
  const { navigate } = useNavigation<AppNavigation>()
  const theme = useColorScheme()
  const isDark = theme === 'dark'
  const c = isDark ? colors.dark : colors.light

  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = async (data: LOGIN_REQUEST) => {
    try {
      await signIn(data).unwrap()
      Toast.show({ type: 'success', text1: 'Login successful' })
      navigate('adminDashboard')
    } catch {
      Toast.show({ type: 'error', text1: 'Invalid credentials' })
    }
  }

  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor: c.background }]}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={styles.formContainer}>
        <Text style={[styles.title, { color: c.text }]}>Admin Login</Text>
        <Text style={[styles.subtitle, { color: c.secondary }]}>Sign in to manage your portfolio</Text>

        <View style={styles.inputGroup}>
          <Text style={[styles.label, { color: c.text }]}>Email</Text>
          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, value } }) => (
              <TextInput
                style={[styles.input, { backgroundColor: isDark ? '#1e293b' : '#f1f5f9', color: c.text, borderColor: errors.email ? '#ef4444' : c.border }]}
                placeholder="m@example.com"
                placeholderTextColor={c.secondary}
                keyboardType="email-address"
                autoCapitalize="none"
                value={value}
                onChangeText={onChange}
              />
            )}
          />
          {errors.email && <Text style={styles.error}>{errors.email.message}</Text>}
        </View>

        <View style={styles.inputGroup}>
          <Text style={[styles.label, { color: c.text }]}>Password</Text>
          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, value } }) => (
              <TextInput
                style={[styles.input, { backgroundColor: isDark ? '#1e293b' : '#f1f5f9', color: c.text, borderColor: errors.password ? '#ef4444' : c.border }]}
                placeholder="Enter password"
                placeholderTextColor={c.secondary}
                secureTextEntry
                value={value}
                onChangeText={onChange}
              />
            )}
          />
          {errors.password && <Text style={styles.error}>{errors.password.message}</Text>}
        </View>

        <TouchableOpacity
          style={[styles.button, { opacity: isLoading ? 0.7 : 1 }]}
          onPress={handleSubmit(onSubmit)}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Login</Text>
          )}
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: spacing.xxl },
  formContainer: { width: '100%' },
  title: { fontSize: fontSize.h1, fontWeight: 'bold', textAlign: 'center' },
  subtitle: { textAlign: 'center', marginBottom: spacing.xxxl, marginTop: spacing.sm },
  inputGroup: { marginBottom: spacing.xl },
  label: { fontWeight: '600', marginBottom: spacing.sm, fontSize: fontSize.body },
  input: { borderRadius: borderRadius.md, paddingHorizontal: spacing.lg, paddingVertical: 14, fontSize: fontSize.body, borderWidth: 1 },
  error: { color: '#ef4444', marginTop: spacing.xs, fontSize: fontSize.caption },
  button: { backgroundColor: '#0f172a', paddingVertical: spacing.lg, borderRadius: borderRadius.lg, alignItems: 'center', marginTop: spacing.lg },
  buttonText: { color: '#fff', fontSize: fontSize.body, fontWeight: '700' },
})

export default LoginScreen
