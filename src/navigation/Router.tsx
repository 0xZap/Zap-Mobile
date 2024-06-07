import type { NavigatorScreenParams } from '@react-navigation/native'
import type { NativeStackScreenProps } from '@react-navigation/native-stack'
import type { RouteProp as NRouteProp } from '@react-navigation/native'

export type MainStack = {
  OnboardingStack: NavigatorScreenParams<OnboardingStack>
  ProfileStack: NavigatorScreenParams<ProfileStack>
  HomeStack: NavigatorScreenParams<HomeStack>
}

export type OnboardingStack = {
  Welcome: undefined
  Signup: undefined
}

export type ProfileStack = {
  Profile: undefined
  Experiment: undefined
}

export type HomeStack = {
  Home: undefined
  Transactions: undefined
}

export type AllScreens =
  | keyof MainStack
  | keyof OnboardingStack
  | keyof ProfileStack
  | keyof HomeStack

export type ScreenProps<ScreenName extends AllScreens> =
  ScreenName extends keyof MainStack
    ? NativeStackScreenProps<MainStack, ScreenName>
    : ScreenName extends keyof OnboardingStack
    ? NativeStackScreenProps<OnboardingStack, ScreenName>
    : ScreenName extends keyof ProfileStack
    ? NativeStackScreenProps<ProfileStack, ScreenName>
    : ScreenName extends keyof HomeStack
    ? NativeStackScreenProps<HomeStack, ScreenName>
    : never

export type Screen = AllScreens

export type AllStacks = MainStack & OnboardingStack & ProfileStack & HomeStack

declare global {
  namespace ReactNavigation {
    interface RootParamList extends AllStacks {}
  }
}

export type RouteProp<T extends keyof AllStacks> = NRouteProp<AllStacks, T>
