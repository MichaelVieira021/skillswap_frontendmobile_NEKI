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
                    left: 13,
                    top: 11,
                    color: 'black',
                    fontSize: 28
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
                    top: 11,
                    right: 15,
                }}
                onPress={()=> setVerSenha(!verSenha)}
            >
              {verSenha ? <Entypo name="eye" size={28} color={'black'}/> 
              :<Entypo name="eye-with-line" size={28} color={'black'}/>}
            </TouchableOpacity>
        </View>
    )
}