import { View, Text } from "react-native";



export function EmptyHistory () 
{
    return (
        <View style={{width: '100%', height: 150, alignItems: 'center', justifyContent: 'center'}}>
            <Text style={{fontFamily: 'Bold', fontSize: 16}}>
                Não há itens para exibir
            </Text>
        </View>
    )
}