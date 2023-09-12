import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions
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

const screenHeight = Dimensions.get('window').height;
const listHeight = screenHeight * 0.45;

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
      if (newReview) {
        reviewsData.filter((r: any) => r.id !== newReview.id);
      }
      setReviews(page === 1 ? reviewsData : [...newReviews, ...reviewsData]);
      setHasMore(hasMore);
      setLoading(false);
    };

    fetchData().catch(console.error);
  }, [page]);

  const renderReview = ({ item }: { item: ReviewEntity }) => {
    return <Review review={item} />;
  };

  const handleEmpty = () => {
    return <Text> No reviews!</Text>;
  };

  const handleStarPress = (starCount: number) => {
    setSelectedStars(starCount);
    navigation.navigate('ReviewForm', { selectedStars: starCount });
  };

  const handleRefresh = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 1000);
  };

  const handleLoadMore = () => {
    setPage(page + 1);
  };

  return (
    <WrapperContainer>
      <View style={styles.totalReviewContainer}>
        <AverageReview />
        <TouchableOpacity>
          <Text style={styles.viewAllReviewsText}>View all reviews</Text>
        </TouchableOpacity>
      </View>
      {newReview ? (
        <View>
          <ContainerWithTopBorder>
            <Text style={styles.latestReview}>Your review</Text>
          </ContainerWithTopBorder>

          <Review review={newReview} options />
        </View>
      ) : (
        <AvatarRow
          image={null}
          key={'rate'}
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
        <FlatList
          style={styles.reviewsContainer}
          data={reviews}
          scrollEnabled
          renderItem={renderReview}
          keyExtractor={(item) => item.id}
          ListEmptyComponent={handleEmpty}
          refreshControl={<RefreshControl refreshing={loading} onRefresh={handleRefresh} />}
        />
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
    marginTop: 40,
  },
  latestReview: {
    fontSize: 20,
    fontWeight: '700',
  },
  reviewsContainer: {
    height: listHeight,
  },
});

export default Reviews;
