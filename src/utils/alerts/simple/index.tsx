import { Alert } from "react-native"

type SimpleAlertProps = {
    title: string
    description: string
}

export function simpleAlert ({title, description}: SimpleAlertProps) {
    return (
        Alert.alert(
            `${title}`, 
            `${description}`,
            [{text: `OK`}],
            {cancelable: true}
        )
    )
}