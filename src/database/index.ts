import Realm from "realm"
import { CnpjSchema } from "./schema/CnpjSchema"


export const db = async () => await Realm.open({
    path: "cnpj-app",
    schema: [CnpjSchema]
})