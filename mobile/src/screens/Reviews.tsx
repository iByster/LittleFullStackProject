import {
  ActivityIndicator,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import AverageReview from '../components/AverageReviews';
import WrapperContainer from '../containers/WrapperContainer';
import AvatarRow from '../components/AvatarRow';
import React from 'react';
import ReviewEntity from '../entities/Review';
import { getReviewsPaginated } from '../services/ReviewsService';
import Review from '../components/Review';
import RateStars from '../components/RateStars';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from './RootStackParmList';
import { useReviewContext } from '../context/CurrentReviewContent';
import ContainerWithTopBorder from '../containers/ContainerWithTopBorder';

interface IProps {}

const Reviews: React.FC<IProps> = ({}) => {
  const [reviews, setReviews] = React.useState<ReviewEntity[]>([]);
  const [page, setPage] = React.useState<number>(1);
  const [hasMore, setHasMore] = React.useState<boolean>(true);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [selectedStars, setSelectedStars] = React.useState(0);
  const { newReview } = useReviewContext();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const pageSize = 3;

  React.useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const newReviews = page === 1 ? [] : [...reviews];
      const { reviews: reviewsData, hasMore } = await getReviewsPaginated(page, pageSize);
      const filteredReviewsData = newReview
        ? reviewsData.filter((r: ReviewEntity) => r.id !== newReview.id)
        : reviewsData;
      setReviews(page === 1 ? reviewsData : [...newReviews, ...reviewsData]);
      setHasMore(hasMore);
      setLoading(false);
    };

    fetchData().catch(console.error);
  }, [page]);

  const handleStarPress = (starCount: number) => {
    setSelectedStars(starCount);
    navigation.navigate('ReviewForm', { selectedStars: starCount });
  };

  const handleLoadMore = () => {
    setPage(page + 1);
  };

  const handleAllReviews = () => {
    navigation.navigate('AllReviews', {});
  };

  return (
    <WrapperContainer>
      <View style={styles.totalReviewContainer}>
        <AverageReview />
        <TouchableOpacity onPress={handleAllReviews}>
          <Text style={styles.viewAllReviewsText}>View all reviews</Text>
        </TouchableOpacity>
      </View>
      {newReview ? (
        <View>
          <ContainerWithTopBorder>
            <Text style={styles.latestReview}>Your review</Text>
          </ContainerWithTopBorder>

          <Review review={newReview} options delimitationLine={false} />
        </View>
      ) : (
        <AvatarRow
          image={null}
          key={'rate'}
          delimitationLine
          rightContent={
            <View>
              <Text style={styles.rateSectionHeader}>Rate and review</Text>
              <Text style={styles.rateSectionSubheading}>Share your experience to help others</Text>
              <RateStars
                handleStarPress={handleStarPress}
                selectedStars={selectedStars}
                size={40}
              />
            </View>
          }
        />
      )}
      <SafeAreaView>
        <ContainerWithTopBorder>
          <Text style={styles.latestReview}>Latest reviews</Text>
        </ContainerWithTopBorder>
        <View style={styles.reviewsContainer}>
          {reviews &&
            reviews.map((review) => <Review review={review} key={review.id} delimitationLine />)}
        </View>
        {loading && <ActivityIndicator size="large" color={'#87C1FF'} />}
        {hasMore && (
          <View style={styles.loadMoreContainer}>
            <TouchableOpacity onPress={handleLoadMore}>
              <Text style={styles.viewAllReviewsText}>See more</Text>
            </TouchableOpacity>
          </View>
        )}
      </SafeAreaView>
    </WrapperContainer>
  );
};

const styles = StyleSheet.create({
  totalReviewContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  viewAllReviewsText: {
    color: '#87C1FF',
    fontSize: 19,
    fontWeight: '500',
  },
  rateSectionHeader: {
    fontWeight: '700',
    fontSize: 20,
    color: '#303234',
  },
  rateSectionSubheading: {
    color: '#979797',
    marginBottom: 10,
  },
  loadMoreContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 40,
  },
  latestReview: {
    fontSize: 20,
    fontWeight: '700',
  },
  reviewsContainer: {
    marginBottom: 40,
  },
});

export default Reviews;
