import { View, StyleSheet, ScrollView } from "react-native";
import { CnpjProps } from "../../@types/cnpj";
import { TextHeader, TextTitle, TextDescription } from "../../components/text";
import { styles } from "./styles";


export function Result ({route}: any) {
    const cnpj: CnpjProps = route.params?.data
    const data = new Date()
    const day = data.getDay()
    const month = data.getMonth()
    const year = data.getFullYear()

    return (
        <ScrollView style={styles.cnjp_datails}>

            <View style={styles.card}>
                <View style={styles.viewTitleCard}>
                    <TextHeader text="Informações Gerais" />
                </View>
                <View style={styles.viewDescriptionCard}>
                    <TextTitle text="Nome" />
                    <TextDescription text={cnpj.razao_social} />

                    <TextTitle text="CNPJ" />
                    <TextDescription text={cnpj.cnpj} />

                    <TextTitle text="Capital Social" />
                    <TextDescription text={cnpj.capital_social} />

                    <TextTitle text="Data de Abertura" />
                    <TextDescription text={cnpj.data_inicio_atividade} />

                    <TextTitle text="Tipo" />
                    <TextDescription text={cnpj.identificador_matriz_filial === 1 ? 'Matriz' : 'Filial'} />

                    <TextTitle text="Logradouro" />
                    <TextDescription text={cnpj.logradouro} />

                    <TextTitle text="Bairro" />
                    <TextDescription text={cnpj.bairro} />

                    <TextTitle text="Município" />
                    <TextDescription text={cnpj.municipio} />

                    <TextTitle text="CEP" />
                    <TextDescription text={cnpj.cep} />

                    <TextTitle text="Telefone" />
                    <TextDescription text={`${cnpj.ddd_telefone_1} / ${cnpj.ddd_telefone_2}`} />

                    <TextTitle text="E-mail" />
                    <TextDescription text={cnpj.cnae_fiscal} />

                    <TextTitle text="Data da Consulta" />
                    <TextDescription text={`${day}/${month}/${year}`} />
                    
                </View>
            </View>

            <View style={styles.card}>
                <View style={styles.viewTitleCard}>
                    <TextHeader text="Atividade Principal" />
                </View>
                <View style={styles.viewDescriptionCard}>
                    <TextTitle text="CNAE" />
                    <TextDescription text={cnpj.cnae_fiscal} />
                    <TextTitle text="Atividade" />
                    <TextDescription text={cnpj.cnae_fiscal_descricao} />
                </View>
            </View>

            

            <View style={styles.card}>
                <View style={styles.viewTitleCard}>
                    <TextHeader text="Atividade Secundária" />
                </View>
                {
                    cnpj.cnaes_secundarios.map((cnae, index) => {
                        return (
                            <View key={index} style={styles.viewDescriptionCard}>
                                <TextTitle text="CNAE" />
                                <TextDescription text={cnae.codigo} />
                                <TextTitle text="Atividade" />
                                <TextDescription text={cnae.descricao} />
                            </View>
                        )
                    })

                }

            </View>

            <View style={styles.card}>
                <View style={styles.viewTitleCard}>
                    <TextHeader text="Sócios e Administradores" />
                </View>
                {
                    cnpj.qsa.map((qsa, index) => {
                        return (
                            <View key={index} style={styles.viewDescriptionCard}>
                                <TextTitle text="Nome" />
                                <TextDescription text={qsa.nome_socio} />
                                <TextTitle text="Qualificação" />
                                <TextDescription text={qsa.codigo_qualificacao_socio} />
                            </View>
                        )
                    })
                }
            </View>

        </ScrollView>

    )
} 