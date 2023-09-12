import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Reviews from './src/screens/Reviews';
import { NavigationContainer } from '@react-navigation/native';
import ReviewForm from './src/screens/ReviewForm';
import { ReviewContextProvider } from './src/context/CurrentReviewContent';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <ReviewContextProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Reviews"
            component={Reviews}
            options={{
              headerTransparent: true,
              headerLargeTitle: true,
              headerTitleStyle: {
                fontWeight: 'bold',
                fontSize: 25,
              },
            }}
          />
          <Stack.Screen
            name="ReviewForm"
            component={ReviewForm}
            options={{
              headerTitleAlign: 'center',
              title: 'Review my app',
              headerTintColor: 'white',
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </ReviewContextProvider>
  );
}
