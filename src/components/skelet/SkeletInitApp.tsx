import { View, StyleSheet , Text} from "react-native";
import { Status } from "../statusBar";


export function SkeletInitApp () {
    return (
        <>
        <Status />
            <View style={styles.header} />
            <View style={styles.container}>
                <View style={styles.title}></View>
                <View style={styles.viewInput}></View>
                <View style={styles.viewInput}></View>
            </View>
        </>
    )
}


const styles = StyleSheet.create({

    header: {
        height: 60, backgroundColor: '#e1e1e1',
    },

    container: {
        flex: 1,
        justifyContent: 'flex-start', alignItems: 'center',
        
    },

    title: {
        
        width: '50%', backgroundColor: '#f1f1f1',
        height: 28, marginTop: 20, marginBottom: 20, alignSelf: 'flex-start', 
        marginLeft: 20, elevation: 5
        
    },

    viewInput: {
        width: '90%', backgroundColor: '#f1f1f1',
        height: 50, marginVertical: 5, borderRadius: 10,
        elevation: 5
    },


})