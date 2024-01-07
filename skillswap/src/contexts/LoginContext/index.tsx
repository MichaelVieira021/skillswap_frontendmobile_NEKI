import React, { createContext, useEffect } from "react";
import { cadastrarNovoUsuario, configurarToken, verificarToken, verificarUsuario } from "../../services/api";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from "@react-navigation/native";

interface ContextProps {
    children: React.ReactNode
}

export const LoginContext = createContext<any>({})

export function LoginContextProvider({ children }: ContextProps) {
    // const [usuario, setUsuario] = useState<Usuario | null>();
    // const [logado, setLogado] = useState("false");
    const navigate = useNavigation<any>();
    // const {enqueueSnackbar} = useSnackbar()

    // useEffect(() => {
    //     const checkToken = async () => {

    //         if(await AsyncStorage.getItem('token') && await AsyncStorage.getItem('user')){
                
    //             const storedToken = await AsyncStorage.getItem('token');
    //             console.log("teste4444")

    //             verificarToken(storedToken).then((response)=>{
    //                 if(response.data === "Token válido"){
    //                     configurarToken(storedToken);
    //                     navigate.navigate('Home')
    //                 }else{
    //                     AsyncStorage.removeItem('token');
    //                     AsyncStorage.removeItem('user');
    //                     navigate.navigate('Login')
    //                 }
    //                 // storedToken == null || undefined ? navigate.navigate('Login') : navigate.navigate('Todos');
    //             }).catch((error)=>{
    //                 console.log(error.response.data.mensagem)
    //                 // enqueueSnackbar(error.response.data.mensagem,{variant:"error", anchorOrigin:{vertical:'top',horizontal:'right'}})
    //             })

    //         }else{
    //             AsyncStorage.removeItem('token');
    //             AsyncStorage.removeItem('user');
    //         }
    //     };
    //     checkToken();
    // }, []);

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
            console.log("ok")
            navigate.navigate('Home')
            // navigate.navigate('/home')
        }).catch((error) => {
            console.log(error.response.data.mensagem)
            // enqueueSnackbar(error.response.data.mensagem,{variant:"error", anchorOrigin:{vertical:'top',horizontal:'right'}})
        })
    }

    function cadastrarUsuario(login: string, senha: string){
        cadastrarNovoUsuario(login, senha).then(()=>{
            console.log("ok")
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