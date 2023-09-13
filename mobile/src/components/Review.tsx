import React from 'react';
import ReviewEntity from '../entities/Review';
import AvatarRow from './AvatarRow';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { Dimensions } from 'react-native';
import { SimpleLineIcons } from '@expo/vector-icons';
import moment from 'moment';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../screens/RootStackParmList';

const screenWidth = Dimensions.get('window').width;
const descriptionContainerWidth = screenWidth * 0.7;

interface IProps {
  review: ReviewEntity;
  options?: boolean;
  delimitationLine?: boolean;
}

const Review: React.FC<IProps> = ({ review, options, delimitationLine }) => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const renderStars = () => {
    const starsCount = review.stars || 0;
    const maxStars = 5;
    const starIcons = [];

    for (let i = 1; i <= maxStars; i++) {
      if (i <= starsCount) {
        starIcons.push(<Entypo key={i} name="star" size={15} color="#FECD01" />);
      } else {
        starIcons.push(<Entypo key={i} name="star" size={15} color="#CBCBCB" />);
      }
    }

    return starIcons;
  };

  const handleEdit = () => {
    const { user, description, stars } = review;
    navigation.navigate('ReviewForm', { selectedStars: stars, description, name: user?.name });
  };

  const renderReviewContent = () => {
    const { description, createdAt, user } = review;

    return (
      <View style={styles.reviewContainer}>
        <View style={styles.headerContainer}>
          <Text style={styles.username}>{user?.name ? user.name : 'Annonymus'}</Text>
          {options && (
            <TouchableOpacity onPress={handleEdit}>
              <SimpleLineIcons name="options" size={20} color="#979797" />
            </TouchableOpacity>
          )}
        </View>
        <View style={styles.ratingContainer}>
          <View style={styles.startContainer}>{renderStars()}</View>
          <Text style={styles.createdAt}>
            {moment.utc(createdAt).local().startOf('seconds').fromNow()}
          </Text>
        </View>
        <View style={styles.descriptionContainer}>
          {description && (
            <Text numberOfLines={3} style={styles.description}>
              {description}
            </Text>
          )}
          {!description && options && (
            <TouchableOpacity onPress={handleEdit}>
              <Text style={styles.describeExperice}>Describe your experience</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  };

  return (
    <AvatarRow
      delimitationLine={delimitationLine}
      image={review.user?.image}
      rightContent={renderReviewContent()}
    />
  );
};

const styles = StyleSheet.create({
  description: {},
  username: {
    fontWeight: 'bold',
  },
  startContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
  descriptionContainer: {
    width: descriptionContainerWidth,
  },
  reviewContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: 5,
  },
  ratingContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  createdAt: {
    color: '#979797',
    fontSize: 13,
  },
  headerContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  describeExperice: {
    color: '#87C1FF',
    fontSize: 15,
    fontWeight: '600',
  },
});

export default Review;
