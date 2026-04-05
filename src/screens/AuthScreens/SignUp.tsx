import { StyleSheet, View } from 'react-native'
import React from 'react'
import CustomHeader from '../../components/CustomHeader'
import { ThemedText } from '../../constants/ThemedText'
import { COLORS,  SCREEN_WIDTH,  SIZES } from '../../constants/THEME'


const SignUp = () => {

  return (
  <CustomHeader>
      <View style={styles.form}>
        <ThemedText type="text2" style={{ marginBottom: SIZES.padding }}>
          Create your account
        </ThemedText>
        </View>
  </CustomHeader>
  )
}

export default SignUp

const styles = StyleSheet.create({
  form: {
    marginTop: SIZES.padding,
    backgroundColor:COLORS.formBg,
    borderRadius: SIZES.padding,
    paddingVertical: SIZES.padding,
    width: SCREEN_WIDTH * 0.9,
    paddingHorizontal: SIZES.base,
  },
  row: {
    flexDirection: 'row',
    paddingHorizontal: SIZES.padding,
    alignItems: 'center',
    justifyContent: 'center',
    gap: SIZES.base,
    marginTop: SIZES.base
  }
})