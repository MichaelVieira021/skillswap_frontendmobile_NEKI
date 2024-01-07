import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { Entypo, MaterialCommunityIcons } from '@expo/vector-icons';
import { SkillsUser } from '../../screens/SkillsUser';
import { Login } from '../../screens/Login';
import { Cadastro } from '../../screens/Cadastro';
import { Modal } from 'react-native-paper';
import { useState } from 'react';

const Tab = createBottomTabNavigator();


export function BottonTabRoutes() {

  const [modalVisible, setModalVisible] = useState(false);

  const handleOpenModal = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  return (

    <Tab.Navigator
      screenOptions={{
        headerShown: false,

        tabBarStyle: {
          height: 60,
          backgroundColor: '#272727',
          // borderTopWidth: 3,
          // borderTopColor: 'tomato',
        },

        tabBarActiveBackgroundColor: 'tomato',
        tabBarActiveTintColor: "black",
        tabBarInactiveTintColor: '#a5a5a5',

        tabBarLabelStyle: {
          fontSize: 20,
          // marginBottom: 3
          fontWeight: 'bold',
          textAlignVertical: 'center',
            height: '70%',
            width: '100%',
        },

        tabBarIconStyle: {
          display: 'none',
          // alignItems: 'center',
          // marginBottom: -5,
          // justifyContent: 'center',
        }

      }}>

      <Tab.Screen
        options={{
          tabBarIcon: (({ color }) => (
            
            <Entypo name="shop" size={24} color={color} />
          ))
        }}
        name="ADQUIRIR SKILL"
        component={() => <SkillsUser/>}
      />

      <Tab.Screen
        options={{
          tabBarIcon: (({ color }) => (
            <Entypo name="shop" size={24} color={color} />
          ))
        }}
        name="SHOP2"
        component={Cadastro}
      />

      {/* <Tab.Screen
        options={{
          tabBarIcon: (({ color }) => (
            <Entypo name="shop" size={24} color={color} />
          ))
        }}
        name="SHOP"
        component={Login}
      /> */}

      {/* <Tab.Screen
        options={{
          tabBarIcon: (({ color }) => (
            <View style={{ width: 38, height: 38, alignSelf: "center", alignItems: "center", justifyContent: "center" }}>
              <Image source={iconCards} style={{ width: "100%", height: "100%", tintColor: color }} />
            </View>
          ))
        }}
        name="DECK"
        component={Deck}
      /> */}

      {/* <Tab.Screen
        options={{
          tabBarIcon: (({ color }) => (
            <MaterialCommunityIcons name="cards" size={24} color={color} />
          ))
        }}
        name="CARDS"
        component={}
      /> */}

    </Tab.Navigator>

  )
}