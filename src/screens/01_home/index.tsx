import { useState } from "react"
import { View, Text, TextInput, Alert } from "react-native"


import { styles } from "./styles";
import { ComponentButton } from "../../components/button";
import { CnpjProps } from "../../@types/cnpj"
import { CNPJ } from "../../services/api";
import { Loading } from "../../components/loading";
import { AntiDesignIcon } from "../../components/icon/antidesign";
import { checkNetwork } from "../../utils/network";


export function Home () {
    const length_cnpj = 18
    const [cnpj, setCnpj] = useState('')
    const [cnpj_result, set_cnpj_result] = useState({} as CnpjProps )
    const [loading, setLoading] = useState(false)
    const cnpj_regex = /^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/


    async function getCnpjData (cnpj: string) {
        const netinfo = await checkNetwork()
        if (!netinfo) {
            return (
                Alert.alert(
                    'Sem internet', 'Verifique sua conexão',
                    [{text: 'OK'}],
                    {cancelable: true}
                )
            )
        }
        setLoading(true)
        const cnpj_replaced = cnpj.replace(/[/.-]/g, '')
        if (cnpj_replaced.length === 14) {
            CNPJ.get(cnpj_replaced)
                .then((data) => {
                    set_cnpj_result(data.data)
                })

                .catch(() => {
                    Alert.alert(
                        'CNPJ invalido', 
                        'Verifique a numeracao e tente novamente!',
                        [{text: 'OK'}],
                        {cancelable: true}
                    )
                })

                .finally(() => {
                    setLoading(false)
                })  
        }

        else {
            Alert.alert(
                'Atencao', 'Formato invalido ou CNPJ incorreto!',
                [{text: 'OK'}],
                {cancelable: true}
            )
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


            <View style={styles.cnjp_datails}>
                <Text>{cnpj_result?.capital_social}</Text>
                <Text>{cnpj_result?.razao_social}</Text>
                <Text>{cnpj_result?.bairro}</Text>
                <Text>{cnpj_result?.nome_fantasia}</Text>
            </View>


        </View>
    )
}




