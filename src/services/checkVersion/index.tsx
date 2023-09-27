import { Alert, Linking, ToastAndroid } from "react-native"
import VersionCheck from 'expo-version-checker';



export async function checkVersion () {
    ToastAndroid.show('Verificando atualizações...', ToastAndroid.SHORT)
    const update = await VersionCheck.needUpdate()

    if (typeof update !== 'undefined') {
        try {
            if (update?.isNeeded) {
                
                Alert.alert(
                    'Nova versão disponível!',
                    'Atualize seu aplicativo para correção de falhas ou novas funcionalidades.',
                    [
                        {text: 'Não', style: 'cancel'},
                        {text: 'Atualizar agora', onPress: async () => await Linking.openURL(update?.storeUrl)}
                    ],
        
                    {cancelable: false}
                )
                return
            }
        }
        catch (error) {
           console.log(`Erro ao atualizar ou buscar informacoes na playstore `)
           return 
        }
    }

    return console.log('o Aplicativo ainda nao esta na playstore')
    
}
 