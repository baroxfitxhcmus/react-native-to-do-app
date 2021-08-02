import React from 'react';
import {FlatList, StyleSheet, View} from 'react-native'

import Task from './Task'

export default function ListTask(props)  {
    const [data, setData] = React.useState(props.list);
    React.useEffect(() => {
        setData(props.list)
    }, [props.list])
     return(
        <View style={styles.container}>
            <FlatList 
                data={data}
                renderItem={({item}) => <Task item={item}  changeStatus={props.changeStatus} removeItemById={props.removeItemById}/>}
                keyExtractor={item => item.id.toString()}
                style={{flexGrow: 1, height: 450}}
            />
        </View>
    )
    
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'stretch',
    }
})




