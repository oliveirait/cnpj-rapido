import { useCallback, useState } from "react"
import { View, Text, TextInput, GestureResponderEvent, ActivityIndicator } from "react-native"
import { AntDesign } from '@expo/vector-icons';

import { styles } from "./styles";
import { ComponentButton } from "../../components/button";
import { CnpjProps } from "../../@types/cnpj"
import { CNPJ } from "../../services/api";
import { checkNetwork } from "../../utils/network";
import { simpleAlert } from "../../utils/alerts/simple";

import { useNavigation, useFocusEffect } from '@react-navigation/native'
import { Status } from "../../components/statusBar";
import { Banner } from "../../components/banner";
import { AppOpenAd, TestIds } from "react-native-google-mobile-ads";
import theme from "../../utils/theme/theme";


const adUnitId = __DEV__ ? TestIds.APP_OPEN : 'ca-app-pub-2213444535919704/1325028330';

const appOpenAd = AppOpenAd.createForAdRequest(adUnitId, {
  requestNonPersonalizedAdsOnly: true,
  keywords: ['fashion', 'clothing'],
});



export function Home () {
    const length_cnpj = 18
    const [cnpj, setCnpj] = useState('')
    const [loading, setLoading] = useState(false)
    const cnpj_regex = /^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/
    const { navigate } = useNavigation()


    function goNext (data: CnpjProps | GestureResponderEvent ) {
        navigate('result', {
            data: data
        })
    }
    
    async function getCnpjData (cnpj: string) { 
        const internet = await checkNetwork()
        if (!internet) {
            return simpleAlert({
                title: 'Sem internet', 
                description: 'Verifique sua conexão de rede'
            })
        }
        setLoading(true)
        const cnpj_replaced = cnpj.replace(/[/.-]/g, '')
        if (cnpj_replaced.length === 14) {
            CNPJ.get(cnpj_replaced)
                .then((data) => 
                    goNext(data.data)
                )
                .catch(() => {
                    simpleAlert({
                        title: 'CNPJ inválido', 
                        description: 'Verifique se está correto e tente novamente!'
                    })
                })
                .finally(() => 
                    setLoading(false)
                )
        }

        else {
            simpleAlert({
                title: '', 
                description: 'Formato invalido ou CNPJ incorreto!'
            })
            setLoading(false)
        }
    } 

    function inputText (input: string) { 
        setCnpj(input.trim().replace(cnpj_regex, "$1.$2.$3/$4-$5"))
    }


    useFocusEffect(
        useCallback(() => {
            console.log('buscando anuncio')
            appOpenAd.load()
            setTimeout(() => {
                
                if (appOpenAd.loaded) {
                    appOpenAd.show()
                }
                else if (!appOpenAd.loaded) {
                    console.log('nao carregou, tentando novamente')
                    appOpenAd.load()
                }
            }, 2000)
        }, [appOpenAd.load])
    )
    
    return (
        <View style={styles.container}> 
            <Status />
            <View style={styles.viewInput}>
                <Text style={styles.title}>Insira o CNPJ</Text>

                <TextInput 
                    placeholder="Digite ou cole o número do CNPJ"
                    value={cnpj}
                    cursorColor={theme.colors.black}
                    onChangeText={inputText}
                    maxLength={length_cnpj}
                    keyboardType="numeric"
                    style={styles.input}
                />

                <ComponentButton.ButtonWrapper 
                    style={[{...styles.button, backgroundColor: cnpj.length !== length_cnpj ? theme.colors.disable : theme.colors.blue}]}
                    onPress={() => getCnpjData(cnpj)} 
                    disabled={cnpj.length !== length_cnpj ? true : false}
                >
                    <ComponentButton.ButtonIcon icon={ loading ? <ActivityIndicator size={24} color={theme.colors.white}/> : <AntDesign name="search1" size={18} color={theme.colors.white} /> } />
                    <ComponentButton.ButtonText text={ loading ? 'Buscando...' : 'Buscar' } style={styles.textButton}/>
                </ComponentButton.ButtonWrapper>
            </View>

            <View style={styles.viewBanner}>
                <Banner />   
            </View>

        </View>
    )
}




