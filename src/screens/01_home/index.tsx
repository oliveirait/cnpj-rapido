import { useState } from "react"
import { View, Text, TextInput, GestureResponderEvent } from "react-native"

import { styles } from "./styles";
import { ComponentButton } from "../../components/button";
import { CnpjProps } from "../../@types/cnpj"
import { CNPJ } from "../../services/api";
import { Loading } from "../../components/loading";
import { AntiDesignIcon } from "../../components/icon/antidesign";
import { checkNetwork } from "../../utils/network";
import { simpleAlert } from "../../utils/alerts/simple";

import { useNavigation } from '@react-navigation/native'


export function Home () {
    const length_cnpj = 18
    const [cnpj, setCnpj] = useState('')
    const [cnpj_result, set_cnpj_result] = useState({} as CnpjProps)
    const [loading, setLoading] = useState(false)
    const cnpj_regex = /^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/
    const { navigate } = useNavigation()

    function goNext (data: CnpjProps | GestureResponderEvent ) {
        navigate('result', {
            data: data
        })
    } 
    
    async function getCnpjData (cnpj: string) {
        const internet = await checkNetwork()
        if (!internet) {
            return simpleAlert({
                title: 'Sem internet', 
                description: 'Verifique sua conexão'
            })
        }
        setLoading(true)
        const cnpj_replaced = cnpj.replace(/[/.-]/g, '')
        if (cnpj_replaced.length === 14) {
            CNPJ.get(cnpj_replaced)
                .then((data) => 
                    goNext(data.data)
                )
                .catch(() => {
                    simpleAlert({
                        title: 'CNPJ inválido', 
                        description: 'Verifique a numeracao e tente novamente!'
                    })
                })
                .finally(() => 
                    setLoading(false)
                )
        }

        else {
            simpleAlert({
                title: '', 
                description: 'Formato invalido ou CNPJ incorreto!'
            })
            setLoading(false)
        }
    } 


    function inputText (input: string) {
        setCnpj(input.trim().replace(cnpj_regex, "$1.$2.$3/$4-$5"))
    }
    
    return (
        <View style={styles.container}> 
            <Text style={styles.title}>Insira o CNPJ</Text>

            <TextInput 
                placeholder="Digite o numero do CNPJ"
                value={cnpj}
                cursorColor={'#000'}
                onChangeText={inputText}
                maxLength={length_cnpj}
                keyboardType="numeric"
                style={styles.input}
            />

            <ComponentButton.ButtonWrapper 
                style={[{...styles.button, backgroundColor: cnpj.length !== length_cnpj ? '#c2c2c2' : '#000'}]}
                onPress={() => getCnpjData(cnpj)} 
                disabled={cnpj.length !== length_cnpj ? true : false}
            >
                <ComponentButton.ButtonIcon icon={ loading ? <Loading /> : <AntiDesignIcon /> } />
                <ComponentButton.ButtonText text={ loading ? 'Buscando...' : 'Buscar' } style={styles.textButton}/>
            </ComponentButton.ButtonWrapper>

        </View>
    )
}




