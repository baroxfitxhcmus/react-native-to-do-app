import React from 'react'
import { Text, View, TextInput, StyleSheet, TouchableOpacity } from 'react-native'


export default function InputToDo(props) {
const [text, setText] = React.useState('');
const getItem = (text) => {
    const item = {
        id: setIdForItem(), 
        content: text,
        status: true
    }
    
    return item;
}
const setIdForItem = () => {
    if(props.data.length === 0){
        return 1;
    }
    const itemCur = props.data.reduce((item1, item2) => item1.id > item2.id ? item1 : item2);
    return itemCur.id + 1;
}
return(
    <View>
        <View style={styles.container}>
            <TextInput  
                style={styles.input}
                onChangeText={text => {
                    setText(text);
                }}
                defaultValue={text}
                />
            <TouchableOpacity activeOpacity={0.5} 
                onPress={() => {
                    if(text != ''){
                        props.getData(getItem(text));
                        setText('');
                    }
                    
                }}
                style={{justifyContent: 'center', alignItems: 'center'}}
            >
                <Text style={styles.buttonAdd}>Add</Text>
            </TouchableOpacity>
            
        </View>
    </View>
)
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        height: 40,
        justifyContent: 'space-between'   
        
    },
    input: {
        flex: 8,
        height: 40,
        borderWidth: 1,
        marginHorizontal: 16,
        borderRadius: 10,
        fontSize: 20,
        textAlign: 'center',
        backgroundColor: '#fff',
    },
    buttonAdd: {
        flex: 2,
        backgroundColor: 'green',
        height: 40,
        paddingHorizontal: 20,
        color: '#fff',
        fontSize: 20,
        borderRadius: 5,
        paddingTop: 7,
        shadowColor: '#000'
    },
    
})