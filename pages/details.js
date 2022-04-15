import React from "react";
import { View , StyleSheet, ImageBackground, TextInput, Button, Text} from "react-native";
import { useRoute } from "@react-navigation/core";
import { useEffect, useState } from "react";
import axios from "axios";


function Details(){
    const [data, setData] = useState();
    const [comment, setComment] = useState();
    const [newComment, setNewComment] = useState();
    const route= useRoute();
    const { id } = route.params;

    const onChangeCommentHandler = comment => {
        setComment(comment)
    }

    const onSubmitFormHandler = async ()=> {
        if(comment == ''){
            alert("Enter comment")
        } try {
            const response = await axios.put(`https://62205248ce99a7de1955f418.mockapi.io/fb/${id}`,{comments:[...data?.comments,comment]},);
            if(response.status == 201){
                alert(` posted your comment`);
                setComment('');
            }else{
                throw new Error('An Error occured');
            }
        }catch (error) {
            ('An error occured in catch');
        }
    };

//GET//
const getAxiosData = async () => {
        try{
            const response = await axios.get(`https://62205248ce99a7de1955f418.mockapi.io/fb/${id}`);
            setData(await response.data);
            console.log('get method called without errors')
        }catch (error){
            console.log("error is",error)
        }
    };
    useEffect(()=> {  
        getAxiosData();
    },[]);

    return(
        <View style={styles.container}>
                {data &&<ImageBackground source={{uri: data.photo}}
                style={{height:'80%',
                width:'90%',
                top:-30,
                left:17
                }}>
                </ImageBackground>}
                <Text>{data.comment.map}</Text>
                <TextInput placeholder='comment here'
                placeholderTextColor='black'
                value={comment}
                onChangeText={text=>setComment(text)}
                style={{color:'black', bottom:100, borderColor:'black', borderWidth:2, borderRadius:8, width:330, paddingLeft:130}}></TextInput>
                <Button
        title='Submit'
        onPress={onSubmitFormHandler}></Button>

            </View>
    )
}

const styles = StyleSheet.create({
    container:{
        height:'100%',
        width:'100%',
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'#fff'
    }
})

export default Details;