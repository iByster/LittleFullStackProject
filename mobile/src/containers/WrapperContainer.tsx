import { Dimensions, ScrollView, StyleSheet } from 'react-native';

const screenHeight = Dimensions.get('window').height;

interface IProps {
  children: React.ReactNode;
  containerStyles?: any;
}

const WrapperContainer: React.FC<IProps> = ({ children, containerStyles }) => {
  return <ScrollView style={[styles.container, containerStyles ]}>{children}</ScrollView>;
};

const styles = StyleSheet.create({
  container: {
    marginTop: 70,
    padding: 20,
    height: screenHeight
  },
});

export default WrapperContainer;
