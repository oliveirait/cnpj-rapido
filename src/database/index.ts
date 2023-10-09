import Realm from "realm"
import { CnpjSchema } from "./schema/CnpjSchema"


export const RealmDB = async () => await Realm.open({
    path: "cnpj-app",
    schema: [CnpjSchema]
})