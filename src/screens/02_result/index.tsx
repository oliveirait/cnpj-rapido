import { View, ScrollView } from "react-native";
import { CnpjProps } from "../../@types/cnpj";
import { TextHeader, TextTitle, TextDescription } from "../../components/text";
import { styles } from "./styles";
import { formatDate, getDate } from "../../utils/dateFormat";


export function Result ({route}: any) {
    const cnpj: CnpjProps = route.params?.data

    return (
        <View style={styles.container}>
        <ScrollView style={styles.cnjp_datails}>

            <View style={styles.card}>
                <View style={styles.viewTitleCard}>
                    <TextHeader text="Informações Gerais" />
                </View>
                <View style={styles.viewDescriptionCard}>
                    <TextTitle text="Nome" />
                    <TextDescription text={cnpj.razao_social} />

                    <TextTitle text="CNPJ" />
                    <TextDescription text={cnpj.cnpj.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3/$4-$5")} />

                    <TextTitle text="Porte" />
                    <TextDescription text={cnpj.porte} />

                    <TextTitle text="Capital Social" />
                    <TextDescription text={`R$ ${cnpj.capital_social},00`} />

                    <TextTitle text="Data de Abertura" />
                    <TextDescription text={formatDate(cnpj.data_inicio_atividade)} />

                    <TextTitle text="Tipo" />
                    <TextDescription text={cnpj.identificador_matriz_filial === 1 ? 'MATRIZ' : 'FILIAL'} />

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

                    <TextTitle text="Data da Consulta" />
                    <TextDescription text={getDate()} />
                    
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

    </View>

    )
} 