import { Share } from "react-native";
import { CnpjProps } from "../../@types/cnpj";
import { formatDate } from "../dateFormat";


export async function shareAction (data: CnpjProps, dataHora: string) 
{
    const cnpjData = `
Empresa: ${data?.razao_social}
CNPJ: ${data?.cnpj.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3/$4-$5")}
Situação: ${data?.descricao_situacao_cadastral}
Porte: ${data?.porte} 
Capital Social: ${`R$ ${data?.capital_social},00`}
Data de Abertura: ${formatDate(data?.data_inicio_atividade)}
Tipo: ${data?.descricao_identificador_matriz_filial}
Natureza Jurídica: ${data?.natureza_juridica}
Logradouro: ${data?.logradouro}
Bairro: ${data?.bairro}
Município: ${data?.municipio}
CEP: ${data?.cep}
Telefone: ${data?.ddd_telefone_1}${data.ddd_telefone_2 ? ' - '.concat(data.ddd_telefone_2) : ''}
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