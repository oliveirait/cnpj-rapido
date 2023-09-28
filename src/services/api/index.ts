import axios from 'axios';


export const get_CNPJ = axios.create({
    baseURL: 'https://brasilapi.com.br/api/cnpj/v1/'
})