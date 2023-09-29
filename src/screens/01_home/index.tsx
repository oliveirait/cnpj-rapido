import { useCallback, useState } from "react"
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
import { cnpjMask } from "../../utils/masks";
import { IconSearch } from "../../components/icons/Icons";
import { cCNPJ } from "../../utils/constants";
import { AxiosError } from "axios";



const adUnitId = __DEV__ ? TestIds.APP_OPEN : 'ca-app-pub-2213444535919704/1325028330';
const appOpenAd = AppOpenAd.createForAdRequest(adUnitId, 
{
  requestNonPersonalizedAdsOnly: true,
  keywords: ['fashion', 'clothing'],
});


export function Home () {
    const [loaded, setLoaded] = useState(false)
    const cLENGTH_CNPJ = 18
    const [cnpj, setCnpj] = useState('')
    const [loading, setLoading] = useState(false)
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

    
    async function getCnpjData (cep: string) 
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
        if (cep_replaced.length === (cLENGTH_CNPJ-4))
        {
          get_CNPJ.get(cep_replaced)
            .then((data) => 
                goNextPage(data.data)
            )
            .catch((e: AxiosError) => 
            {
              if (AxiosError)
              {
                return simpleAlert(
                    {
                        title: 'CNPJ não encontrado', 
                        description: 'Verifique se a numeração está correta.'
                    })
              }

              else 
              {
                return simpleAlert(
                    {
                        title: 'Falha ao buscar CNPJ', 
                        description: 'Ocorreu um erro inesperado ao buscar o CNPJ, tente novamente.'
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
            description: 'Formato invalido ou CNPJ incorreto!'
          })
          setLoading(false)
        }
    } 


    function inputText (input: string) 
    {
        const char = input.trim()
        setCnpj(char.replace(cnpjMask.reg, cnpjMask.string))       
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
                        <Text style={styles.title}>Insira o {cCNPJ}</Text>

                        <TextInput 
                            placeholder="Digite ou cole o número do CNPJ"
                            value={cnpj}
                            cursorColor={theme.colors.black}
                            onChangeText={inputText}
                            maxLength={cLENGTH_CNPJ}
                            keyboardType="numeric"
                            style={styles.input}
                        />

                        <ComponentButton.ButtonWrapper 
                            style={[{...styles.button, backgroundColor: cnpj.length !== cLENGTH_CNPJ ? theme.colors.disable : theme.colors.blue}]}
                            onPress={() => getCnpjData(cnpj)} 
                            disabled={cnpj.length !== cLENGTH_CNPJ ? true : false}
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

                    {!__DEV__ &&
                    <View style={styles.viewBanner}>
                       <Banner />  
                    </View>}

                    <ComponentButton.ButtonWrapper 
                        onPress={() => navigate('cep')}
                        style={[{...styles.button, alignSelf: 'center', marginVertical: 5, backgroundColor: (theme.colors.black)}]}>
                        <ComponentButton.ButtonIcon icon={ <IconSearch /> }/>
                        <ComponentButton.ButtonText text={ 'Consultar CEP '} style={styles.textButton}/>
                    </ComponentButton.ButtonWrapper>
                </>
                : 

                <Loading size={32} color={theme.colors.blue} justify={"flex-start"}/>
                }

            </View>
        </>
    )
}




