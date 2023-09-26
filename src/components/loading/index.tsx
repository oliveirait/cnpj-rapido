import { ActivityIndicator, View } from "react-native"

interface LoadingProps {
    size: number
    color: string
    justify: 'flex-start' | 'flex-end' | 'center'
}

export const Loading = ({size, color, justify}: LoadingProps) => {
    return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: justify, paddingTop: 50}}>
            <ActivityIndicator size={size} color={color} />
        </View>
       
    ) 
}