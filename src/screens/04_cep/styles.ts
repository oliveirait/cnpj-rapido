import { StyleSheet } from "react-native";
import theme from "../../utils/theme/theme";


export const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        justifyContent: 'space-between', alignItems: 'center',
    },

    title: {
        fontFamily: 'Bold', fontSize: 28, 
        alignSelf: 'flex-start', paddingHorizontal: 20,
        paddingBottom: 10
        
    },

    viewInput: {
        width: '100%',
        alignItems: 'center', justifyContent: 'flex-start',
        gap: 10, paddingVertical: 20
    },

    input: {
        width: '90%', height: 50,
        borderWidth: 1, borderColor: theme.colors.black, borderRadius: 10,
        paddingHorizontal: 10, paddingVertical: 4,
        backgroundColor: theme.colors.white,
        fontFamily: 'Bold'
    },


    button: {
        flexDirection: 'row',
        width: '90%', height: 50,
        borderRadius: 10,
        paddingHorizontal: 10, paddingVertical: 4,
        alignItems: 'center', justifyContent: 'center',
        gap: 5,
        backgroundColor: theme.colors.black,
    },

    textButton: {
        textAlign: 'center',
        color: theme.colors.white,
        fontFamily: 'Bold'
    },

    cnjp_datails: {
        flex: 1,
        width: '90%',
        margin: 10,
        borderRadius: 20,
        backgroundColor: theme.colors.white,
        padding: 20,
        gap: 10,
        elevation: 20, shadowColor: theme.colors.black,
        
    },

    viewBanner: {
        margin: 10, alignSelf: 'center', justifyContent: 'center', alignItems: 'center',
        overflow: "scroll"
    }

})