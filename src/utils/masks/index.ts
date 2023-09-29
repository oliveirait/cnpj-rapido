
export const telMask = {
    reg: /^(\d{2})(\d{4})(\d{4})/, 
    string: "($1) $2-$3"
}

export const cnpjMask = {
    reg: /(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, 
    string: "$1.$2.$3/$4-$5"
}

export const cepMask = {
    reg: /^(\d{5})(\d{3})/, 
    string: "$1-$2"
}

export const cnaeMask = {
    reg: /^(\d{4})(\d{1})(\d{2})/, 
    string: "$1-$2/$3"
}