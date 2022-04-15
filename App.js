import Feed from "./pages/feed";
import Details from "./pages/details";
import React from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";


const Stack = createStackNavigator();

function MyStack(){
  return(
    <Stack.Navigator>
      <Stack.Screen
      name='Feed'
      component={Feed}
      options={{ headerShown: false }}>
      </Stack.Screen>

      <Stack.Screen
      name='Details'
      component={Details}></Stack.Screen>
      </Stack.Navigator>

     
  )
}

export default function App(){
  return(
    <NavigationContainer>
      <MyStack>

      </MyStack>
    </NavigationContainer>
  )
}

