import { StatusBar, StatusBarProps } from 'react-native'
import theme from '../../utils/theme/theme'

export function Status ({...rest}: StatusBarProps) {
    return (
        <StatusBar barStyle="default" backgroundColor={theme.colors.blue} {...rest}/>
    )
}