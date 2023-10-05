import { useCallback, useState } from "react"
import { View, Text, TextInput, ActivityIndicator, LayoutChangeEvent, Alert } from "react-native"
import { AntDesign } from '@expo/vector-icons';
import { AppOpenAd, TestIds } from "react-native-google-mobile-ads";
import { useNavigation, useFocusEffect } from '@react-navigation/native'

import { styles } from "./styles";
import { Btn } from "../../components/button";
import { CnpjProps } from "../../@types/cnpj"
import { get_CNPJ } from "../../services/api";
import { checkNetwork } from "../../utils/network";
import { simpleAlert } from "../../utils/alerts/simple";
import { Status } from "../../components/statusBar";
import { Banner } from "../../components/banner";
import theme from "../../utils/theme/theme";
import { Loading } from "../../components/loading";
import { cnpjMask } from "../../utils/masks";
import { cCNPJ, cLENGTH_CNPJ } from "../../utils/constants";
import { AxiosError } from "axios";
import { db } from "../../database";
import uuid from 'react-native-uuid';



const adUnitId = __DEV__ ? TestIds.APP_OPEN : 'ca-app-pub-2213444535919704/1325028330';
const appOpenAd = AppOpenAd.createForAdRequest(adUnitId, 
{
  requestNonPersonalizedAdsOnly: true,
  keywords: ['fashion', 'clothing'],
});


export function Home () {
    const [loaded, setLoaded] = useState(false)
    const [cnpj, setCnpj] = useState('')
    const [loading, setLoading] = useState(false)
    const { navigate } = useNavigation()


    async function handleSaveCnpj (data: CnpjProps) 
    {
        const conn = await db()

        try {
            conn.write(() => {
                conn.create('CnpjSchema', {
                    _id: uuid.v4(),
                    data: data
                })
            })

            Alert.alert(
                'Sucesso', 
                `Dados salvos!`,
                [
                  {text: 'ok'}
                ],
                {cancelable: false}
            )
        }

        catch {
            Alert.alert(
                'Erro', 
                `Erro ao gravar os dados`,
                [
                  {text: 'ok'}
                ],
                {cancelable: false}
            )
        }
    }


    function layoutloaded (event: LayoutChangeEvent) 
    {
        return event.nativeEvent.layout && setLoaded(true)
    }


    function goNextPage (data: CnpjProps) 
    {
        handleSaveCnpj(data)
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
        const new_cnpj = /^\D+$/.test(cnpj) //Nao contem numeros na string
        console.log(new_cnpj)
        
        if ((cnpj_replaced.length === (cLENGTH_CNPJ-4)) && !new_cnpj)
        {
          get_CNPJ.get(cnpj_replaced)
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
          if (!__DEV__ && appOpenAd.loaded) 
          {
            appOpenAd.show()
          }
          else if (!__DEV__ && !appOpenAd.loaded) 
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

                        <Btn.Wrapper 
                            style={[{...styles.button, backgroundColor: cnpj.length !== cLENGTH_CNPJ ? theme.colors.disable : theme.colors.blue}]}
                            onPress={() => getCnpjData(cnpj)} 
                            disabled={cnpj.length !== cLENGTH_CNPJ ? true : false}
                        >
                            <Btn.Icon 
                                icon={ loading 
                                    ? <ActivityIndicator size={24} color={theme.colors.white}/> 
                                    : <AntDesign name="search1" size={18} color={theme.colors.white} /> 
                                }/>
                            <Btn.Text 
                                text={ loading ? 'Buscando...' : 'Buscar' } 
                                style={styles.textButton}
                            />
                        </Btn.Wrapper>
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




