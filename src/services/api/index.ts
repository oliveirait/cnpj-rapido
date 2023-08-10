import axios from 'axios';

type CnpjInputProps = {
    cnpj: string
}

export const CNPJ = axios.create({
    baseURL: 'https://brasilapi.com.br/api/cnpj/v1/'
})