import { Share } from "react-native";
import { CnpjProps } from "../../@types/cnpj";
import { formatCapital, formatDate } from "../date_currency_format";
import { cepMask, cnpjMask, telMask } from "../masks";


export async function shareAction (data: CnpjProps, dataHora: string) 
{
    const cnpjData = `
Empresa: ${data?.razao_social}
CNPJ: ${data?.cnpj.replace(cnpjMask.reg, cnpjMask.string)}
Situação: ${data?.descricao_situacao_cadastral}
Porte: ${data?.porte} 
Capital Social: ${formatCapital(data?.capital_social)}
Data de Abertura: ${formatDate(data?.data_inicio_atividade)}
Tipo: ${data?.descricao_identificador_matriz_filial}
Natureza Jurídica: ${data?.natureza_juridica}
Logradouro: ${data?.logradouro}
Bairro: ${data?.bairro}
Município: ${data?.municipio}
CEP: ${String(data?.cep).replace(cepMask.reg, cepMask.string)}
Telefone: ${data?.ddd_telefone_1.replace(telMask.reg, telMask.string)}
Data da Consulta: ${dataHora}
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