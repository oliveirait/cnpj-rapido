import { useCallback, useState } from "react"
import { View, Text, TextInput, ActivityIndicator, LayoutChangeEvent } from "react-native"
import { AntDesign } from '@expo/vector-icons';
import { AppOpenAd, TestIds } from "react-native-google-mobile-ads";
import { useNavigation, useFocusEffect } from '@react-navigation/native'

import { styles } from "./styles";
import { ComponentButton } from "../../components/button";
import { get_CEP } from "../../services/api";
import { checkNetwork } from "../../utils/network";
import { simpleAlert } from "../../utils/alerts/simple";
import { Status } from "../../components/statusBar";
import { Banner } from "../../components/banner";
import theme from "../../utils/theme/theme";
import { Loading } from "../../components/loading";
import { cepMask } from "../../utils/masks";
import { CepProps } from "../../@types/cep";
import { cCEP, cLENGTH_CEP } from "../../utils/constants";
import { AxiosError } from "axios";



const adUnitId = __DEV__ ? TestIds.APP_OPEN : 'ca-app-pub-2213444535919704/1325028330';
const appOpenAd = AppOpenAd.createForAdRequest(adUnitId, 
{
  requestNonPersonalizedAdsOnly: true,
  keywords: ['fashion', 'clothing'],
});


export function CepScreen () {
    const [loaded, setLoaded] = useState(false)
    const [cep, setCep] = useState('')
    const [loading, setLoading] = useState(false)
    const { navigate } = useNavigation()
    const [result, setResult] = useState('')

    function layoutloaded (eventLoaded: LayoutChangeEvent) 
    {
        if (eventLoaded.nativeEvent.layout) 
        {
            console.log('layout loaded!')
            setLoaded(true)
        }
    }

    function goNextPage (data: CepProps) 
    {
        navigate('cep', {data: data})
    }

    
    async function getCepData (cep: string) 
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
        
        const cep_replaced = cep.replace(/[/.-]/g, '')
        if (cep_replaced.length === (cLENGTH_CEP-2))
        {
          get_CEP.get(cep_replaced)
            .then((data) => 
                //goNextPage(data.data)
                setResult(data.data)
            )
            .catch((e: AxiosError) => 
            {
              if (e.response?.status === 404)
              {
                return simpleAlert(
                    {
                        title: 'CEP não encontrado', 
                        description: 'Verifique se a numeração está correta.'
                    })
              }

              else 
              {
                return simpleAlert(
                    {
                        title: 'Falha ao buscar CEP', 
                        description: 'Ocorreu um erro inesperado ao buscar o CEP, tente novamente.'
                    })
              }


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
            description: 'Formato invalido ou CEP incorreto!'
          })
          setLoading(false)
        }
    } 


    function inputText (input: string) 
    {
        const char = input.trim()
        setCep(char.replace(cepMask.reg, cepMask.string))       
    }

    
    useFocusEffect(
      useCallback(() => 
      {
        console.log('buscando anuncio')
        appOpenAd.load()
        setTimeout(() => 
        {    
          if (!__DEV__  && appOpenAd.loaded) 
          {
            appOpenAd.show()
          }
          else if (!__DEV__  && !appOpenAd.loaded) 
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
                        <Text style={styles.title}>Insira o {cCEP}</Text>

                        <TextInput 
                            placeholder={`Digite ou cole o número do ${cCEP}`}
                            value={cep}
                            cursorColor={theme.colors.black}
                            onChangeText={inputText}
                            maxLength={cLENGTH_CEP}
                            keyboardType="numeric"
                            style={styles.input}
                        />

                        <ComponentButton.ButtonWrapper 
                            style={[{...styles.button, backgroundColor: cep.length !== cLENGTH_CEP ? theme.colors.disable : theme.colors.blue}]}
                            onPress={() => getCepData(cep)} 
                            disabled={cep.length !== cLENGTH_CEP ? true : false}
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
                    <View style={{flex: 1, alignItems: 'center', justifyContent: 'flex-start'}}>
                        <Text>{JSON.stringify(result)}</Text>
                    </View>

                    {!__DEV__ &&
                    <View style={styles.viewBanner}>
                       <Banner />  
                    </View>}
                </>
                : 

                <Loading size={32} color={theme.colors.blue} justify={"flex-start"}/>
                }

            </View>
        </>
    )
}
