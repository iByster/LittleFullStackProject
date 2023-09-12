import { StyleSheet, View } from 'react-native';

interface IProps {
  children: React.ReactNode;
  containerStyles?: any;
}

const WrapperContainer: React.FC<IProps> = ({ children, containerStyles }) => {
  return <View style={[styles.container, containerStyles ]}>{children}</View>;
};

const styles = StyleSheet.create({
  container: {
    marginTop: 70,
    padding: 20,
    marginBottom: 500,
  },
});

export default WrapperContainer;
