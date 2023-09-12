import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons'; 

interface IProps {
  selectedStars: number;
  handleStarPress(startCount: number): void;
  size: number;
}

const RateStars: React.FC<IProps> = ({ selectedStars, handleStarPress, size }) => {
  return (
    <View>
      <View style={styles.starContainer}>
        {[1, 2, 3, 4, 5].map((starCount) => (
          <TouchableOpacity key={starCount} onPress={() => handleStarPress(starCount)}>
            {starCount <= selectedStars ? (
              <Ionicons name="star" size={size} color={'#FECD01'} />
            ) : (
              <Ionicons name="star-outline" size={size} color={'#CCCCCC'} />
            )}
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  starContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: 15,
  },
});

export default RateStars;
