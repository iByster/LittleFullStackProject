import { StyleSheet, View } from 'react-native';

interface IProps {
  children: React.ReactNode;
  containerStyles?: any;
}

const ContainerWithTopBorder: React.FC<IProps> = ({ children, containerStyles }) => {
  return <View style={[styles.container, containerStyles]}>{children}</View>;
};

const styles = StyleSheet.create({
  container: {
    borderTopWidth: 0.3,
    borderTopColor: '#979797',
    paddingTop: 20,
    marginTop: 20,
  },
});

export default ContainerWithTopBorder;
