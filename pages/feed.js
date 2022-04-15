import React,{useEffect, useState} from "react";
import { useNavigation } from "@react-navigation/core";
import { StyleSheet, View, Text, FlatList, Image, TouchableOpacity, TextInput, Modal, Alert, Button, ImageBackground } from "react-native";
import axios from "axios";

function Feed(){
    const [data, setData] = useState();
    const [name, setName] = useState();
    const [title, setTitle] = useState();
    const [photo, setPhoto] = useState();
    const navigation = useNavigation();
    const [modalVisible, setModalVisible] = useState(false);

    const getAxiosData = async () => {
        try{
            const response = await axios.get('https://62205248ce99a7de1955f418.mockapi.io/fb',);
            await setData(response.data);
        }catch (error){
            console.log("error is",error)
        }
    };
    useEffect(()=> {
        getAxiosData();
    },[]);


    const onSubmitFormHandler = async event => {
        if (name == '' || title == '' || photo == '') {
          alert('Fill Your name, photo and Age');
        }
        try {
          const response = await axios.post(
            'https://62205248ce99a7de1955f418.mockapi.io/fb',
            {
              name,
              title,
              photo,
            },
          );
          if (response.status == 201) {
            alert(` You have created:`);
            setName('');
            setTitle('');
            setPhoto('');
            Keyboard.dismiss();
            getAxiosData();
          } else {
            throw new Error('An error occured');
          }
        } catch (error) {
          ('An error has occured in catch');
        }
      };

    return(
        <View style={styles.mainContainer}>
            <Text style={styles.headerText}>ғᴇᴇᴅ</Text>
            <Button
        title='create a new post'
        onPress={() => setModalVisible(true)}></Button>
            <Modal animationType='slide'
            transparent={false}
            visible={modalVisible}
            onRequestClose={() => {
                Alert.alert('Modal has been closed');
                setModalVisible(!modalVisible);
            }} style={{backgroundColor:'#fff'}}>

                <TextInput placeholder='Enter name'
                placeholderTextColor='black'
                value={name}
                onChangeText={text=>setName(text)}
                style={{color:'black', top:80, borderColor:'black', borderWidth:2, borderRadius:8, width:330, textAlign:'center', marginLeft:15}}></TextInput>

                <TextInput placeholder='Photo in HTTPS'
                placeholderTextColor='black'
                value={photo}
                onChangeText={text=>setPhoto(text)}
                style={{color:'black', top:100, borderColor:'black', borderWidth:2, borderRadius:8, width:330, textAlign:'center', marginLeft:15}}></TextInput>

                <TextInput placeholder='enter your post title'
                placeholderTextColor='black'
                value={title}
                onChangeText={text=>setTitle(text)}
                style={{color:'black', top:120, borderColor:'black', borderWidth:2, borderRadius:8, width:330, textAlign:'center', marginLeft:15}}></TextInput>

                <TouchableOpacity style={{height:30, width:130, top:190, backgroundColor:'green', borderRadius:10, marginLeft:120}}
                onPress={onSubmitFormHandler}>
                    <Text style={{color:'#fff', textAlign:'center', marginTop:5}}>Submit</Text>
                </TouchableOpacity>
            </Modal>
            <FlatList
            data={data}
            renderItem={({item}) => {
                return(
                    <View style={styles.flatlistContainer}>
                        <Image source={{uri: item.photo}} 
                        style={{height:40, width:40, borderRadius:110, position:'absolute', marginLeft:10}}></Image>
                        <Text style={styles.avatarText}>{item.name}</Text>
                        <TouchableOpacity onPress={()=> navigation.push('Details',{id: item.id})}>
                        <Image source={{uri: item.photo}} style={styles.avatarImage}></Image>
                        </TouchableOpacity>
                     </View>
                )
            }}
            keyExtractor={item => item.id}></FlatList>
        </View>
    )
}

const styles = StyleSheet.create({
    mainContainer:{
        height:'100%',
        width:'100%', 
        backgroundColor:'#fff'
    },
    headerText:{
        fontSize:24, 
        textAlign:'center', 
        fontWeight:'bold', 
        color:'black'
    },
    flatlistContainer:{
        backgroundColor:'black',
        width: "100%",
        height: 300,
        marginTop: 10,
    },
    avatarText:{
        fontSize:30, 
        textAlign:'center', 
        fontWeight:'600', 
        color:'#fff',
        fontStyle:'italic'
    },
    avatarImage:{
        height:250, 
        width:'100%', 
    }
})
export default Feed;
