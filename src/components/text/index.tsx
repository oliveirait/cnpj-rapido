import { Text as ComponentText, TextProps } from 'react-native'
import { styles } from './styles'

interface PropsText extends TextProps {
    text: string | number
}


export const TextHeader = ({text, ...rest}: PropsText) => {
    return (
        <ComponentText style={styles.textTitleHeader} {...rest}>
            {text}
        </ComponentText>
    )
}

export const TextTitle = ({text, ...rest}: PropsText) => {
    return (
        <ComponentText style={styles.textTitleCard} {...rest}>
            {text}
        </ComponentText>
    )
}

export const TextDescription = ({text, ...rest}: PropsText) => {
    return (
        <ComponentText style={styles.textDescripionCard} {...rest}>
            {text}
        </ComponentText>
    )
}