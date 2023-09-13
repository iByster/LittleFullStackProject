import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, TextInput, Alert } from 'react-native';
import RateStars from '../components/RateStars';
import { RootStackParamList } from './RootStackParmList';
import WrapperContainer from '../containers/WrapperContainer';
import ContainerWithTopBorder from '../containers/ContainerWithTopBorder';
import { createReview, updateReview } from '../services/ReviewsService';
import { useReviewContext } from '../context/CurrentReviewContent';
import BottomAlert from '../components/BottomAlert';

interface IProps {}

const ReviewForm: React.FC<IProps> = ({}) => {
  const route = useRoute<RouteProp<RootStackParamList, 'ReviewForm'>>();
  const { newReview: newReviewContext, saveNewReview } = useReviewContext();
  const [selectedStars, setSelectedStars] = React.useState(route.params.selectedStars);
  const [name, setName] = React.useState<string>(route.params?.name || '');
  const [description, setDescription] = React.useState<string>(route.params?.description || '');
  const [isAlertVisible, setAlertVisible] = React.useState(false);
  const navigation = useNavigation();

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerStyle: { backgroundColor: '#34AFF4' },
      headerLeft: () => (
        <TouchableOpacity onPress={handleClose}>
          <Text style={styles.headerButtons}>Close</Text>
        </TouchableOpacity>
      ),
      headerRight: () => (
        <TouchableOpacity onPress={handleSave}>
          <Text style={styles.headerButtons}>Save</Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation, description, name, selectedStars, isAlertVisible, setAlertVisible, newReviewContext]);

  const handleSave = async () => {
    let newReview;

    if (newReviewContext) {
        newReview = await updateReview(newReviewContext.id, selectedStars, description, name);
    } else {
        newReview = await createReview(selectedStars, description, name);
    }

    saveNewReview(newReview);

    Alert.alert(
        'Thank you for your review',
        "You're helping others make smarter decisions every day.",
        [
          {
            text: 'Okay!',
            onPress: () => {
              navigation.goBack();
            },
          },
        ],
        { cancelable: false }
      );
  };

  const handleClose = () => {
    setAlertVisible(true);
  };

  const handleStarPress = (starCount: number) => {
    setSelectedStars(starCount);
  };

  const getStarText = () => {
    let text;

    switch (selectedStars) {
      case 1:
        text = 'I hated it';
        break;
      case 2:
        text = "I didn't like it";
        break;
      case 3:
        text = 'It was OK';
        break;
      case 4:
        text = 'I liked it';
        break;
      case 5:
        text = 'I loved it!';
        break;
    }

    return text;
  };

  const handleAlertSave = async () => {
    setAlertVisible(false);
    await handleSave();
  };

  const handleExitWithoutSaving = () => {
    setAlertVisible(false);
    navigation.goBack();
  };

  const handleCancel = () => {
    setAlertVisible(false);
  };

  return (
    <WrapperContainer containerStyles={styles.formContainer}>
      <View style={styles.starRatingContainer}>
        <RateStars handleStarPress={handleStarPress} selectedStars={selectedStars} size={45} />
        <Text style={styles.startText}>{getStarText()}</Text>
      </View>
      <ContainerWithTopBorder containerStyles={{ paddingTop: 10 }}>
        <TextInput
          placeholderTextColor={'#979797'}
          style={styles.input}
          placeholder="Your name"
          defaultValue={name}
          onChangeText={(text) => setName(text)}
        />
      </ContainerWithTopBorder>

      <View style={{ height: 100, marginTop: 10 }}>
        <TextInput
          placeholderTextColor={'#979797'}
          style={[styles.input, styles.inputDescription]}
          placeholder="Add more details on your experience..."
          multiline
          numberOfLines={4}
          defaultValue={description}
          onChangeText={(text) => setDescription(text)}
        />
      </View>
      <BottomAlert
        isVisible={isAlertVisible}
        onSave={handleAlertSave}
        onExit={handleExitWithoutSaving}
        onCancel={handleCancel}
      />
    </WrapperContainer>
  );
};

const styles = StyleSheet.create({
  starRatingContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  formContainer: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: 10,
    marginBottom: 0,
  },
  headerButtons: {
    color: 'white',
    fontSize: 19,
    fontWeight: '500',
  },
  startText: {
    marginTop: 20,
    color: '#979797',
    fontSize: 18,
  },
  input: {
    borderBottomWidth: 0.3,
    borderBottomColor: '#979797',
    fontSize: 18,
    paddingBottom: 10
  },
  inputDescription: {
    paddingBottom: 60,
  }
});

export default ReviewForm;
