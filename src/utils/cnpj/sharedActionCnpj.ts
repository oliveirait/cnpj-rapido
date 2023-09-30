import { Share } from "react-native";
import { CnpjProps } from "../../@types/cnpj";
import { formatCapital, formatDate } from "../date_currency_format";
import { cepMask, cnpjMask, telMask } from "../masks";


export async function shareActionCnpj (data: CnpjProps, dataHora: string) 
{
    const cnpjData = `
EMPRESA: ${data?.razao_social}
CNPJ: ${data?.cnpj.replace(cnpjMask.reg, cnpjMask.string)}
SITUAÇÃO: ${data?.descricao_situacao_cadastral}
PORTE: ${data?.porte} 
CAPITAL SOCIAL: ${formatCapital(data?.capital_social)}
DATA DE ABERTURA: ${formatDate(data?.data_inicio_atividade)}
TIPO: ${data?.descricao_identificador_matriz_filial}
NATUREZA JURÍDICA: ${data?.natureza_juridica}
LOGRADOURO: ${data?.logradouro}
BAIRRO: ${data?.bairro}
MUNICÍPIO: ${data?.municipio}
CEP: ${String(data?.cep).replace(cepMask.reg, cepMask.string)}
TELEFONE: ${data?.ddd_telefone_1.replace(telMask.reg, telMask.string)}
DATA DA CONSULTA: ${dataHora}

Dados recebidos a partir do aplicativo CNPJ Consulta:
https://play.google.com/store/apps/details?id=com.oliveirafocs.cnpjrapido
`
    const response = await Share.share(
        {
            title: `Consulta de CNPJ`,
            message: cnpjData
        },

        {
           dialogTitle: 'Compartilhar através de ...',
        }
    )
}