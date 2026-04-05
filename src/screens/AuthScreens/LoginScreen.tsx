import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import CustomHeader from '../../components/CustomHeader'
import { ThemedText } from '../../constants/ThemedText'
import { COLORS, SCREEN_WIDTH, SIZES } from '../../constants/THEME'
import CustomInput from '../../components/CustomInput'
import PrimaryButton from '../../components/PrimaryButton'
import { useNavigation } from '@react-navigation/native'

const LoginScreen = () => {
  const navigation = useNavigation<any>()
  const [Username, setUsername] = React.useState('')
  const [password, setPassword] = React.useState('')

  return (
   <CustomHeader title="Login">
      <View style={styles.form}>
        <ThemedText type="text2" style={{ marginBottom: SIZES.padding }}>
          Login to your account
        </ThemedText>
        </View>
   </CustomHeader>
  )
}

export default LoginScreen

const styles = StyleSheet.create({
  form: {
    marginTop: SIZES.padding * 3,
    backgroundColor: COLORS.formBg,
    borderRadius: SIZES.padding,
    padding: SIZES.padding,
    width: SCREEN_WIDTH * 0.9,
    paddingHorizontal: SIZES.base,
  },
})
