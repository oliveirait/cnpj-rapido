import { View, Text, StyleSheet, FlatList, ListRenderItemInfo } from "react-native"
import { CNPJ } from "../../@types/cnpj/index2"
import { getDate } from "../../utils/dateFormat"

export function Historic () {

    return (
        <View style={styles.container}> 
            

            <FlatList 
                showsVerticalScrollIndicator={false}
                data={CNPJ.map((item) => item)}
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


        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1, 
        width: '100%',
        alignItems: 'center', justifyContent: 'center', 
        backgroundColor: '#f1f1f1',
        paddingHorizontal: 10
        
    },

    title: {
        fontFamily: 'Bold'
    },

    description: {
        fontFamily: 'Regular'
    },

    view: {
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