import { View, ScrollView, LayoutChangeEvent, LayoutRectangle } from "react-native";
import { AntDesign } from '@expo/vector-icons';
import { CnpjProps } from "../../@types/cnpj";
import { TextHeader, TextTitle, TextDescription } from "../../components/text";
import { styles } from "./styles";
import { formatDate, getDate } from "../../utils/dateFormat";
import React, { useState } from "react";
import { Status } from "../../components/statusBar";
import { Loading } from "../../components/loading";
import theme from "../../utils/theme/theme"
import { cnpjStatus } from "../../utils/cnpj/cnpjStatus";
import { ComponentButton } from "../../components/button";
import { shareAction } from "../../utils/cnpj/sharedAction";


export function Result ({route}: any) {
    const cnpj: CnpjProps = route.params?.data
    const [situation_color, set_situation_color] = useState(theme.colors.black)
    const [loaded, setLoaded] = useState(false)

    function layoutloaded (layout: LayoutRectangle) 
    {
        if (layout.height && layout.width) 
        {
            console.log('layout loaded!')
            setLoaded(true)
        }
    }

    const situacao = (event: LayoutChangeEvent) => 
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

        const { layout } = event.nativeEvent
        return layoutloaded(layout)
    }


    return (
        <View style={styles.container} onLayout={situacao}>
        <Status />
        {loaded ? 
        
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
                        <TextDescription text={cnpj?.cnpj.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3/$4-$5")} />

                        <TextTitle text="Porte" />
                        <TextDescription text={cnpj?.porte} />

                        <TextTitle text="Capital Social" />
                        <TextDescription text={`R$ ${cnpj?.capital_social},00`} />

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
                        <TextDescription text={cnpj?.cep} />

                        <TextTitle text="Telefone" />
                        <TextDescription text={`${cnpj?.ddd_telefone_1} - ${cnpj?.ddd_telefone_2}`} />

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
                        <TextDescription text={cnpj?.cnae_fiscal} />
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
                                    <TextDescription text={cnae?.codigo} />
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

                <ComponentButton.ButtonWrapper 
                    style={[{...styles.button, backgroundColor: (theme.colors.blue)}]}
                    onPress={() => shareAction(route.params?.data)}
                >
                    <ComponentButton.ButtonIcon icon={ <AntDesign name="search1" size={18} color={theme.colors.white} /> }/>
                    <ComponentButton.ButtonText text={ 'Compartilhar '} style={styles.textButton}/>
                </ComponentButton.ButtonWrapper>

            </ScrollView>

        :

            <Loading size={32} color={theme.colors.blue} justify={"flex-start"}/>
        }
        

        </View>

    )
} 