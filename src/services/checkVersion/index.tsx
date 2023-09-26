import { Alert, Linking } from "react-native"
import VersionCheck from 'expo-version-checker';


export async function checkVersion () {
    const update = await VersionCheck.needUpdate()

    try {
        if (update?.isNeeded) {
            
            Alert.alert(
                'Nova versão disponível!',
                'Atualize seu aplicativo para correção de falhas ou novas funcionalidades.',
                [
                    {text: 'Não', style: 'cancel'},
                    {text: 'Atualizar agora', onPress: () => Linking.canOpenURL(update.storeUrl)}
                ],
    
                {cancelable: false}
            )
        }
    }
    catch (error) {
        console.log(`Erro ao atualizar ${error} `)
    }
}
