import { Text, View, TouchableOpacity, ImageBackground, Image } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { styles } from './styles'
import AsyncStorage from '@react-native-async-storage/async-storage'
import background from '../../assets/img/background.gif'
import { InputLogin } from '../../components/InputLogin'
import { InputSenha } from '../../components/InputSenha'
import { Checkbox } from 'react-native-paper';
import { useFonts } from 'expo-font';
import { LoginContext } from '../../contexts/LoginContext'
import { useNavigation } from '@react-navigation/native'

export const Login = () => {
    const [fontsLoaded] = useFonts({
        'fontSkillSwap': require("../../assets/fonts/DevilCandle.otf"),
    });

    const { verificarLogin} = useContext(LoginContext);
    const [login, setLogin] = useState('');
    const [senha, setSenha] = useState('');
    const [gravarSenha, setGravarSenha] = useState(false);
    const navigate = useNavigation<any>();

    useEffect(() => {
        const buscarDadosSalvos = async () => {
            if(AsyncStorage.getItem('gravarSenha')){
                var salvos = JSON.parse( await AsyncStorage.getItem('gravarSenha'))
                setLogin(salvos.login)
                setSenha(salvos.senha)
                setGravarSenha(true)
            }
        }
        console.log("hi")
        buscarDadosSalvos()
    }, [])

    useEffect(()=> {}, [verificarLogin])
    useEffect(() => { }, [gravarSenha])

    const gravarLimparSenhaStorage = () => {
        setGravarSenha(!gravarSenha)

        if (gravarSenha) {
            AsyncStorage.removeItem('gravarSenha')
        }
    }

    return (

        <ImageBackground source={background} style={styles.backgroundLogin}>
            <View style={styles.containerFormularioLoginCompleto}>
                <View style={styles.containerFormularioLogin}>

                    <View style={{alignItems: 'center'}}>
                        <Text style={[styles.tituloLogin, {fontFamily: 'fontSkillSwap'}]}>SkillSwap</Text>
                        <Text style={[styles.tituloLogin, {fontSize: 28, letterSpacing: 16,marginTop: 0}]}>LOGIN</Text>
                    </View>
                    <View style={styles.containerInputs}>

                        <InputLogin setLogin={setLogin} login={login} placeholder="Login" />

                        <InputSenha setSenha={setSenha} senha={senha} placeholder="Senha" />

                        <View style={styles.gravadorDeSenha}>
                            <Checkbox.Item 
                                status={gravarSenha ? "checked" : "unchecked"}
                                label="Gravar senha"
                                labelStyle={{color: 'white', fontSize: 24}}
                                position='leading'
                                uncheckedColor='white'
                                color='#15b6df'
                                onPress={() => gravarLimparSenhaStorage()}
                            /> 
                        </View>
                    </View>

                    <View style={styles.containerLoginButtons}>
                        <TouchableOpacity style={styles.containerInputsButton} onPress={() => verificarLogin(login, senha, gravarSenha)}>
                            <Text style={styles.botaoLoginText}>ENTRAR</Text>
                        </TouchableOpacity>

                        <View style={styles.botaoCadastrar}>
                            <Text style={styles.botaoCadastrarText}>Não possui conta?
                                <TouchableOpacity onPress={()=> navigate.navigate('Cadastro')}>
                                    <Text  style={{color: '#15b6df'}}> Click aqui!</Text>
                                </TouchableOpacity>
                            </Text>
                        </View>

                    </View>
                </View>
            </View>
        </ImageBackground>
    )
}