
interface CORDINATES {
    longitude: string
    latitude: string
}

interface TYPELOCATION {
    type: string
    cordinates: CORDINATES
}

export interface CepProps {
    cep: string,
    state: string,
    city: string,
    neighborhood: string,
    street: string,
    service: string,
    location: TYPELOCATION,
}





  
