import Realm from "realm"
import { CnpjSchema } from "./CnpjSchema"


export const db = async () => await Realm.open({
    path: "cnpj-app",
    schema: [CnpjSchema]
})