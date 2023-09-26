import { StatusBar, StatusBarProps } from 'react-native'

export function Status ({...rest}: StatusBarProps) {
    return (
        <StatusBar barStyle="default" {...rest}/>
    )
}