import { View, ScrollView, LayoutChangeEvent, TouchableOpacity, Linking} from "react-native";
import { TextHeader, TextTitle, TextDescription } from "../../components/text";
import { styles } from "./styles";
import { formatCapital, formatDate } from "../../utils/date_currency_format";
import React, { useState } from "react";
import { Status } from "../../components/statusBar";
import theme from "../../utils/theme/theme"
import { cnpjStatus } from "../../utils/cnpj/cnpjStatus";
import { Btn } from "../../components/button";
import { shareActionCnpj } from "../../utils/cnpj/sharedActionCnpj";
import { IconGmaps, IconPhone, IconShare } from "../../components/icons/Icons";
import { cepMask, cnaeMask, cnpjMask, telMask } from "../../utils/masks";
import { Skelet } from "../../components/skelet/SkeletResult";
import { CnpjAllProps } from "../01_home";



export function Result ({route}: any) {
    const cnpj: CnpjAllProps = route.params?.data
    const [situation_color, set_situation_color] = useState(theme.colors.black)
    const [loaded, setLoaded] = useState(false)

    
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

        return event.nativeEvent.layout && (() => {
            setTimeout(() => {
                setLoaded(true)
            }, 300)
        })()
    }

    function CepView () 
    {
        let cepView = String(cnpj?.cep).replace(cepMask.reg, cepMask.string)
        return (
            <TouchableOpacity
                onPress={() => Linking.openURL(`https://www.google.com.br/maps/search/CEP ${cnpj?.cep}`)} 
                style={{justifyContent: 'space-around', flexDirection: 'row', alignItems: 'center', gap: 5, marginLeft: 20}}>
                <TextDescription text={cepView} style={{color: '#2288bb', fontFamily: 'Bold', textDecorationLine: 'underline'}}/>
                <IconGmaps />
            </TouchableOpacity>
            
        )
    }

    function PhoneView () 
    {
        let phoneNumber = cnpj?.ddd_telefone_1.replace(telMask.reg, telMask.string)
        return (
            <TouchableOpacity
                onPress={() => Linking.openURL(`tel:${phoneNumber}`)} 
                style={{justifyContent: 'space-around', flexDirection: 'row', alignItems: 'center', gap: 5, marginLeft: 20}}>
                <TextDescription text={phoneNumber} style={{color: '#2288bb', fontFamily: 'Bold', textDecorationLine: 'underline'}}/>
                <IconPhone />
            </TouchableOpacity>
        )
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
                        { cnpj?.cep && <CepView /> }

                        <TextTitle text="Telefone" />
                        { cnpj?.ddd_telefone_1 && <PhoneView /> }

                        <TextTitle text="Data da Consulta" />
                        <TextDescription text={cnpj?.data_consulta} />
                        
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

    function ButtonShare () 
    {
        return (
            <Btn.Wrapper
                onPress={() => shareActionCnpj(cnpj)}
                style={[{...styles.button, alignSelf: 'center', marginVertical: 5, backgroundColor: (theme.colors.black)}]}>
                <Btn.Icon icon={ <IconShare /> }/>
                <Btn.Text text={ 'Compartilhar'} style={styles.textButton}/>
            </Btn.Wrapper>
        )
    }


    return (
        <View style={styles.container} onLayout={situation}>
            <Status />
            { loaded ? <HomeScreenContent /> : <Skelet /> }
            { loaded && <ButtonShare /> }
        </View>
    )
} 