import { createStackNavigator } from '@react-navigation/stack';
import { Login } from '../../screens/Login';
import { Cadastro } from '../../screens/Cadastro';
import { BottonTabRoutes } from '../BottonTabRoutes';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { configurarToken, verificarToken } from '../../services/api';
import { useNavigation } from '@react-navigation/native';
import { SkillsUser } from '../../screens/SkillsUser';

const Stack = createStackNavigator ();

export function StackNavigator() {
  const navigate = useNavigation<any>();
  const [auth, setAuth] = useState<boolean>(false)

  useEffect(() => {
    const checkToken = async () => {

        if(await AsyncStorage.getItem('token') && await AsyncStorage.getItem('user')){
            
            const storedToken = await AsyncStorage.getItem('token');
            
            console.log("teste44445")

            verificarToken(storedToken).then((response)=>{
                if(response.data === "Token válido"){
                    configurarToken(storedToken);
                    setAuth(true)
                    navigate.navigate('Home')
                }else{
                  setAuth(false)
                    AsyncStorage.removeItem('token');
                    AsyncStorage.removeItem('user');
                    // navigate.navigate('Login')
                }
                // storedToken == null || undefined ? navigate.navigate('Login') : navigate.navigate('Todos');
            }).catch((error)=>{
                console.log(error.response.data.mensagem)
                // enqueueSnackbar(error.response.data.mensagem,{variant:"error", anchorOrigin:{vertical:'top',horizontal:'right'}})
            })

        }else{
            AsyncStorage.removeItem('token');
            AsyncStorage.removeItem('user');
        }
    };
    checkToken();
}, []);

  return (
    
    <Stack.Navigator
      screenOptions={{
        headerShown:false,
      }}

      initialRouteName={auth ? "Home" : "Login"}
    >

      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Cadastro" component={Cadastro} />
      <Stack.Screen name="Home" component={SkillsUser} />

      {/* <Stack.Screen name="Todos" component={BottonTabRoutes} /> */}

    </Stack.Navigator>
  );
}