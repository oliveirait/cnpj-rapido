import { ActivityIndicator } from "react-native"

interface LoadingProps {
    size: number
    color: string
}

export const Loading = ({size, color}: LoadingProps) => {
    return <ActivityIndicator size={size} color={color}/> 
}