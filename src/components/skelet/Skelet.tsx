import { View, StyleSheet } from "react-native"
import theme from "../../utils/theme/theme"


function Descriptions () {
    return (
        <>
            <View style={styles.title}></View>
            <View style={styles.description}></View>
        </>
    )
}

export function Skelet () 
{
    return (
        <View style={styles.container}>

            <View style={styles.container2}>
                <View style={styles.header} />
                <View style={styles.body}>
                    <Descriptions />
                    <Descriptions />
                    <Descriptions />
                    <Descriptions />
                    <Descriptions />
                    <Descriptions />
                    <Descriptions />
                    <Descriptions />
                    <Descriptions />
                    <Descriptions />
                    <Descriptions />
                    <Descriptions />
                    <Descriptions />
                    <Descriptions />
                    <Descriptions />
                    <Descriptions />
                    <Descriptions />
                    <Descriptions />
                    <Descriptions />
                    <Descriptions />
                    <Descriptions />
                    <Descriptions />
                    <Descriptions />
                    <Descriptions />
                    <Descriptions />
                    <Descriptions />
                    <Descriptions />
                    <Descriptions />
                    <Descriptions />
                    <Descriptions />
            </View>
        </View>
    </View>

       
    )
}


const styles = StyleSheet.create({
    container: 
    {
        flex: 1,
        width: '100%',
        backgroundColor: theme.colors.white,
        paddingHorizontal: 20
    },

    container2: {
        width: '100%', height: 'auto', 
        backgroundColor: theme.colors.white, 
        borderRadius: 20, 
        padding: 10,
        marginVertical: 0,
    },

    header: {
        height: 32,
        width: '100%',
        backgroundColor: theme.colors.disable,
        borderRadius: 10,
        alignItems: 'center', justifyContent: 'center',
        elevation: 10, shadowColor: theme.colors.black,
        overflow: "scroll"
    },

    title: 
    {
        backgroundColor: '#d1d1d1', height: 16, width: 80, borderRadius: 2
    },

    description: 
    {
        backgroundColor: '#d1d1d1', height: 18, width: '85%', borderRadius: 2
    },

    body: {
        height: '100%',
        width: '100%',
        backgroundColor: '#f1f1f1',
        borderRadius: 10,
        alignItems: 'center', justifyContent: 'flex-start',
        marginVertical: 10,
        gap: 5,
        padding: 10,
        elevation: 10, shadowColor: theme.colors.black
    }
})