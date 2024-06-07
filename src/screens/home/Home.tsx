import { AppImage } from '@components/AppImage'
import Header from '@components/Header'
import { AppText } from '@components/text/AppText'
import { useNavigation } from '@react-navigation/native'
import { Atoms } from '@state/Atoms'
import { AppColors } from '@utils/Colors'
import { useAtomValue } from 'jotai'
import React, { ReactElement } from 'react'
import { StyleSheet, View } from 'react-native'
import AppButton from '@components/AppButton'
import IonIcons from '@expo/vector-icons/Ionicons'
import { Spacer } from '@components/Spacer'
import { PressableOpacity } from 'react-native-pressable-opacity'
import { SCREEN_HEIGHT } from '@utils/Constants'
import ViewFiller from '@components/ViewFiller'
import { transactions } from '@types/transaction'
import TransactionList from '@screens/components/TransactionList'

export default function HomeScreen(): ReactElement {
  const mainNavigation = useNavigation()
  const user = useAtomValue(Atoms.User)

  const options = [
    {
      icon: 'add',
      name: 'Add Money',
    },
    {
      icon: 'swap-horizontal',
      name: 'Exchange',
    },
    {
      icon: 'information-circle-outline',
      name: 'Details',
    },
    {
      icon: 'ellipsis-horizontal',
      name: 'More',
    },
  ]

  function navigateToProfile(): void {
    mainNavigation.navigate('ProfileStack', {
      screen: 'Profile',
    })
  }

  return (
    <View style={styles.container}>
      <Header
        title="Zap"
        darker={true}
        headerRight={
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View>
              <AppButton
                label="Experiment"
                onPress={() =>
                  mainNavigation.navigate('ProfileStack', { screen: 'Experiment' })
                }
                customStyles={{ width: 100, height: 36, marginRight: 16 }}
              />
            </View>

            <AppImage
              source={user?.photo}
              width={36}
              height={36}
              onPress={navigateToProfile}
            />
          </View>
        }
      />
      <View style={styles.content}>
        <View style={styles.mainContainer}>
          <View style={styles.balanceContainer}>
            <AppText size="very-small" color={AppColors.white}>
              Main &#183; USD
            </AppText>
            <Spacer vertical={4} />
            <AppText size="very-large" color={AppColors.white} type="bold">
              $ 1.07
            </AppText>
            <Spacer vertical={12} />
            <PressableOpacity style={styles.accountsButton}>
              <AppText size="small" color={AppColors.white}>
                Accounts
              </AppText>
            </PressableOpacity>
          </View>
          <View style={styles.optionsContainer}>
            {options.map((_, index) => (
              <PressableOpacity style={styles.optionItem}>
                <View style={styles.optionImage}>
                  <IonIcons
                    // @ts-ignore
                    name={options[index]?.icon ?? ''}
                    size={22}
                    color={AppColors.white}
                  />
                </View>
                <Spacer vertical={8} />
                <AppText color={AppColors.white} size="very-small">
                  {options[index]?.name ?? ''}
                </AppText>
              </PressableOpacity>
            ))}
          </View>
        </View>
        <View style={styles.transactionsContainer}>
          <AppText size="large" type="medium" color={AppColors.black}>
            Transactions
          </AppText>
          <ViewFiller />
          <PressableOpacity
            onPress={() => {
              mainNavigation.navigate('HomeStack', { screen: 'Transactions' })
            }}>
            <AppText size="small" type="bold" color={AppColors.blue}>
              View All &#8594;
            </AppText>
          </PressableOpacity>
        </View>
        <View style={{ width: '100%', flex: 1 }}>
          <TransactionList limit={3} />
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: AppColors.greyBackground,
    flex: 1,
  },
  content: {
    flex: 1,
    alignItems: 'center',
  },
  mainContainer: {
    width: '100%',
    height: 0.35 * SCREEN_HEIGHT,
    backgroundColor: AppColors.primary,
  },
  accountsButton: {
    backgroundColor: AppColors.darkGrey,
    paddingHorizontal: 16,
    paddingVertical: 4,
    borderRadius: 32,
  },
  balanceContainer: {
    marginTop: 32,
    alignItems: 'center',
  },
  optionsContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'center',
    paddingHorizontal: 8,
    paddingBottom: 16,
  },
  optionItem: {
    width: '25%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  optionImage: {
    width: 44,
    height: 44,
    backgroundColor: AppColors.darkGrey,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  transactionsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginTop: 24,
  },
})
