import { Dimensions, StyleSheet } from "react-native";


export const styles = StyleSheet.create({
    container: {
        width: Dimensions.get('screen').width,
        height: Dimensions.get('screen').height,
        alignItems: 'center', justifyContent: 'flex-start',
        gap: 10, marginTop: 30
    },

    title: {
        fontFamily: 'Bold', fontSize: 36, 
        alignSelf: 'flex-start', paddingHorizontal: 20,
        paddingBottom: 10
        
    },

    input: {
        width: '90%', height: 50,
        borderWidth: 1, borderColor: '#000', borderRadius: 10,
        paddingHorizontal: 10, paddingVertical: 4,
        backgroundColor: '#fff',
        fontFamily: 'Bold'
    },


    button: {
        flexDirection: 'row',
        width: '90%', height: 50,
        borderRadius: 10,
        paddingHorizontal: 10, paddingVertical: 4,
        alignItems: 'center', justifyContent: 'center',
        gap: 5,
        backgroundColor: '#000',
    },

    textButton: {
        textAlign: 'center',
        color: '#fff',
        fontFamily: 'Bold'
    },

    cnjp_datails: {
        flex: 1,
        width: '90%',
        margin: 10,
        borderRadius: 20,
        backgroundColor: '#fff',
        padding: 20,
        gap: 10,
        elevation: 20, shadowColor: '#000',
        
    }
})