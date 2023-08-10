import { useState } from "react"
import { View, Text, TextInput, ActivityIndicator, Alert } from "react-native"
import { AntDesign } from '@expo/vector-icons';

import { styles } from "./styles";
import { ComponentButton } from "../../components/button";
import { CnpjProps } from "../../@types/cnpj"
import { CNPJ } from "../../services/api";


export function Home () {
    const [cnpj, setCnpj] = useState('')
    const [cnpj_result, set_cnpj_result] = useState({} as CnpjProps )
    const [loading, setLoading] = useState(false)


    async function getCnpjData (cnpj: string) {
        setLoading(true)
        setTimeout(() => {
            CNPJ.get(cnpj)
                .then((data) => {
                    set_cnpj_result(data.data)
                })
                .catch(() => {
                    console.warn('Cnpj nao encontrado ou invalido')
                })
            setLoading(false)
        }, 1000)
            
    }

    function inputText (input: string) {
        setCnpj(input.trim())
    }
    
    return (
        <View style={styles.container}> 
            <Text style={styles.title}>Insira o CNPJ</Text>

            <TextInput 
                placeholder="Digite o numero do CNPJ"
                value={cnpj}
                cursorColor={'#000'}
                onChangeText={inputText}
                maxLength={18}
                keyboardType="numeric"
                style={styles.input}
            />

            <ComponentButton.ButtonWrapper 
                style={[{...styles.button, backgroundColor: cnpj.length !== 14 ? '#c2c2c2' : '#000'}]}
                onPress={() => getCnpjData(cnpj)} 
                disabled={cnpj.length !== 14 ? true : false}
            >
                <ComponentButton.ButtonIcon icon={ loading ? <Loading /> : <Icon /> } />
                <ComponentButton.ButtonText text={ loading ? 'Buscando...' : 'Buscar' } style={styles.textButton}/>
            </ComponentButton.ButtonWrapper>

            <View style={styles.cnjp_datails}>
                <Text>{cnpj_result?.capital_social}</Text>
                <Text>{cnpj_result?.razao_social}</Text>
                <Text>{cnpj_result?.bairro}</Text>
                <Text>{cnpj_result?.nome_fantasia}</Text>
            </View>


        </View>
    )
}

const Loading = () => {
    return <ActivityIndicator size={24} color={'#fff'}/> 
}

const Icon = () => {
    return <AntDesign name="search1" size={18} color="white" />
}

