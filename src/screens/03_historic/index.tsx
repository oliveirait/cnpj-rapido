import { View, Text, StyleSheet, FlatList, LayoutChangeEvent, TouchableOpacity, Alert, ToastAndroid } from "react-native"
import { Status } from "../../components/statusBar"
import { RealmDB } from "../../database"
import { CnpjAllProps } from "../01_home"
import { cnpjMask } from "../../utils/masks"
import { SkeletHistory } from "../../components/skelet/SkeletHistory"
import { AxiosError } from "axios"
import { get_CNPJ } from "../../services/api"
import { useNavigation, useFocusEffect } from '@react-navigation/native'
import { useCallback, useState } from "react"
import { EmptyHistory } from "../../components/empty/EmptyHistory"


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
                setLoaded(true)
            })
            
            .catch((err) => 
            {
                console.log('ERRO AO BUSCAR DADOS DO CNPJ NO BANCO ===> ', err)
            })
    } 

    function confirmDelete (id: string) {
        Alert.alert(
            'Excluir',
            'Deseja excluir este registro?',
            [
                {text: 'Nao'},
                {text: 'Sim', onPress: () => removeCnpjFromHistory(id)}
            ],
            {cancelable: false}
        )
    }

    async function removeCnpjFromHistory (id: string) {
        setLoaded(true)
        await RealmDB()
            .then((database) => 
            {
                const collection = database.objects('CnpjSchema')
                const objectFiltered = collection.filtered(`_id = '${id}'`)

                if (objectFiltered)
                {
                    setLoaded(false)

                    setTimeout(() => {
                        database.write(() => {
                            database.delete(objectFiltered)
                        })

                        getReposHistory()
                        ToastAndroid.show(`Registro excluido com sucesso!`, ToastAndroid.SHORT)
                        setLoaded(false)
                    }, 100)
                }
            })

            .catch((err) => 
            {
                console.log(err)
            })
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

    useFocusEffect(
        useCallback(() => {
            getReposHistory()
        }, [])
    )

    return (
        <View style={styles.container}>
            <Status />
            { loaded ?
                <FlatList 
                    initialNumToRender={10}
                    maxToRenderPerBatch={5}
                    ListEmptyComponent={EmptyHistory}
                    showsVerticalScrollIndicator={false}
                    data={history}
                    style={{width: '100%', height: '100%'}}
                    keyExtractor={(item: CnpjAllProps) => item._id}
                    renderItem={({item}) => 

                        <TouchableOpacity 
                            style={styles.view} 
                            onPress={() => getCnpjData(item.cnpj)}
                            onLongPress={() => confirmDelete(item?._id)}
                        >
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