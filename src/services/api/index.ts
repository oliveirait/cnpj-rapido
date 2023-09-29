import axios from 'axios';


export const get_CNPJ = axios.create({
    baseURL: 'https://brasilapi.com.br/api/cnpj/v1/'
})

export const get_CEP = axios.create({
    baseURL: 'https://brasilapi.com.br/api/cep/v2/'
})
