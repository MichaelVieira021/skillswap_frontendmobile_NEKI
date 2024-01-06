import { TextInput, View } from 'react-native';
import styles from './styles.ts';
import { Ionicons } from '@expo/vector-icons';

export const InputLogin = (props) => {
    return (
        <View style={styles.inputLogin} >
            <Ionicons 
                name="skull" 
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
                placeholder={props.placeholder}
                placeholderTextColor={'gray'}
                onChangeText={(text) => props.setLogin(text)}
                value={props.login}
            />

        </View>
    )
}