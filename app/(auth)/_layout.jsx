import { View, Text } from 'react-native'
import React from 'react'
import { Stack, Redirect } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { useGlobalContext } from "../../context/GlobalProvider";
import { Loader } from "../../components";

const AuthLayout = () => {
  const { loading, isLogged } = useGlobalContext();

  if (!loading && isLogged) return <Redirect href="/Home" />;

  return (
    <>
      <Stack>
        <Stack.Screen
          name="sign-in"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="sign-up"
          options={{
            headerShown: false,
          }}
        />
      </Stack>

  <Loader isLoading={loading} />
  <StatusBar 
  backgroundColor='#616353'>

  </StatusBar>
  </>
  )
}

export default AuthLayout