import { Dimensions, View } from "react-native";


export function SkeletHistory () {
    return (
        <View style={{
            flex: 1,
            width: Dimensions.get('screen').width,
            backgroundColor: '#fff',
            alignItems: 'center', justifyContent: 'flex-start',
            gap: 5,
            padding: 10,
            elevation: 5, shadowColor: '#000'
        }}>
            <View style={{
                height: 180,
                width: '90%',
                backgroundColor: '#f1f1f1',
                borderRadius: 15,
                alignItems: 'flex-start', justifyContent: 'center',
                gap: 5,
                padding: 20,
                margin: 10,
                elevation: 5, shadowColor: '#000'
            }}></View>

            <View style={{
                height: 180,
                width: '90%',
                backgroundColor: '#f1f1f1',
                borderRadius: 15,
                alignItems: 'flex-start', justifyContent: 'center',
                gap: 5,
                padding: 20,
                margin: 10,
                elevation: 5, shadowColor: '#000'
            }}></View>

            <View style={{
                height: 180,
                width: '90%',
                backgroundColor: '#f1f1f1',
                borderRadius: 15,
                alignItems: 'flex-start', justifyContent: 'center',
                gap: 5,
                padding: 20,
                margin: 10,
                elevation: 5, shadowColor: '#000'
            }}></View>

        <View style={{
                height: 150,
                width: '90%',
                backgroundColor: '#f1f1f1',
                borderRadius: 15,
                alignItems: 'flex-start', justifyContent: 'center',
                gap: 5,
                padding: 20,
                margin: 10,
                elevation: 5, shadowColor: '#000'
            }}></View>        

        <View style={{
                height: 150,
                width: '90%',
                backgroundColor: '#f1f1f1',
                borderRadius: 15,
                alignItems: 'flex-start', justifyContent: 'center',
                gap: 5,
                padding: 20,
                margin: 10,
                elevation: 5, shadowColor: '#000'
            }}></View>               

        </View>        
    )
}