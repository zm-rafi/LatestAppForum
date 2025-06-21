import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name='landing'
      options={{
        headerShown: false,
      }}/>
      <Stack.Screen name='/SignUp'
      options={{
        headerShown: false,
        headerTitle: ''
      }}
      />
      <Stack.Screen name='/SignIn'
      options={{
        headerShown: false,
        headerTitle: ''
      }}/>
      
      <Stack.Screen name='(tabs)'
      options={{
        headerShown: false,
      }}
      />
      <Stack.Screen name='add-post/index'
      options={{
        headerTitle: 'add new post',
      }}
      />
    </Stack>
  )
}
