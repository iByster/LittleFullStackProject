import { StyleSheet, View, Image } from 'react-native';
import Avatar from './Avatar';
import ContainerWithTopBorder from '../containers/ContainerWithTopBorder';
import { Nullable } from '../types';

interface IProps {
  image: Nullable<string>;
  rightContent: React.ReactNode;
  delimitationLine?: boolean;
}

const AvatarRow: React.FC<IProps> = ({ image, rightContent, delimitationLine }) => {
  return (
    <ContainerWithTopBorder containerStyles={delimitationLine ? {} : { borderTopWidth: 0, marginTop: 0 }}>
      <View style={styles.container}>
        <Avatar image={image} stylesProp={styles.avatarStyle} />
        <View style={styles.rightContentContainer}>{rightContent}</View>
      </View>
    </ContainerWithTopBorder>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
  },
  avatarStyle: {
    marginRight: 15,
  },
  rightContentContainer: {
    display: 'flex',
    flexDirection: 'column',
  },
});

export default AvatarRow;
