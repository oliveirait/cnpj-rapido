import { StyleSheet } from "react-native"
import theme from "../../utils/theme/theme"


export const styles = StyleSheet.create({
    container: {
        flex: 1, 
        alignItems: 'center', justifyContent: 'space-between', 
        backgroundColor: theme.colors.white
    },
    
    cnjp_datails: {
        flex: 1,
        width: '100%',
        backgroundColor: theme.colors.white,
        paddingHorizontal: 20
    },

    card: {
        width: '100%', height: 'auto', 
        backgroundColor: theme.colors.white, 
        borderRadius: 20, 
        padding: 10,
        marginVertical: 0,
    },

    viewTitleCard: {
        height: 32,
        width: '100%',
        backgroundColor: theme.colors.blue,
        borderRadius: 10,
        alignItems: 'center', justifyContent: 'center',
        elevation: 10, shadowColor: theme.colors.black,
        overflow: "scroll"

    },

    viewDescriptionCard: {
        flex: 1,
        width: '100%',
        backgroundColor: '#f1f1f1',
        borderRadius: 10,
        alignItems: 'center', justifyContent: 'flex-start',
        marginVertical: 10,
        gap: 5,
        padding: 10,
        elevation: 10, shadowColor: theme.colors.black,
        
    },

    textTitleHeader: {
        textAlign: 'center',
        color: theme.colors.white,
        fontFamily: 'Bold',
        fontSize: 18,
    },

    textTitleCard: {
        fontFamily: 'Bold'
    },

    textDescripionCard: {
        fontFamily: 'Regular', fontSize: 12,
        textAlign: 'center'
    },

    button: 
    {
        flexDirection: 'row',
        width: '90%', height: 50,
        borderRadius: 10,
        paddingHorizontal: 10, paddingVertical: 4,
        alignItems: 'center', justifyContent: 'center',
        gap: 5,
        backgroundColor: theme.colors.black,
    },

    textButton: 
    {
        textAlign: 'center',
        color: theme.colors.white,
        fontFamily: 'Bold'
    },



})