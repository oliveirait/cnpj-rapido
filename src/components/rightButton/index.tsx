import { TouchableOpacity, Text, StyleSheet } from "react-native"
import { useNavigation } from '@react-navigation/native'

export const RightComponent = () => {
    const { navigate } = useNavigation()

    return (
        <TouchableOpacity style={styles.badge} onPress={() => navigate('historic')}>
            <Text style={styles.text}>Histórico</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    badge: {
        alignItems: 'center', justifyContent: 'center',
        padding: 4, margin: 10,
        backgroundColor: '#000',
        borderRadius: 30
    },

    text: {
        textAlign: 'center',
        fontSize: 10,
        color: '#fff',
        fontFamily: 'Regular'
    }
})

