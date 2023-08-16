import { StatusBarProps } from 'react-native'

export function StatusBar ({...rest}: StatusBarProps) {
    return (
        <StatusBar barStyle="default" {...rest}/>
    )
}