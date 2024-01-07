import React, { createContext } from "react";
import { cadastrarNovoUsuario, configurarToken, verificarUsuario } from "../../services/api";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from "@react-navigation/native";

interface ContextProps {
    children: React.ReactNode
}

export const LoginContext = createContext<any>({})

export function LoginContextProvider({ children }: ContextProps) {
    const navigate = useNavigation<any>();
    // const {enqueueSnackbar} = useSnackbar()

    function verificarLogin(login: string, senha: string, gravarSenha: boolean) {
        verificarUsuario(login, senha).then((response) => {
            console.log(response.data.token)
            configurarToken(response.data.token)
            AsyncStorage.setItem('token', response.data.token);
            AsyncStorage.setItem('user', JSON.stringify(response.data.usuario));

            if(gravarSenha){
                AsyncStorage.setItem('gravarSenha', JSON.stringify({login: login, senha: senha}));
            }else if (!gravarSenha){
                AsyncStorage.removeItem('gravarSenha')
            }
            // enqueueSnackbar("Login efetuado com sucesso!",{variant:"success", anchorOrigin:{vertical:'top',horizontal:'right'}})
            navigate.navigate('Home')
            // navigate.navigate('/home')
        }).catch((error) => {
            console.log(error.response.data.mensagem)
            // enqueueSnackbar(error.response.data.mensagem,{variant:"error", anchorOrigin:{vertical:'top',horizontal:'right'}})
        })
    }

    function cadastrarUsuario(login: string, senha: string){
        cadastrarNovoUsuario(login, senha).then(()=>{
            // enqueueSnackbar("Cadastrado com sucesso!",{variant:"success", anchorOrigin:{vertical:'top',horizontal:'right'}})
            navigate.navigate('Login')
        }).catch((error)=>{
            console.log(error.response.data.mensagem)
            // enqueueSnackbar(error.response.data.mensagem,{variant:"error", anchorOrigin:{vertical:'top',horizontal:'right'}})
        })
    }

    return (
        <LoginContext.Provider value={{
            verificarLogin,
            cadastrarUsuario,
        }}>{children} 
        </LoginContext.Provider>
    )
}