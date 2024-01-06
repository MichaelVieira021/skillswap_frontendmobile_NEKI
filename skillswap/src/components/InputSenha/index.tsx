import React from "react";
import styles from './styles';
import { TextInput, TouchableOpacity, View } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { useState } from 'react';

interface InputSenhaProps {
    placeholder: string
    senha: string
    setSenha: any
}

export const InputSenha = (props : InputSenhaProps) => {
    const [verSenha, setVerSenha] = useState(false)

    return(
        <View style={styles.inputSenha}>
            <FontAwesome 
                name="key" 
                style={{
                    position: 'absolute',
                    left: 3,
                    top: 7,
                    color: 'gray',
                    fontSize: 25
                }}
            />

            <TextInput
                style={styles.input}
                secureTextEntry={!verSenha ? true : false}
                placeholder={props.placeholder}
                placeholderTextColor={'gray'} 
                onChangeText={(text) => props.setSenha(text)}
                value={props.senha}
            />

            <TouchableOpacity
                style={{
                    position: 'absolute',
                    top: 7,
                    right: 8,
                }}
                onPress={()=> setVerSenha(!verSenha)}
            >
              {verSenha ? <Entypo name="eye" size={24} color={'gray'}/> 
              :<Entypo name="eye-with-line" size={24} color={'gray'}/>}
            </TouchableOpacity>
        </View>
    )
}