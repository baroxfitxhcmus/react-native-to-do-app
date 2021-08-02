import React from 'react'
import { View , StyleSheet, Text} from 'react-native'
import {FontAwesome} from 'react-native-vector-icons'


export default function Task(props) {
const {item} = props;
const [data, setData] = React.useState({...item, color: item.status === true ? 'gray' : 'green'});

const changeStatus = (status) => setData({...data,status: !status, color: data.status !== true ? 'gray' : 'green' })
const getStyle = () => data.status ? styles.content : styles.contentFalse;

    return (
        <View style={styles.container}>
            <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', flex: 4, justifyContent:'flex-start' }}>
                <Text style={styles.index}>{item.id}</Text>
                <Text style={getStyle()}>{item.content}</Text>
            </View>
            <View style={{flexDirection: 'row', flex: 1, justifyContent: 'flex-end'}}>
                <FontAwesome 
                    name="check-square" 
                    style={styles.check} 
                    size={35}
                    color={data.color}
                    onPress={() => {                      
                        changeStatus(data.status);  
                        props.changeStatus(data.id);    
                    }}
                    />
                <FontAwesome 
                    name="trash"
                    size={35}
                    color='red'
                    onPress={() => {
                        props.removeItemById(data.id);
                    }}
                    />
            </View>
            
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        height: 50,
        alignItems: 'center',
        elevation: 1,
        shadowColor: '#000',
        shadowOpacity: 0.3,
        shadowRadius: 10,
        shadowOffset: {width: 0, height: 0},
        borderRadius: 4,
        backgroundColor: '#fff',
        marginBottom: 16,
        justifyContent: 'space-between',
        marginHorizontal: 16,
        paddingRight: 10
    },
    content: {
        fontSize: 20,
        
    },
    check: {
        marginRight: 15,

    },
    index: {
        marginHorizontal: 15,
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 4,
        backgroundColor: 'green',
        color: 'white',
    },
    contentFalse: {
        fontSize: 20,
        textDecorationLine: 'line-through',
        opacity: 0.5
    },
})