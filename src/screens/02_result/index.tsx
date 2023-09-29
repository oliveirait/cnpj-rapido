import { View, ScrollView, LayoutChangeEvent } from "react-native";
import { CnpjProps } from "../../@types/cnpj";
import { TextHeader, TextTitle, TextDescription } from "../../components/text";
import { styles } from "./styles";
import { formatCapital, formatDate, getDate } from "../../utils/date_currency_format";
import React, { useState } from "react";
import { Status } from "../../components/statusBar";
import { Loading } from "../../components/loading";
import theme from "../../utils/theme/theme"
import { cnpjStatus } from "../../utils/cnpj/cnpjStatus";
import { ComponentButton } from "../../components/button";
import { shareAction } from "../../utils/cnpj/sharedAction";
import { IconShare } from "../../components/icons/Icons";
import { cepMask, cnaeMask, cnpjMask, telMask } from "../../utils/masks";


export function Result ({route}: any) {
    const cnpj: CnpjProps = route.params?.data
    const [situation_color, set_situation_color] = useState(theme.colors.black)
    const [loaded, setLoaded] = useState(false)
    const dataHora = getDate()
    
    const situation = (event: LayoutChangeEvent) => 
    {
        let description_status = cnpj?.descricao_situacao_cadastral

        if (description_status === 'ATIVA') 
        {
            set_situation_color(theme.description.active)
        } 
        else if (description_status === cnpjStatus.active) 
        {
            set_situation_color(theme.description.suspend)
        } 
        else if (description_status === cnpjStatus.unfit) 
        {
            set_situation_color(theme.description.inactive)
        } 
        else if (description_status === cnpjStatus.low) 
        {
            set_situation_color(theme.description.low)
        } 
        else 
        {
            set_situation_color(theme.description.none)
        }

        return event.nativeEvent.layout && setLoaded(true)
    }

    function HomeScreenContent () 
    {
        return (
            <ScrollView style={styles.cnjp_datails}>

                <View style={styles.card}>
                    <View style={styles.viewTitleCard}>
                        <TextHeader text="Informações Gerais" />
                    </View>
                    <View style={styles.viewDescriptionCard}>
                        <TextTitle text="Situação" />
                        <TextDescription text={cnpj?.descricao_situacao_cadastral} style={[{...styles.textTitleCard, color: situation_color}]}/>

                        <TextTitle text="Nome" />
                        <TextDescription text={cnpj?.razao_social} />

                        <TextTitle text="CNPJ" />
                        <TextDescription text={cnpj?.cnpj.replace(cnpjMask.reg, cnpjMask.string)} />

                        <TextTitle text="Porte" />
                        <TextDescription text={cnpj?.porte} />

                        <TextTitle text="Capital Social" />
                        <TextDescription text={formatCapital(cnpj?.capital_social)} />

                        <TextTitle text="Data de Abertura" />
                        <TextDescription text={formatDate(cnpj.data_inicio_atividade)} />

                        <TextTitle text="Tipo" />
                        <TextDescription text={cnpj?.descricao_identificador_matriz_filial} />

                        <TextTitle text="Natureza Jurídica" />
                        <TextDescription text={cnpj?.natureza_juridica} />

                        <TextTitle text="Logradouro" />
                        <TextDescription text={cnpj?.logradouro} />

                        <TextTitle text="Bairro" />
                        <TextDescription text={cnpj?.bairro} />

                        <TextTitle text="Município" />
                        <TextDescription text={cnpj?.municipio} />

                        <TextTitle text="CEP" />
                        <TextDescription text={String(cnpj?.cep).replace(cepMask.reg, cepMask.string)} />

                        <TextTitle text="Telefone" />
                        <TextDescription text={`${cnpj?.ddd_telefone_1.replace(telMask.reg, telMask.string)}`} />

                        <TextTitle text="Data da Consulta" />
                        <TextDescription text={dataHora} />
                        
                    </View>
                </View>

                <View style={styles.card}>
                    <View style={styles.viewTitleCard}>
                        <TextHeader text="Atividade Principal" />
                    </View>
                    <View style={styles.viewDescriptionCard}>
                        <TextTitle text="CNAE" />
                        <TextDescription text={String(cnpj?.cnae_fiscal).replace(cnaeMask.reg, cnaeMask.string)} />
                        <TextTitle text="Atividade" />
                        <TextDescription text={cnpj?.cnae_fiscal_descricao} />
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
                                    <TextDescription text={String(cnae?.codigo).replace(cnaeMask.reg, cnaeMask.string)} />
                                    <TextTitle text="Atividade" />
                                    <TextDescription text={cnae?.descricao} />
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
                                    <TextDescription text={qsa?.nome_socio} />
                                    <TextTitle text="Qualificação" />
                                    <TextDescription text={qsa?.codigo_qualificacao_socio} />
                                </View>
                            )
                        })
                    }
                </View>

            </ScrollView>
        )
    }

    function Screen () {
        return loaded ? <HomeScreenContent /> : <Loading size={32} color={theme.colors.blue} justify={"flex-start"}/> 
    }


    return (
        <View style={styles.container} onLayout={situation}>
            <Status />
            <Screen />
            {
                loaded && 
                    <ComponentButton.ButtonWrapper 
                        onPress={() => shareAction(cnpj, dataHora)}
                        style={[{...styles.button, alignSelf: 'center', marginVertical: 5, backgroundColor: (theme.colors.black)}]}>
                        <ComponentButton.ButtonIcon icon={ <IconShare /> }/>
                        <ComponentButton.ButtonText text={ 'Compartilhar'} style={styles.textButton}/>
                    </ComponentButton.ButtonWrapper>
            }
        </View>
    )
} 