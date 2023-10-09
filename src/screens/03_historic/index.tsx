import { View, Text, StyleSheet, FlatList, LayoutChangeEvent, TouchableOpacity } from "react-native"
import { Status } from "../../components/statusBar"
import { RealmDB } from "../../database"
import { CnpjAllProps } from "../01_home"
import { cnpjMask } from "../../utils/masks"
import { SkeletHistory } from "../../components/skelet/SkeletHistory"
import { AxiosError } from "axios"
import { get_CNPJ } from "../../services/api"
import { useNavigation } from '@react-navigation/native'
import { useState } from "react"


export function Historic () {
    const [loaded, setLoaded] = useState(false)
    const [history, setHistory] = useState<any>([])
    const { navigate } = useNavigation()

    
    async function getReposHistory () {
        await RealmDB()
            .then((database) => 
            {
                const posts = database.objects<CnpjAllProps[]>("CnpjSchema").toJSON()
                setHistory(posts.reverse())
            })
            
            .catch((err) => 
            {
                console.log('ERRO AO BUSCAR DADOS DO CNPJ NO BANCO ===> ', err)
            })
    } 

    async function layoutloaded (event: LayoutChangeEvent) 
    {
        getReposHistory()

        event.nativeEvent.layout && setTimeout(() => {
            (() => setLoaded(true))()
        }, 200)
    }

    function goResult (data: CnpjAllProps)
    {
        navigate('result', {data: data})
    }

    async function getCnpjData (cnpj: string)
    { 
        get_CNPJ.get(cnpj)
            .then((data) => {
                goResult(data.data)
            })

            .catch((e: AxiosError) => 
            {
                console.log('Erro ao buscar CNPJ')
            })
    }


    return (
        <View style={styles.container} onLayout={layoutloaded}>
            <Status />
            {loaded ?
                <FlatList 
                    initialNumToRender={10}
                    showsVerticalScrollIndicator={false}
                    data={history}
                    keyExtractor={(item: CnpjAllProps) => item._id}
                    renderItem={({item}) => 
                        <TouchableOpacity style={styles.view} onPress={() => getCnpjData(item.cnpj)}>
                            
                            <View>
                                <Text style={styles.title}>RAZAO SOCIAL</Text>
                                <Text style={styles.description}>{item?.razao_social}</Text>
                            </View>

                            <View>
                                <Text style={styles.title}>CNPJ</Text>
                                <Text style={styles.description}>{item?.cnpj.replace(cnpjMask.reg, cnpjMask.string)}</Text>
                            </View>

                            <View>
                                <Text style={styles.title}>DATA DA CONSULTA</Text>
                                <Text style={styles.description}>{item?.data_consulta}</Text>
                            </View>

                            <View>
                                <Text style={styles.title}>STATUS</Text>
                                <Text style={styles.description}>{item?.descricao_situacao_cadastral}</Text>
                            </View>
                        </TouchableOpacity>
                    }
                    style={{width: '100%'}}
                
                />
            :
                <SkeletHistory />
            }
        </View>
    )
}



const styles = StyleSheet.create({
    container: 
    {
        flex: 1, 
        width: '100%',
        alignItems: 'center', justifyContent: 'center', 
        backgroundColor: '#f1f1f1',
        paddingHorizontal: 10
        
    },

    title: 
    {
        fontFamily: 'Bold',
        fontSize: 12
    },

    description: 
    {
        fontFamily: 'Regular',
        fontSize: 12
    },

    view: 
    {
        flex: 1,
        backgroundColor: '#fff',
        borderRadius: 15,
        alignItems: 'flex-start', justifyContent: 'center',
        gap: 10,
        padding: 20,
        margin: 10,
        elevation: 10, shadowColor: '#000',
        
    },


})