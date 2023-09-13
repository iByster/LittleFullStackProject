import React from 'react';
import WrapperContainer from '../containers/WrapperContainer';
import ReviewEntity from '../entities/Review';
import { getAllReviews } from '../services/ReviewsService';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import Review from '../components/Review';

interface IProps {}

const AllReviews: React.FC<IProps> = ({}) => {
  const [reviews, setReviews] = React.useState<ReviewEntity[]>([]);
  const [loading, setLoading] = React.useState<boolean>(false);

  React.useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const reviews = await getAllReviews();
      setReviews(reviews);
      setLoading(false);
    };

    fetchData().catch(console.error);
  }, []);

  return (
    <WrapperContainer containerStyles={{ marginTop: 70 }}>
      <View style={styles.reviewsContainer}>
        {reviews && reviews.map((review) => (
          <Review review={review} key={review.id} delimitationLine />
        ))}
      </View>
      {loading && <ActivityIndicator size="large" color={'#87C1FF'} />}
    </WrapperContainer>
  );
};

const styles = StyleSheet.create({
  reviewsContainer: {
    marginBottom: 40,
  },
});

export default AllReviews;
