import { useRef } from "react";
import { StyleSheet, Button } from "react-native";

import ColorPicker, { Panel1, HueSlider } from 'reanimated-color-picker';
import SwipeModal, { SwipeModalPublicMethods } from '@birdwingo/react-native-swipe-modal';



export const ColorPickerModal = ({ modalRef }) => {   
  const onSelectColor = ({ hex }: any) => {
    console.log(hex);
  }

  return (
    <SwipeModal ref={modalRef} showBar={true}>      
      <ColorPicker style={styles.colorPicker} value='red' onComplete={onSelectColor}>
        <Panel1 />
        <HueSlider />
      </ColorPicker>

      <Button title='Accept' onPress={() => modalRef.current?.hide()} />      
    </SwipeModal>
  )
}

const styles = StyleSheet.create({
  colorPicker: {
    flex: 1,
    margin: 12,
  },
});