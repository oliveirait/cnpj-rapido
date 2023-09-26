import axios from 'axios';


export const CNPJ = axios.create({
    baseURL: 'https://brasilapi.com.br/api/cnpj/v1/'
})