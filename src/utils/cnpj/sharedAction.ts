import { Share, ShareStatic } from "react-native";
import { CnpjProps } from "../../@types/cnpj";

export async function shareAction (data: CnpjProps) 
{
    
    const response = await Share.share(
        {
            title: 'Dados da Empresa',
            message: data ? data.bairro : 'N/A'
        }
    )
    console.log(JSON.stringify(response))
}