import React from "react";
import { Alert, Modal, StyleSheet, Text, View, Dimensions, TouchableOpacity } from "react-native";
import * as Color from '../../../global/Color'

const SimpleModalComponent = ({modalVisible, setModalVisible, text, buttonText}) => {
    
  return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            setModalVisible(!modalVisible);
            }}>
            <View style={styles.centeredView}>
            <View style={styles.modalView}>
                <Text style={styles.modalText}>{text}</Text>
                <TouchableOpacity
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}
                >
                    <Text style={styles.textStyle}>{buttonText}</Text>
                </TouchableOpacity>
            </View>
            </View>
        </Modal>
  );
};

const styles = StyleSheet.create({

  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    width: Dimensions.get('window').width * .6,
    marginRight: Dimensions.get('window').width * .3,
    marginLeft: Dimensions.get('window').width * .3,
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: Dimensions.get('window').height * .023,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.6,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 20,
    width: Dimensions.get('window').width * .4,
    paddingVertical: Dimensions.get('window').height * .01,
    paddingHorizontal: Dimensions.get('window').width * .1,
    elevation: 2,
    marginTop: Dimensions.get('window').height * .02,
    backgroundColor: Color.MAIN,
  },
  textStyle: {
    color: "#fff",
    textAlign: "center",
    fontSize: Dimensions.get('window').height * .02,
    fontFamily: 'PatrickHand'
  },
  modalText: {
    textAlign: 'center',
    color: "#444",
    fontSize: Dimensions.get('window').height * .028,
    lineHeight: Dimensions.get('window').height * .045,
    marginBottom: Dimensions.get('window').height * .015,
    fontFamily: 'PatrickHand'
  }
});

export default SimpleModalComponent;