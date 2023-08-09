import { useState } from "react"
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ActivityIndicator } from "react-native"
import axios from 'axios'

import { CnpjProps } from "../../@types/cnpj"


export function Home () {
    const [cnpj, setCnpj] = useState('')
    const [cnpj_result, set_cnpj_result] = useState({} as CnpjProps)
    const [loading, setLoading] = useState(false)

    function changeCnpj (e: string) {
        setCnpj(e)
    }

    async function getCnpjData (cnpj: string) {
        setLoading(true)
        setTimeout(() => {
            axios(`https://brasilapi.com.br/api/cnpj/v1/${cnpj}`)
                .then((data) => set_cnpj_result(data.data))
            setLoading(false)
        }, 2000)

    }
    
    return (
        <View style={styles.container}> 
            <Text>Digite o CNPJ</Text>

            <TextInput 
                placeholder="CNPJ"
                defaultValue={cnpj}
                onChangeText={changeCnpj}
                style={styles.input}
            />

            <TouchableOpacity style={styles.button} onPress={() => getCnpjData(cnpj)}>
                {loading 
                    ? <ActivityIndicator size={40} color={'#fff'}/> 
                    : <Text style={styles.textButton}>Buscar</Text>
                }
                
            </TouchableOpacity>

            <Text>{cnpj_result?.capital_social}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center', justifyContent: 'center',
        gap: 10
    },

    input: {
        width: '90%', height: 50,
        borderWidth: 1, borderColor: '#000', borderRadius: 10,
        paddingHorizontal: 10, paddingVertical: 4
    },

    button: {
        width: '90%', height: 50,
        borderRadius: 10,
        paddingHorizontal: 10, paddingVertical: 4,
        backgroundColor: '#000',
        alignItems: 'center', justifyContent: 'center'
    },

    textButton: {
        textAlign: 'center',
        color: '#fff'
    }
})
