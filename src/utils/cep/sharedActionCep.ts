import { Share } from "react-native";
import { cepMask } from "../masks";
import { CepProps } from "../../@types/cep";


export async function shareActionCep (data: CepProps, dataHora?: string) 
{
    const cepData = `
CEP: ${data?.cep.replace(cepMask.reg, cepMask.string)}
ENDEREÇO: ${data?.street}
BAIRRO: ${data?.neighborhood}
ESTADO: ${data?.city}
UF: ${data?.state}

Dados recebidos a partir do aplicativo CNPJ Consulta:
https://play.google.com/store/apps/details?id=com.oliveirafocs.cnpjrapido
`
    const response = await Share.share(
        {
            title: `Consulta de CEP`,
            message: cepData
        },

        {
           dialogTitle: 'Compartilhar através de ...',
        }
    )
}