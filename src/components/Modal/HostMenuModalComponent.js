import React, { useState } from "react";
import { Alert, Modal, StyleSheet, Text, View, Dimensions, TouchableOpacity } from "react-native";
import * as Color from '../../../global/Color'

const HostMenuModalComponent = ({modalVisible, setModalVisible, editGame, newGame, quit}) => {

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
                    <TouchableOpacity
                    style={styles.button}
                    onPress={newGame}
                    >
                        <Text style={styles.textStyle}>New Game</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                    style={styles.button}
                    onPress={editGame}
                    >
                        <Text style={styles.textStyle}>Edit Game</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                    style={styles.button}
                    onPress={() => quit(true)}
                    >
                        <Text style={styles.textStyle}>Quit</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                    style={styles.button2}
                    onPress={() => setModalVisible(!modalVisible)}
                    >
                        <Text style={styles.textStyle2}>Close</Text>
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
  },
  modalView: {
    width: Dimensions.get('window').width * .8,
    marginRight: Dimensions.get('window').width * .1,
    marginLeft: Dimensions.get('window').width * .1,
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: Dimensions.get('window').height * .025,
    paddingBottom: Dimensions.get('window').height * .04,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.4,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    width: Dimensions.get('window').width * .6,
    backgroundColor: Color.MAIN,
    paddingVertical: Dimensions.get('window').width * .02,
    borderRadius: 20,
    paddingHorizontal: Dimensions.get('window').width * .08,
    elevation: 2,
    marginTop: Dimensions.get('window').height * .02,
  },
  textStyle: {
    color: "#fff",
    textAlign: "center",
    fontSize: Dimensions.get('window').height * .025,
    fontFamily: 'PatrickHand'
  },
  button2: {
    width: Dimensions.get('window').width * .6,
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: Color.MAIN,
    paddingVertical: Dimensions.get('window').width * .02,
    borderRadius: 20,
    paddingHorizontal: Dimensions.get('window').width * .08,
    elevation: 2,
    marginTop: Dimensions.get('window').height * .02,
  },
  textStyle2: {
    color: Color.MAIN,
    textAlign: "center",
    fontSize: Dimensions.get('window').height * .025,
    fontFamily: 'PatrickHand'
  }
});

export default HostMenuModalComponent;