import { Text, TextProps} from "react-native"


interface ButtonTextProps extends TextProps {
    text: string
}

export function ButtonText ({text, ...rest}: ButtonTextProps ) {
    return (
        <Text {...rest}>
            {text}
        </Text>
    )
}