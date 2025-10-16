import AsyncStorage from '@react-native-async-storage/async-storage'
import { DrawerActions, NavigationProp, ParamListBase, useNavigation } from '@react-navigation/native'
import React, { Dispatch, SetStateAction } from 'react'
import { ActivityIndicator, Image, ImageSourcePropType, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import RNRestart from 'react-native-restart'
import { DeleteIcon } from '../../constant/images'
import { useDeleteAccount } from '../../hooks/authApisCall'
import { useGlobalContext } from '../../providers/GlobalContextProvider'
import { hexToRGBA } from '../../utils/hexToRGBA'
const AccountDeleteModal = ({ setIsDeleteOpen }: { setIsDeleteOpen: Dispatch<SetStateAction<boolean>> }) => {
  const { themeColors,english } = useGlobalContext();
  const { deleteAccount, isLoading } = useDeleteAccount()
  const navigate = useNavigation<NavigationProp<ParamListBase>>();
  const handleDelete = () => {
    deleteAccount(async () => {
      await Promise.all([
        AsyncStorage.removeItem("token"),
        AsyncStorage.removeItem("")
      ])
      navigate.dispatch(DrawerActions.closeDrawer());
      RNRestart.restart();
    })
  }
  return (
    <TouchableOpacity
      onPress={() => setIsDeleteOpen(false)}
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: hexToRGBA(themeColors.black as string, .6)
      }}>
      <View style={{
        width: 320,
        borderRadius: 5,
        backgroundColor: themeColors.white as string,
        padding: 4,
        paddingVertical: 10
      }}>
        <Image
          style={{
            height: 50,
            width: 50,
            marginHorizontal: "auto",
            marginBottom: 5,
            tintColor: themeColors.red as string
          }}
          source={DeleteIcon as ImageSourcePropType}
        />
        <Text style={{
          textAlign: "center",
          marginVertical: 5,
          fontSize: 22,
          color: themeColors.red as string
        }}>
          {english ? "Confirm delete your account?" : "Confirmer la suppression de votre compte?"}
        </Text>
        <Text style={{
          textAlign: "center",
          color: hexToRGBA(themeColors.black as string, .7)
        }}>
          {english?"If you delete your account, all your data will be permanently removed and cannot be retrieved.":"Si vous supprimez votre compte, toutes vos données seront définitivement supprimées et ne pourront pas être récupérées."}
        </Text>
        <View style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: 15
        }}>

          <TouchableOpacity
            onPress={handleDelete}
            disabled={isLoading}
            activeOpacity={.7}
            style={{
              flex: 1,
              backgroundColor: "red",
              padding: 10,
              borderRadius: 5,
              marginRight: 5
            }}>
            <Text style={{ color: "white", textAlign: "center", fontWeight: "bold" }}>
              {
                isLoading ? <ActivityIndicator size='small' /> : english ? "Delete" : "Supprimer"
              }
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setIsDeleteOpen(false)}
            style={{
              flex: 1,
              backgroundColor: "green",
              padding: 10,
              borderRadius: 5,
              marginLeft: 5
            }}>
            <Text style={{ color: "white", textAlign: "center", fontWeight: "bold" }}>
              {english ? "Cancel" : "Annuler"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  )
}

export default AccountDeleteModal

const styles = StyleSheet.create({})