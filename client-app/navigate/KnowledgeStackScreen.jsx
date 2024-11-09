import { createNativeStackNavigator } from '@react-navigation/native-stack';
import KnowledgeScreen from '../screens/KnowledgeScreen';
import KnowledgeDetailScreen from '../screens/KnowledgeDetailScreen';

const KnowledgeStack = createNativeStackNavigator();

export default function KnowledgeStackScreen() {
  return (
    <KnowledgeStack.Navigator>
      <KnowledgeStack.Screen
        name="KnowledgeScreen"
        component={KnowledgeScreen}
        options={{ headerShown: false }}
         />
      <KnowledgeStack.Screen
        name="สาระน่ารู้"
        component={KnowledgeDetailScreen} options={{
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: '#69AFEF', // Background color
            elevation: 0, // Removes shadow on Android
            shadowOpacity: 0, // Removes shadow on iOS
          },
          headerTintColor: '#fff',
        }} />
    </KnowledgeStack.Navigator>
  );
}
