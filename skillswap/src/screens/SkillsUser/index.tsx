
import React, { useEffect, useState } from 'react';
import {
  adicionarSkillUser,
  delUserSkill,
  levelDown,
  levelUp,
  obterSkillPorId,
  obterTodasSkillsUserNot,
  skillsUser
} from '../../services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FlatList, Text, TextInput, TouchableOpacity, View } from 'react-native';
import styles from './styles';
import { CardSkill } from '../../components/CardSkill'
import DropDownPicker from 'react-native-dropdown-picker';
import { Button, Modal } from 'react-native-paper';

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
  const [listSkills, setListSkills] = useState<any>([{}]);
  const [user, setUser] = useState<User>({ id: 0, login: '', senha: '' });
  const [modalVisible, setModalVisible] = useState<boolean>(false)
  const [combolVisible, setComboVisible] = useState<boolean>(false)
  const [levelSkillObter, setLevelSkillObter] = useState<number>(1);
  const [skillSelecionada, setSkillSelecionada] = useState<Skill>
    ({ id: 0, nome: '', tecAmp: 0, atkAdicional: 0, duracao: 0, resfriamento: 0, foto: '' })
  // const { enqueueSnackbar } = useSnackbar()

  useEffect(() => {
    const carregarUser = async () => {
      try {

        if (await AsyncStorage.getItem('user')) {
          const usuarioEncontrado = await AsyncStorage.getItem('user');
          var teste = JSON.parse(usuarioEncontrado)
          setUser(JSON.parse(usuarioEncontrado))
          console.log(JSON.parse(usuarioEncontrado))
        }
      } catch (error) {
      }
    }
    carregarUser()
  }, [])

  useEffect(() => { buscarSkill() }, [user])
  useEffect(() => { }, [skillSelecionada])

  useEffect(() => {
    if (levelSkillObter > 20) {
      setLevelSkillObter(20)
    }
  }, [levelSkillObter])

  const buscarSkill = () => {
    skillsUser(user.id).then((response) => {
      setData(response.data)
      console.log("deu certo")
    }).catch((e) => {
      console.log(user.id)
      // enqueueSnackbar(e.response.data.mensagem, { variant: "error", anchorOrigin: { vertical: 'top', horizontal: 'right' } })
    })
  }

  const testeDeSkill = (itemTeste: any) => {
    console.log(itemTeste)
    var teste = itemTeste.value
    console.log(teste)
    obterSkillPorId(teste).then((response) => {
      console.log(response.data)
      setSkillSelecionada(response.data)
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
    console.log("testezao do modal")
    obterTodasSkillsUserNot(user.id).then((response) => {
      setModalVisible(true)
      setListSkills(response.data)
      setSkillSelecionada(response.data[0])
    }).catch((e) => {
      // enqueueSnackbar(e.response.data.mensagem, { variant: "error", anchorOrigin: { vertical: 'top', horizontal: 'right' } })
    })
  }

  const handleLevelSkillObter = (text) => {
    const numericText = text.replace(/[^0-9]/g, '');

    if (levelSkillObter <= 20) {
      setLevelSkillObter(numericText);
    }
  };

  const adquidrirSkill = () => {
    adicionarSkillUser(user.id, skillSelecionada.id, levelSkillObter < 1 ? 1 : levelSkillObter).then(() => {
      buscarSkill()
      setModalVisible(false)
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
      level={skillSelect.level} />
  )

  return (

    <View style={styles.paginaHomeListSkillUser}>


      <View style={{
        alignItems: 'center', paddingBottom: 25, borderBottomWidth: 3,
        borderBottomColor: 'white', backgroundColor: '#010216',
      }}>
        <Text style={[styles.tituloLogin, { fontFamily: 'fontSkillSwap' }]}>SkillSwap</Text>
        <Text style={[styles.tituloLogin, { fontSize: 28, letterSpacing: 9, marginTop: 0 }]}>HABILIDADES</Text>
      </View>

      <FlatList
        style={{ height: 100, marginBottom: 65 }}
        data={data}
        renderItem={({ item }) => <Card skillSelect={item} />}
        showsVerticalScrollIndicator={false}
      />

      <TouchableOpacity
        style={styles.botaoFixo}
        onPress={() => obterListaSkills()}
      >
        <Text style={[styles.textoBotao, { fontFamily: 'fontSkillSwap' }]}>LISTA SKILLS</Text>
      </TouchableOpacity>

      <Modal visible={modalVisible} >
        <View style={styles.ModalObterSkill}>
          <Text style={styles.tituloModalObterSkill}>Skills</Text>


          <View style={{ alignItems: 'center', width: '95%', justifyContent: 'center' }}>
            <DropDownPicker
              textStyle={{
                fontSize: 20
              }}
              style={{ width: '100%', alignItems: 'center', justifyContent: 'center', flexGrow: 1 }}
              open={combolVisible}
              value={skillSelecionada.id}
              items={listSkills.map(skill => ({ label: skill.nome, value: skill.id }))}
              setOpen={() => setComboVisible(!combolVisible)}
              setValue={(value) => { }}
              onSelectItem={(value) =>
                testeDeSkill(value)
              }
              setItems={listSkills.map(skill => ({ label: skill.nome, value: skill.id }))}
            />

            <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 10, alignItems: 'center' }}>
              <Text style={[{ fontSize: 22, letterSpacing: 9, marginTop: 0, color: 'black' }]} >LEVEL: </Text>
              <TextInput
                style={styles.inputNumerico}
                keyboardType="numeric"
                value={String(levelSkillObter)}
                onChangeText={(text) => handleLevelSkillObter(text)}
              />
            </View>

            <View style={{ width: '105%' }}>
              <CardSkill skill={skillSelecionada} />
            </View>
          </View>
          <View style={{ width: "95%", marginTop: 10, marginBottom: 10 }}>
            <Button
              mode="contained"
              onPress={adquidrirSkill}
              style={{ margin: 5 }}
              buttonColor='green'
              labelStyle={{ fontSize: 22 }}
            >Confirmar</Button>
            <Button
              mode="contained"
              onPress={() => setModalVisible(false)}
              style={{ margin: 5 }}
              buttonColor='tomato'
              labelStyle={{ fontSize: 22 }}
            >Cancelar</Button>
          </View>


        </View>
      </Modal>

    </View>
  )
}
