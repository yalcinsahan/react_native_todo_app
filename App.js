import React, { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TextInput,
  Button,
  FlatList,
} from 'react-native';
import { RFValue } from "react-native-responsive-fontsize";


const App = () => {

  const [input,setInput] = useState("")
  const [buttonName,setButtonName] = useState("Add")
  const [editKey,setEditKey] = useState("")
  const [tasks,setTasks] = useState([
    {key:uuidv4(), title:"Ders Çalış"},
    {key:uuidv4(), title:"Alışveriş Yap"},
    {key:uuidv4(), title:"Kod Yaz"},
    {key:uuidv4(), title:"Kitap Oku"}])

    const addTask=()=>{
     if(buttonName==="Add"){
      if(input==="") return alert("görev adı boş olamaz.")
      setTasks([...tasks,{key:uuidv4(),title:input}])
      setInput("")
     }
     else{
      setTasks(tasks.filter((task)=>task.key===editKey ? task.title=input : task))
      setInput("")
      setButtonName("Add")
     }
    }

    const editTask = (item)=>{
      setButtonName("edit")
      setInput(item.title)
      setEditKey(item.key)
    }

    const deleteTask=(key)=>{
      setTasks(tasks.filter((task)=>task.key!==key))
    }

  return (
      <SafeAreaView style={styles.safeArea}>

        <Text style={styles.header}>My Daily Tasks</Text>

        <View style={styles.inputView}>
          <TextInput value={input} onChangeText={(text)=>setInput(text)} style={styles.taskInput} />
          <View style={styles.addButtonView}>
          <Button onPress={()=>addTask()} color="blue" title={buttonName} />
          </View>
        </View>

        <FlatList style={styles.taskList}
            data={tasks}
            renderItem={(({item})=>
            <View style={styles.itemView}>
                <Text style={styles.itemText}>{item.title}</Text>
                <View style={styles.buttonView}>
                <View style={{marginRight: RFValue(10)}}>
                <Button 
                title="edit" 
                color="green"
                onPress={()=>editTask(item)}
                 />
                </View>
                <Button
                 title="delete"  
                 color="red" 
                 onPress={()=>deleteTask(item.key)}
                 />
                </View>
            </View>)}
        />

        
      </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea:{
    flex: 1,
    padding: RFValue(5)
  },
  header: {
    textAlign: 'center',
    padding: "5%",
    fontSize: RFValue(25),
  },
  inputView:{
    flexDirection: 'row',
    borderRadius: RFValue(6),
    borderWidth: RFValue(1),
    overflow: "hidden",
  },
  taskInput:{
    width: "80%",
    padding: 0,
    paddingHorizontal: RFValue(4)
  },
  taskList:{
    marginVertical: "5%",
  },
  addButtonView:{
    width: "20%",
    borderLeftWidth: 0
  },
  itemView: {
    flexDirection: 'row',
    justifyContent: "space-between",
    padding: "2%",

},
itemText:{
    textAlignVertical: "center",
    fontSize: RFValue(20)
},
buttonView:{
    flexDirection: "row"
}
});

const uuidv4 = () => { 
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

export default App;
