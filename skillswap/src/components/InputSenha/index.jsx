import styles from './styles.ts';
import { TextInput, View } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { useState } from 'react';

export const InputSenha = (props) => {
    const [verSenha, setVerSenha] = useState(false)

    return(
        <View style={styles.inputSenha}>
            <FontAwesome 
                name="key" 
                style={{
                    width: '40px',
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

            <View
                style={{
                    position: 'absolute',
                    top: 7,
                    right: 8,
                    color: 'gray',
                }}
                onClick={()=> setVerSenha(!verSenha)}
            >
              {verSenha ? <Entypo name="eye" size={24} color={'gray'}/> 
              :<Entypo name="eye-with-line" size={24} color={'gray'}/>}
            </View>
        </View>
    )
}