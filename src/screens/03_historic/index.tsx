import { View, Text, StyleSheet, FlatList, LayoutChangeEvent } from "react-native"
import { CNPJ } from "../../@types/cnpj/index2"
import { getDate } from "../../utils/date_currency_format"
import { Status } from "../../components/statusBar"
import { useEffect, useState } from "react"
import { CnpjProps } from "../../@types/cnpj"

export function Historic () {
    const [loaded, setLoaded] = useState(false)
    const [history, setHistory] = useState(CNPJ)

    function layoutloaded (event: LayoutChangeEvent) 
    {
        return event.nativeEvent.layout && (() => {
            setLoaded(true)
        })()
    }
    


    return (
        <View style={styles.container} onLayout={layoutloaded}>
            <Status />
            {loaded ?
            <>  
                <FlatList 
                    showsVerticalScrollIndicator={false}
                    data={history.map((item) => item)}
                    keyExtractor={i => i.cnpj}
                    renderItem={({item}) => 
                        <View style={styles.view}>
                            <Text style={styles.description}>{`Nome: ${item.razao_social}`}</Text>
                            <Text style={styles.description}>{`CNPJ: ${item.cnpj.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3/$4-$5")}`}</Text>
                            <Text style={styles.description}>{`Data da consulta: ${getDate()}`}</Text>
                            <Text style={styles.description}>{`Status: ${item.descricao_situacao_cadastral}`}</Text>
                        </View>
                    }
                    style={{width: '100%'}}
                />
            </>
            :
                <View style={{
                    backgroundColor: '#fff',
                    borderRadius: 15,
                    alignItems: 'flex-start', justifyContent: 'center',
                    gap: 5,
                    padding: 20,
                    margin: 10,
                    elevation: 10, shadowColor: '#000'
                }}>

                </View>
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
        fontFamily: 'Bold'
    },

    description: 
    {
        fontFamily: 'Regular'
    },

    view: 
    {
        flex: 1,
        backgroundColor: '#fff',
        borderRadius: 15,
        alignItems: 'flex-start', justifyContent: 'center',
        gap: 5,
        padding: 20,
        margin: 10,
        elevation: 10, shadowColor: '#000'
    },


})