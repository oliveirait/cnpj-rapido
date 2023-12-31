export const CnpjSchema = {
    name: "CnpjSchema",
    properties: {
        "_id": "string",
        "bairro":"string?",
        "capital_social":"int?",
        "cep":"string?",
        "cnae_fiscal":"int?",
        "cnae_fiscal_descricao":"string?",
        "cnaes_secundarios":[
            {
                "codigo":"int",
                "descricao": "string?",
            }
        ],
        "cnpj":"string?",
        "codigo_municipio":"int?",
        "codigo_municipio_ibge":"int?",
        "codigo_natureza_juridica":"int?",
        "codigo_pais":"int?",
        "codigo_porte": "int?",
        "complemento":"string?",
        "data_exclusao_do_mei":"string?",
        "data_exclusao_do_simples":"string?",
        "data_inicio_atividade":"string?",
        "data_opcao_pelo_mei":"string?",
        "data_opcao_pelo_simples":"string?",
        "data_situacao_cadastral":"string?",
        "data_situacao_especial":"string?",
        "ddd_fax":"string?",
        "ddd_telefone_1":"string?",
        "ddd_telefone_2":"string?",
        "descricao_identificador_matriz_filial":"string?",
        "descricao_motivo_situacao_cadastral":"string?",
        "descricao_porte":"string?",
        "descricao_situacao_cadastral":"string?",
        "descricao_tipo_de_logradouro":"string?",
        "email":"string?",
        "ente_federativo_responsavel":"string?",
        "identificador_matriz_filial":"int?",
        "logradouro":"string?",
        "motivo_situacao_cadastral":"int?",
        "municipio":"string?",
        "natureza_juridica":"string?",
        "nome_cidade_no_exterior":"string?",
        "nome_fantasia":"string?",
        "numero":"string?",
        "opcao_pelo_mei":"bool?",
        "opcao_pelo_simples":"bool?",
        "pais":"string?",
        "porte":"string?",
        "qsa":[
            {
                "cnpj_cpf_do_socio":"string?",
                "codigo_faixa_etaria":"int?",
                "codigo_pais":"int?",
                "codigo_qualificacao_representante_legal":"int?",
                "codigo_qualificacao_socio":"int?",
                "cpf_representante_legal":"string?",
                "data_entrada_sociedade":"string?",
                "faixa_etaria":"string?",
                "identificador_de_socio":"int?",
                "nome_representante_legal":"string?",
                "nome_socio":"string?",
                "pais":"string?",
                "qualificacao_representante_legal":"string?",
                "qualificacao_socio":"string?",
            },
        ],
        "qualificacao_do_responsavel":"int?",
        "razao_social":"string?",
        "situacao_cadastral":"int?",
        "situacao_especial":"string?",
        "uf":"RJ"
    },

    primaryKey: "_id"
    
}