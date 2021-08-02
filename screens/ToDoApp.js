import React from 'react'
import { Text, View, StyleSheet} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'


import InputToDo from '../components/Input'
import ListTask from '../components/ListTask'


export default function  Todo(props) {
const [data, setData] = React.useState([])

// Check AsyncStorage: if exist set data from AsyncStorage; else return empty array
React.useEffect(() => {
    const checkStorage = async () => {
        const value = await AsyncStorage.getItem('ListTask')
        if(value !== undefined && value !== null) {
            setData(JSON.parse(value))
        } else {
            setData([])
            await AsyncStorage.setItem('ListTask',JSON.stringify([]))
        }
    }
    checkStorage()
    
}, [])
// Get item from input to push data
const getData = async (item) => {
    const xData = [...data, item]
    const fData = sortData(xData)
    await AsyncStorage.setItem('ListTask', JSON.stringify(fData))
    setData(JSON.parse(await AsyncStorage.getItem('ListTask')))

}
// Sort data after item of data is updated status or removed
const  sortData =   (data) => {
    const xData = data;
    xData.sort((a,b) => {
        return  b.status - a.status ;
    })
    xData.sort((a,b) => {
        if(a.status === b.status) {
            return a.id - b.id;
        }
    })
    updateStorage(xData)
    return xData;
};
// Get item status of data after user change status
const changeStatus = (id) => {
    const xData = data.map((item) => {
        if(item.id === id){
            item.status = !item.status;
        }
        return item;
    })
    setData(sortData(xData));
}
// Statistic amount task is done and mount task is not done
const getStatistic = () => {
    let done = 0;
    let do_not = 0;
    for(let item of data){
        if(item.status === true){
            do_not++;
        }else{
            done++;
        }
    }
    return {done, do_not};
}
// Update data after an item of data is removed
const removeItemById = (id) => {
    const xData = data
    setData(xData.filter(element => element.id !== id))
    updateStorage(xData.filter(element => element.id !== id))
}
// Sync between State and AsyncStorage after State is changed
const updateStorage = async (data) => {
    await AsyncStorage.setItem('ListTask', JSON.stringify(data))
}

    return (
        <View>
            <Text style={styles.title}>To Do List</Text>
            <View style={styles.input}>
                <InputToDo getData={getData} data={data} />
            </View>
            <View style={styles.listTask}>
                <ListTask list={data} changeStatus={changeStatus} removeItemById={removeItemById}/>
            </View>
            <View style={styles.total}>
                <Text style={styles.detailDone}>Task done: {getStatistic().done} </Text>
                <Text style={styles.detailDo_not}>Task do not: {getStatistic().do_not}</Text>
            </View>
        </View>
        
    )
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'stretch',
        justifyContent: 'center',
        marginTop: 40
    },
    title: {
        textAlign: 'center', 
        textTransform: 'uppercase', 
        fontWeight:'bold', 
        fontSize: 30
    },
    input: {
        justifyContent: 'center',
        alignItems: 'stretch',
        marginRight: 15,
        marginVertical: 10, 
    },
    listTask: {
        marginVertical: 10
    },
    total: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
 
        
    },
    detailDone: {
        fontSize: 20,
        marginHorizontal: 15,
        padding: 10,
        backgroundColor: 'green',
        elevation: 1,
        shadowColor: '#000',
        borderRadius: 5,
        color: '#fff'

    },
    detailDo_not: {
        fontSize: 20,
        marginHorizontal: 15,
        padding: 10,
        backgroundColor: 'red',
        elevation: 1,
        shadowColor: '#000',
        borderRadius: 5,
        color: '#fff'

    },
    viewTask: {
        backgroundColor: 'green',
        fontSize: 20,
        marginVertical: 15,
        paddingVertical: 7,
        paddingHorizontal: 15,
        color: '#fff',
        elevation: 1,
        shadowColor: '#000',
        shadowOpacity: 0.5,
        borderRadius: 5
    }
})

