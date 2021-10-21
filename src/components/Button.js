import React from 'react'
import { TouchableOpacity, Text, ActivityIndicator, View, StyleSheet } from 'react-native';
import { SECONDARY_COLOR, WHITE_COLOR } from '../../assets/color';

const Button = (props) => {
  const { onPress, disable, label, style } = props

  return (
    <>
      {disable ?
        <View style={styles.button} onPress={onPress}>
          <ActivityIndicator color={WHITE_COLOR} />
        </View>
        :
        <TouchableOpacity style={[styles.button,style]} onPress={onPress}>
          <Text style={styles.login}>{label}</Text>
        </TouchableOpacity>
      }
    </>
  )
}

const styles = StyleSheet.create({
  button: {
    marginTop: 16,
    padding: 15,
    height: 50,
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: SECONDARY_COLOR
  },
  login: {
    fontSize: 16,
    color: WHITE_COLOR,
    lineHeight: 19
  }
})

export default Button