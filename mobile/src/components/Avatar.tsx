import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { Nullable } from '../types';

interface IProps {
  image: Nullable<string>;
  stylesProp?: any;
}

const Avatar: React.FC<IProps> = ({ image, stylesProp }) => {
  return (
    <View style={[styles.container, image ? {} : { backgroundColor: '#CBCBCB' }, stylesProp]}>
      {image ? (
        <Image source={{ uri: image }} style={styles.image} resizeMode={'cover'} onError={(error) => console.error('Image loading error:', error)} />
      ) : (
        <FontAwesome5 name="user-alt" size={22} color="white" />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 50,
    height: 50,
    borderRadius: 50 / 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 50 / 2,
  },
});

export default Avatar;
