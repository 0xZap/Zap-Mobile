/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-var-requires */
import React from 'react'
import type { Screen } from './Router'

type ScreenType = React.ComponentType<unknown>
type ScreenBuilderType = () => ScreenType

const screenBuilderRegistry = new Map<Screen, ScreenBuilderType>()

/**
 * Returns a function for lazily loading a screen. Pass this to the `getComponent` prop of `<Stack.Screen>`.
 * Calling this function with the same argument again results in a cached result being returned.
 */
export function getScreenBuilder(screen: Screen): ScreenBuilderType {
  if (!screenBuilderRegistry.has(screen)) {
    let cached: ScreenType | null = null
    const builder = (): ScreenType => {
      if (cached == null) {
        console.log('😴', `Lazily registering Screen "${screen}"...`)

        cached = getScreen(screen)
        if (cached == null) {
          throw new Error(
            `Screen "${screen}" could not be found - Make sure it is default-exported ('export default function MyScreen')`,
          )
        }

        if (typeof cached === 'function') {
          cached = React.memo(cached)
        } else if (typeof cached === 'object') {
          // @ts-expect-error cached is `any` now
          if (cached instanceof React.Component) {
            console.warn(
              '🧭',
              `Screen "${screen}" appears to be a class component, refactor it to a Function Component instead!`,
            )
          } else if ('default' in cached) {
            throw new Error(
              `Screen "${screen}" seems to be imported incorrectly. Did you forget to use .default at the end of the require(...) statement in ScreenRegistry.ts?`,
            )
          } else {
            throw new Error(
              `Screen "${screen}" cannot be registered, it's of type object. ${JSON.stringify(
                cached,
              )}`,
            )
          }
        }
        if (cached.displayName == null) cached.displayName = screen
      }
      return cached
    }
    screenBuilderRegistry.set(screen, builder)
  }

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  return screenBuilderRegistry.get(screen)!
}

function getScreen(screenName: Screen): ScreenType {
  switch (screenName) {
    // -------------------- Onboarding Stack --------------------
    case 'OnboardingStack':
      return require('./OnboardingNavigator').default
    case 'Welcome':
    return require('../screens/onboarding/Welcome').default
    case 'Signup':
      return require('../screens/onboarding/Signup').default
    
    // -------------------- Profile --------------------
    case 'ProfileStack':
      return require('./ProfileNavigator').default
    case 'Profile':
      return require('../screens/profile/Profile').default
    case 'ResetPassword':
      return require('../screens/profile/ResetPassword').default
    // -------------------- Fallback --------------------
    default:
      return require('../screens/onboarding/Signup').default
  }
}
