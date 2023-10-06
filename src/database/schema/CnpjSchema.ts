export const CnpjSchema = {
    name: "CnpjSchema",
    properties: {
        "_id": "string",
        "razao_social": "string",
        "cnpj": "string",
        "data_consulta": "string",
        "descricao_situacao_cadastral": "string"
    },

    primaryKey: "_id"
}