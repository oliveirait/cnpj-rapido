import { useCallback, useEffect, useState } from "react"
import { View, Text, TextInput, ActivityIndicator, LayoutChangeEvent } from "react-native"
import { AntDesign } from '@expo/vector-icons';
import { AppOpenAd, TestIds } from "react-native-google-mobile-ads";
import { useNavigation, useFocusEffect } from '@react-navigation/native'

import { styles } from "./styles";
import { ComponentButton } from "../../components/button";
import { CnpjProps } from "../../@types/cnpj"
import { get_CNPJ } from "../../services/api";
import { checkNetwork } from "../../utils/network";
import { simpleAlert } from "../../utils/alerts/simple";
import { Status } from "../../components/statusBar";
import { Banner } from "../../components/banner";
import theme from "../../utils/theme/theme";
import { Loading } from "../../components/loading";


const adUnitId = __DEV__ ? TestIds.APP_OPEN : 'ca-app-pub-2213444535919704/1325028330';
const appOpenAd = AppOpenAd.createForAdRequest(adUnitId, 
{
  requestNonPersonalizedAdsOnly: true,
  keywords: ['fashion', 'clothing'],
});


export function Home () {
    const [loaded, setLoaded] = useState(false)
    const length_cnpj = 18
    const [cnpj, setCnpj] = useState('')
    const [loading, setLoading] = useState(false)
    const cnpj_regex = /^(\d{2})(\d{3})(\d{3})(\d{4})/
    const { navigate } = useNavigation()

    function layoutloaded (eventLoaded: LayoutChangeEvent) 
    {
        if (eventLoaded.nativeEvent.layout) 
        {
            console.log('layout loaded!')
            setLoaded(true)
        }
    }

    function goNextPage (data: CnpjProps) 
    {
        navigate('result', {data: data})
    }

    
    async function getCnpjData (cnpj: string) 
    { 
        setLoading(true)
        const internet = await checkNetwork()
        if (!internet)
        {
            return simpleAlert(
                {
                    title: 'Sem internet', 
                    description: 'Verifique sua conexão de rede'
                }
            )
        }
        
        const cnpj_replaced = cnpj.replace(/[/.-]/g, '')
        if (cnpj_replaced.length === 14)
        {
          get_CNPJ.get(cnpj_replaced)
            .then((data) => 
                goNextPage(data.data)
            )
            .catch((e) => 
            {
              console.log(JSON.stringify(e))
              simpleAlert(
              {
                  title: 'CNPJ inválido', 
                  description: 'Verifique se está correto e tente novamente!'
              })
            })
            .finally(() => 
              setLoading(false)
            )
        }

        else 
        {
          simpleAlert(
          {
            title: '', 
            description: 'Formato invalido ou CNPJ incorreto!'
          })
          setLoading(false)
        }
    } 


    function inputText (input: string) 
    {
        const char = input.trim()
        setCnpj(char.replace(cnpj_regex, "$1.$2.$3/$4-"))       
    }


    useFocusEffect(
      useCallback(() => 
      {
        console.log('buscando anuncio')
        appOpenAd.load()
        setTimeout(() => 
        {    
          if (appOpenAd.loaded) 
          {
            appOpenAd.show()
          }
          else if (!appOpenAd.loaded) 
          {
            console.log('nao carregou, tentando novamente')
            appOpenAd.load()
          }
        }, 2000)
      }, [appOpenAd.load])
    )

    
    return (
            <>       
            <Status />
            <View onLayout={layoutloaded} style={styles.container}>
                { loaded ?
                <>
                    <View style={styles.viewInput} >
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
                            <ComponentButton.ButtonIcon 
                                icon={ loading 
                                    ? <ActivityIndicator size={24} color={theme.colors.white}/> 
                                    : <AntDesign name="search1" size={18} color={theme.colors.white} /> 
                                }/>
                            <ComponentButton.ButtonText 
                                text={ loading ? 'Buscando...' : 'Buscar' } 
                                style={styles.textButton}
                            />
                        </ComponentButton.ButtonWrapper>
                    </View>

                    <View style={styles.viewBanner}>
                        <Banner />   
                    </View>
                </>
                : 

                <Loading size={32} color={theme.colors.blue} justify={"flex-start"}/>
                }

            </View>

        </>
    )
}




