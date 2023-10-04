import { useCallback, useEffect, useState } from "react"
import { View, Text, TextInput, ActivityIndicator, LayoutChangeEvent, Button, Keyboard, TouchableOpacity, Linking, Share } from "react-native"
import { AntDesign } from '@expo/vector-icons';
import { AppOpenAd, TestIds } from "react-native-google-mobile-ads";
import { useNavigation, useFocusEffect } from '@react-navigation/native'

import { styles } from "./styles";
import { Btn } from "../../components/button";
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
import { SuperModal } from "../../components/super_modal";
import * as Icon from '@expo/vector-icons';
import { shareActionCep } from "../../utils/cep/sharedActionCep";
import { TextDescription, TextHeader, TextTitle } from "../../components/text";



const adUnitId = __DEV__ ? TestIds.APP_OPEN : 'ca-app-pub-2213444535919704/1325028330';
const appOpenAd = AppOpenAd.createForAdRequest(adUnitId, 
{
  requestNonPersonalizedAdsOnly: true,
  keywords: ['fashion', 'clothing'],
});


export function CepScreen ({route}: any) {
    const [loaded, setLoaded] = useState(false)
    const [cep, setCep] = useState(route.params?.data)
    const [loading, setLoading] = useState(false)
    const { navigate } = useNavigation()
    const [result, setResult] = useState({} as CepProps)
    const [modalState, setModalState] = useState(false)


    function layoutloaded (event: LayoutChangeEvent) 
    {
        return event.nativeEvent.layout && setLoaded(true)
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
        const new_cep = /^\D+$/.test(cep) //Nao contem numeros na string
        
        if ((cep_replaced.length === (cLENGTH_CEP-2)) && !new_cep)
        {
          get_CEP.get(cep_replaced)
            .then((data) => 
                {
                    setResult(data.data)
                    Keyboard.dismiss()
                    setTimeout(() => {

                        setModalState(true)
                    }, 100)
                    
                }
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

    useEffect(() => {
        getCepData(cep)
    }, [])

    
    return (
            <>       
            <Status />
            <View onLayout={layoutloaded} style={styles.container}>
                { loaded ?
                <>
                    <View style={styles.viewInput} >
                        <Text style={styles.title}>Buscar {cCEP}</Text>

                        <TextInput 
                            placeholder={`Digite ou cole o número do ${cCEP}`}
                            value={cep}
                            cursorColor={theme.colors.black}
                            onChangeText={inputText}
                            maxLength={cLENGTH_CEP}
                            keyboardType="numeric"
                            style={styles.input}
                        />

                        <Btn.Wrapper 
                            style={[{...styles.button, backgroundColor: cep.length !== cLENGTH_CEP ? theme.colors.disable : theme.colors.blue}]}
                            onPress={() => getCepData(cep)} 
                            disabled={cep.length !== cLENGTH_CEP ? true : false}
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
                    {/*<View style={{flex: 1, alignItems: 'center', justifyContent: 'flex-start'}}>

                        <Text> {JSON.stringify(result)} </Text>

                            </View>*/}

                    {!__DEV__ &&
                    <View style={styles.viewBanner}>
                       <Banner />  
                    </View>}
                </>
                : 

                <Loading size={32} color={theme.colors.blue} justify={"flex-start"}/>
                }

            </View>

            <SuperModal isVisible={modalState}>
                <View style={{
                    alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff',
                    borderRadius: 10, margin: 10, height: 420
                }}>
                    
                    <View style={{
                        flex: 0.8, backgroundColor: theme.colors.white,
                        width: '90%', alignItems: 'flex-start',
                        margin: 10
                    }}>
                        <View style={{width: '100%', justifyContent: 'center', alignItems: 'center'}}>
                            <Text style={{color: theme.colors.blue, fontSize: 22, fontFamily: 'Bold'}}>
                                CEP: { cep } {/*CEP MODAL*/}
                            </Text>
                        </View>
                        <View style={{width: '90%', justifyContent: 'center', alignItems: 'flex-start', marginVertical: 20, gap: 10}}>
                            <TextDescription
                                text={`ENDEREÇO: \n${result?.street}`}
                                style={{fontSize: 13, fontFamily: 'Regular'}}
                            />
                            <TextDescription
                                text={`BAIRRO: \n${result?.neighborhood}`}
                                style={{fontSize: 13, fontFamily: 'Regular'}}
                            />
                            <TextDescription
                                text={`ESTADO: \n${result?.city}`}
                                style={{fontSize: 13, fontFamily: 'Regular'}}
                            />
                            <TextDescription
                                text={`UF: \n${result?.state}`}
                                style={{fontSize: 13, fontFamily: 'Regular'}}
                            />
                        </View>

                    </View>

                    <View style={{
                        flex: 0.2, backgroundColor: theme.colors.blue,
                        width: '100%'
                    }}>
                        <View style={{flex: 1, alignItems: 'center', justifyContent: 'space-evenly', flexDirection: 'row', }}>
                            
                            <TouchableOpacity 
                                style={{alignItems: 'center'}} 
                                onPress={() => Linking.openURL(`https://www.google.com.br/maps/search/${result?.cep}`)}
                            >
                                <Icon.MaterialCommunityIcons name="map-search" size={35} color={theme.colors.white} />
                                <Text style={{color: theme.colors.white, fontFamily: 'Regular', fontSize: 12}}>
                                    Google Maps
                                </Text>
                            </TouchableOpacity>
                            
                            <TouchableOpacity 
                                style={{alignItems: 'center'}}
                                onPress={() => shareActionCep(result)}    
                            >
                                <Icon.MaterialCommunityIcons name="share-all" size={35} color={theme.colors.white} />
                                <Text style={{color: theme.colors.white, fontFamily: 'Regular', fontSize: 12}}>
                                    Compartilhar
                                </Text>
                            </TouchableOpacity>
                            
                        </View>

                    </View>
    
                        
                    <View style={{margin: 20}}>
                        <Btn.Wrapper 
                            style={{...styles.button, width: 150, backgroundColor: theme.description.none}}
                            onPress={() => setModalState(false)}
                        >
                            <Btn.Text text={'Fechar'} style={styles.textButton}/>
                        </Btn.Wrapper>
                    </View>
                   
                </View>
            </SuperModal>
        </>
    )
}
