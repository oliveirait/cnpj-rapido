import { Alert, Linking } from "react-native"
import VersionCheck from 'expo-version-checker';


export async function checkVersion () {
    const update = await VersionCheck.needUpdate()

    if (typeof update !== 'undefined') {
        try {
            if (update?.isNeeded) {
                
                return Alert.alert(
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
           return console.log(`Erro ao atualizar ou buscar informacoes na playstore `)
        }
    }

    return console.log('o Aplicativo ainda nao esta na playstore')
    
}
 