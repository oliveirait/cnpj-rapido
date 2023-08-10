import { Text, TextProps} from "react-native"


interface ButtonTextProps extends TextProps {
    text: string
}

export function ButtonText ({text}: ButtonTextProps ) {
    return (
        <Text style={{color: 'white'}}>
            {text}
        </Text>
    )
}