import { StyleSheet } from "react-native"


export const styles = StyleSheet.create({
    cnjp_datails: {
        flex: 1,
        width: '100%',
        backgroundColor: '#fff',
        paddingHorizontal: 20
    },

    card: {
        width: '100%', height: 'auto', 
        backgroundColor: '#fff', 
        borderRadius: 20, 
        padding: 10,
        marginVertical: 0,
    },

    viewTitleCard: {
        height: 50,
        width: '100%',
        backgroundColor: '#000',
        borderRadius: 10,
        alignItems: 'center', justifyContent: 'center',
        elevation: 10, shadowColor: '#000'

    },

    viewDescriptionCard: {
        flex: 0.8,
        width: '100%',
        backgroundColor: '#f1f1f1',
        borderRadius: 10,
        alignItems: 'center', justifyContent: 'flex-start',
        marginVertical: 10,
        gap: 5,
        padding: 10,
        elevation: 10, shadowColor: '#000'
    },

    textTitleHeader: {
        textAlign: 'center',
        color: '#fff',
        fontFamily: 'Bold',
        fontSize: 18
    },

    textTitleCard: {
        fontFamily: 'Bold'
    },

    textDescripionCard: {
        fontFamily: 'Regular', fontSize: 12,
        textAlign: 'center'
    }

})