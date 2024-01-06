import { Text, View, TouchableOpacity, ImageBackground, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { styles } from './styles'
import AsyncStorage from '@react-native-async-storage/async-storage'
import background from '../../assets/img/background.gif'
import { InputSenha } from '../../components/InputSenha'
import { Checkbox } from 'react-native-paper';
import { InputLogin } from '../../components/InputLogin'
import { useFonts } from 'expo-font';

export const Cadastro = () => {
    const [fontsLoaded] = useFonts({
        'fontSkillSwap': require("../../assets/fonts/DevilCandle.otf"),
      });
    // const {cadastrarUsuario} = useContext(CadastroContext)
    const [login, setLogin] = useState();
    const [senha, setSenha] = useState();
    const [confirmarSenha, setConfirmarSenha] = useState();
    // const {enqueueSnackbar} = useSnackbar()

    useEffect(()=> {}, [])

    const cadastrarNovoUsuario = () => {
        if(senha === confirmarSenha){
            // cadastrarUsuario(login, senha);
        }else{
            // enqueueSnackbar("senhas não coincidem!",{variant:"error", anchorOrigin:{vertical:'top',horizontal:'right'}})
        }
    }

    return (

        <ImageBackground source={background} style={styles.backgroundCadastro}>
            <View style={styles.containerFormularioCadastroCompleto}>
                <View style={styles.containerFormularioCadastro}>

                    <Text style={[styles.tituloCadastro, {fontFamily: 'fontSkillSwap'}]}>SkillSwap</Text>
                    <Text style={[styles.tituloCadastro, {fontSize: 28, letterSpacing: 9, marginTop: 0}]}>REGISTER</Text>
                    <View style={styles.containerInputs}>

                        <InputLogin setLogin={setLogin} login={login} placeholder="Login"/>

                        <InputSenha setSenha={setSenha} senha={senha} placeholder="Senha" />

                        <InputSenha setSenha={setConfirmarSenha} senha={confirmarSenha} placeholder="Confirmar"/>

                    </View>

                    <View style={styles.containerCadastroButtons}>
                        <TouchableOpacity style={styles.containerInputsButton} onPress={() => console.log('Pressed')}>
                            <Text style={styles.botaoCadastroText}>CADASTRAR</Text>
                        </TouchableOpacity>

                        {/* <TouchableOpacity style={styles.containerInputsButtonLogar} onPress={() => console.log('Pressed')}>
                            <Text style={styles.botaoLogarText}>Logar</Text>
                        </TouchableOpacity> */}

                        <View style={styles.botaoCadastrar}>
                            <Text style={styles.botaoCadastrarText}>Já possui cadastro? <TouchableOpacity><Text  style={{color: '#15b6df'}}>Click aqui!</Text></TouchableOpacity></Text>
                        </View>
                    </View>
                </View>
            </View>
        </ImageBackground>
    )
}