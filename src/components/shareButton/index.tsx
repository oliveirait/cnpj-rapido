import React from "react";
import { ComponentButton } from "../button";
import { AntDesign } from '@expo/vector-icons';
import { StyleSheet } from "react-native";


export function ShareButton () {
    return (
        <ComponentButton.ButtonWrapper style={styles.button}>
            <ComponentButton.ButtonIcon icon={ <AntDesign name="sharealt" size={18} color="white" /> }/>
            <ComponentButton.ButtonText text="Compartilhar" style={styles.textButton}/>
        </ComponentButton.ButtonWrapper>
    )
}

const styles = StyleSheet.create({
    button: {
        flex: 0.06,
        flexDirection: 'row',
        width: '90%', height: 50,
        borderRadius: 10,
        paddingHorizontal: 10, paddingVertical: 4,
        alignItems: 'center', justifyContent: 'center', alignSelf: 'center',
        gap: 10,
        backgroundColor: '#1d8e09',
        marginBottom: 10,
    },

    textButton: {
        textAlign: 'center',
        color: '#fff',
        fontFamily: 'Bold'
    },
})