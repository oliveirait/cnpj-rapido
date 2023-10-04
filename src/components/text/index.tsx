import { Text as Tx, TextProps } from 'react-native'
import { styles } from './styles'

interface PropsText extends TextProps {
    text: string | number
}


export const TextHeader = ({text, ...rest}: PropsText) => {
    return (
        <Tx style={styles.textTitleHeader} {...rest}>
            {text}
        </Tx>
    )
}

export const TextTitle = ({text, ...rest}: PropsText) => {
    return (
        <Tx style={styles.textTitleCard} {...rest}>
            {text}
        </Tx>
    )
}

export const TextDescription = ({text, ...rest}: PropsText) => {
    return (
        <Tx style={styles.textDescripionCard}  {...rest}>
            {text}
        </Tx>
    )
}