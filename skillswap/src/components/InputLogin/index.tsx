import React from "react";
import { TextInput, View } from 'react-native';
import styles from './styles';
import { Ionicons } from '@expo/vector-icons';

interface InputLoginProps {
    placeholder: string
    login: string
    setLogin: any
}

export const InputLogin = (props: InputLoginProps) => {
    return (
        <View style={styles.inputLogin} >
            <Ionicons 
                name="skull" 
                style={{
                    position: 'absolute',
                    left: 13,
                    top: 10,
                    color: 'gray',
                    fontSize: 28
                }}
            />

            <TextInput
                style={styles.input}
                placeholder={props.placeholder}
                placeholderTextColor={'gray'}
                onChangeText={(text) => props.setLogin(text)}
                value={props.login}
            />

        </View>
    )
}