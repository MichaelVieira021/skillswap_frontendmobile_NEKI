
import React, { useEffect, useState } from 'react';
import {
  adicionarSkillUser,
  delUserSkill,
  levelDown,
  levelUp,
  obterTodasSkillsUserNot,
  skillsUser
} from '../../services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FlatList, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import styles from './styles';
import { CardSkill } from '../../components/CardSkill'

interface User {
  id: number;
  login: string;
  senha: string;
}

interface Skill {
  id: number;
  nome: string;
  tecAmp: number;
  atkAdicional: number;
  duracao: number;
  resfriamento: number;
  foto: string;
}

export function SkillsUser() {
  const [data, setData] = useState([]);
  const [listSkills, setListSkills] = useState([]);
  const [user, setUser] = useState<User>({ id: 0, login: '', senha: '' });
  const [modalShop, setModalShop] = useState(false)
  const [levelSkillObter, setLevelSkillObter] = useState(1);
  const [skillSelecionada, setSkillSelecionada] = useState<Skill>
    ({ id: 0, nome: '', tecAmp: 0, atkAdicional: 0, duracao: 0, resfriamento: 0, foto: '' })
  // const { enqueueSnackbar } = useSnackbar()

  useEffect(() => { 
    const carregarUser = async () => {
      try {
        const usuarioEncontrado = await AsyncStorage.getItem('user');
        // const usuarioEncontradoString = JSON.parse(usuarioEncontrado || '{}') as User;
        if (usuarioEncontrado) {
          var teste = JSON.parse(usuarioEncontrado)
          setUser(teste)
          console.log(JSON.parse(usuarioEncontrado))
        }
      } catch (error) {
      }
    }
    console.log(user)
    buscarSkill();
    carregarUser()
    
  }, [])

  // useEffect(() => { buscarSkill() }, [user])
  useEffect(() => { }, [skillSelecionada])

  useEffect(() => {
    if (levelSkillObter > 20) {
      setLevelSkillObter(20)
    }
    if (levelSkillObter < 1) {
      setLevelSkillObter(1)
    }
  }, [levelSkillObter])

  const buscarSkill = () => {
    skillsUser(1).then((response) => {
      setData(response.data)
      console.log("deu certo")
    }).catch((e) => {
      console.log(user.id)
      // enqueueSnackbar(e.response.data.mensagem, { variant: "error", anchorOrigin: { vertical: 'top', horizontal: 'right' } })
    })
  }

  const aumentarLevelSkill = (id: number) => {
    levelUp(id).then(() => {
      buscarSkill()
      // enqueueSnackbar("Level up!!!", { variant: "success", anchorOrigin: { vertical: 'top', horizontal: 'right' } })
    }).catch((e) => {
      // enqueueSnackbar(e.response.data.mensagem, { variant: "error", anchorOrigin: { vertical: 'top', horizontal: 'right' } })
    })
  }

  const baixarLevelSkill = (id: number) => {
    levelDown(id).then(() => {
      buscarSkill()
      // enqueueSnackbar("Level down!!!", { variant: "success", anchorOrigin: { vertical: 'top', horizontal: 'right' } })
    }).catch((e) => {
      // enqueueSnackbar(e.response.data.mensagem, { variant: "error", anchorOrigin: { vertical: 'top', horizontal: 'right' } })
    })
  }

  const deletarSkillUser = (id: number) => {
    console.log("teste")
    console.log(id)
    delUserSkill(id).then(() => {
      buscarSkill()
    }).catch((e) => {
      // enqueueSnackbar(e.response.data.mensagem, { variant: "error", anchorOrigin: { vertical: 'top', horizontal: 'right' } })
    })
  }

  const obterListaSkills = () => {
    obterTodasSkillsUserNot(user.id).then((response) => {
      setListSkills(response.data)
      setSkillSelecionada(response.data[0])
      setModalShop(true)
    }).catch((e) => {
      // enqueueSnackbar(e.response.data.mensagem, { variant: "error", anchorOrigin: { vertical: 'top', horizontal: 'right' } })
    })
  }

  const handleLevelSkillObter = (e) => {
    if (levelSkillObter <= 20) {
      setLevelSkillObter(e.target.value);
    }
  };

  const adquidrirSkill = () => {
    adicionarSkillUser(user.id, skillSelecionada.id, levelSkillObter).then(() => {
      buscarSkill()
      setModalShop(false)
      setLevelSkillObter(1)
      // enqueueSnackbar("Skill adquirida com sucesso!", { variant: "success", anchorOrigin: { vertical: 'top', horizontal: 'right' } })
    }).catch((e) => {
      // enqueueSnackbar(e.response.data.mensagem, { variant: "error", anchorOrigin: { vertical: 'top', horizontal: 'right' } })
    })
  }

  const Card = ({ skillSelect }: any) => (
    <CardSkill skill={skillSelect.skill} 
    idSkillUser={skillSelect.id} 
    deletarSkillUser={deletarSkillUser} 
    aumentarLevelSkill={aumentarLevelSkill}
    baixarLevelSkill={baixarLevelSkill}
    level={skillSelect.level}/>
  )

  return (

    <View style={styles.paginaHomeListSkillUser}>

      <View style={{ alignItems: 'center', marginBottom: 25}}>
        <Text style={[styles.tituloLogin, { fontFamily: 'fontSkillSwap' }]}>SkillSwap</Text>
        <Text style={[styles.tituloLogin, { fontSize: 28, letterSpacing: 9, marginTop: 0 }]}>HABILIDADES</Text>
      </View>

      <FlatList
        data={data}
        renderItem={({ item }) => <Card skillSelect={item} />}
        showsVerticalScrollIndicator={false}
      />
    </View>
  )
}
