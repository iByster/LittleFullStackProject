import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Modal from 'react-native-modal';

interface BottomAlertProps {
  isVisible: boolean;
  onSave: () => void;
  onCancel: () => void;
  onExit: () => void;
}

const BottomAlert: React.FC<BottomAlertProps> = ({ isVisible, onSave, onCancel, onExit }) => {
  return (
    <Modal
      isVisible={isVisible}
      style={styles.view}
      animationIn="slideInUp"
      animationOut="slideOutDown"
      swipeDirection={['up', 'left', 'right', 'down']}>
      <View style={styles.content}>
        <View>
          <View style={styles.contentOptionsContainer}>
            <TouchableOpacity onPress={onSave}>
              <Text style={styles.contentOptions}>Exit and save your review</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.contentOptionsContainer}>
            <TouchableOpacity onPress={onExit}>
              <Text style={[styles.contentOptions, styles.withoutSaving]}>Exit Without Saving</Text>
            </TouchableOpacity>
          </View>
          <View style={[styles.contentOptionsContainer, { borderBottomWidth: 0 }]}>
            <TouchableOpacity onPress={onCancel}>
              <Text style={styles.contentOptions}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export const styles = StyleSheet.create({
  view: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: 'white',
    padding: 22,
    borderRadius: 10,
    alignItems: 'center',
  },
  contentOptions: {
    fontSize: 20,
    marginBottom: 12,
    textAlign: 'center',
  },
  contentOptionsContainer: {
    borderBottomWidth: 0.3,
    borderBottomColor: '#979797',
    marginTop: 10,
  },
  withoutSaving: {
    color: 'red',
  }
});

export default BottomAlert;
