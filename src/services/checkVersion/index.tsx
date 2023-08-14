import { Alert, Linking } from "react-native"
import VersionCheck from 'expo-version-checker';


async function openURL (URL: string) {
    const isLink = await Linking.canOpenURL(URL)
    isLink ?? Linking.openURL(URL)
  }


export async function checkVersion () {
    const update = await VersionCheck.needUpdate()

    try {
        if (update?.isNeeded) {
            console.log(update?.isNeeded)
            Alert.alert(
                'Nova versão disponível!',
                'Uma nova atualização está disponível, deseja atualizar agora?',
                [
                    {text: 'Não', style: 'cancel'},
                    {text: 'Atualizar agora', onPress: () => openURL(update.storeUrl) }
                ],
    
                {cancelable: false}
            )
        }
    }
    catch (error) {
        console.log(`Erro ao atualizar ${error} `)
    }
}
