import React from 'react';
import { getAverageStars } from '../services/ReviewsService';
import { StyleSheet, Text, View } from 'react-native';
import { useReviewContext } from '../context/CurrentReviewContent';

interface IProps {}

const AverageReview: React.FC<IProps> = ({}) => {
  const [averageStars, setAverageStars] = React.useState<number | null>(null);
  const [count, setCount] = React.useState<number>(0);
  let averageContainerColor = '#ff6347';
  const { newReview } = useReviewContext();

  React.useEffect(() => {
    const fetchData = async () => {
      const { averageStars, count } = await getAverageStars();
      setAverageStars(averageStars);
      setCount(count);
    };

    fetchData().catch(console.error);
  }, [newReview]);

  if (averageStars !== null) {
    if (averageStars < 2.5) {
      averageContainerColor ='#ff6347';
    } else if (averageStars >= 2.5 && averageStars <= 4) {
      averageContainerColor ='#FEDE00';
    } else {
      averageContainerColor ='#32cd32';
    }
  }

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.averageContainer,
          { backgroundColor: averageContainerColor },
        ]}>
        <Text style={styles.averageText}>{averageStars}</Text>
      </View>
      <Text style={styles.totalText}>from {count} ratings</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  averageContainer: {
    width: 50,
    height: 50,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  averageText: {
    textAlign: 'center',
    fontWeight: '900',
    fontSize: 22,
    color: '#303234',
  },
  totalText: {
    color: '#979797',
  },
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default AverageReview;
