import {
  StyleSheet,
  Text,
  View,
  Modal,
  
  
  TouchableWithoutFeedback,
} from 'react-native'
import React, { useEffect, useRef } from 'react'
import { COLORS, SIZES, SCREEN_WIDTH, SCREEN_HEIGHT } from '../constants/THEME'
import { StatusBar } from 'react-native'

interface ModalProps {

}

const CustomModal = ({

 
}: ModalProps) => {


  return (
    <Modal
      visible={false}
      transparent={true}
      animationType="slide"
      onRequestClose={() => (false)}>
      <TouchableWithoutFeedback onPress={() => (false)}>
        <View style={styles.modalBackdrop}>
          <StatusBar backgroundColor={'rgba(255, 255, 255, 0.5)'} />
          
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  )
}

export default CustomModal

const styles = StyleSheet.create({
  modalBackdrop: {
    flex: 1,
    backgroundColor: '#ffffff80',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: SCREEN_WIDTH * 0.7,
    borderRadius: SIZES.padding,
    alignItems: 'center',
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    borderColor: COLORS.primary,
    borderWidth: 5,
    height: SCREEN_HEIGHT * 0.28,
  },
  line: {
    height: 1,
    backgroundColor: 'black',
    width: '40%',
  },
})
