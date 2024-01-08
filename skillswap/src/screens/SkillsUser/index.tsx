
import React, { useContext, useEffect, useState } from 'react';
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
import { Button, Modal, Snackbar } from 'react-native-paper';
import { LoginContext } from '../../contexts/LoginContext';

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

interface ModalAlerta {
  mensagem: string, 
  visible: boolean, 
  cor: string
}

export function SkillsUser() {
  const {deslogar} = useContext(LoginContext)
  const [infoAlert, setInfoAlert] = useState<ModalAlerta>({mensagem: '', visible: false, cor: 'black'});
  const [data, setData] = useState([]);
  const [listSkills, setListSkills] = useState<any>([{}]);
  const [user, setUser] = useState<User>({ id: 0, login: '', senha: '' });
  const [modalVisible, setModalVisible] = useState<boolean>(false)
  const [combolVisible, setComboVisible] = useState<boolean>(false)
  const [levelSkillObter, setLevelSkillObter] = useState<number>(1);
  const [skillSelecionada, setSkillSelecionada] = useState<Skill>
    ({ id: 0, nome: '', tecAmp: 0, atkAdicional: 0, duracao: 0, resfriamento: 0, foto: '' })

  useEffect(() => {buscarSkill()}, [])
  useEffect(() => {}, [skillSelecionada])

  useEffect(() => {
    if (levelSkillObter > 20) {
      setLevelSkillObter(20)
    }
  }, [levelSkillObter])

  const carregarUser = async () => {
    try {

      if (await AsyncStorage.getItem('user')) {
        const usuarioEncontrado = await AsyncStorage.getItem('user');
        setUser(JSON.parse(usuarioEncontrado))
        return JSON.parse(usuarioEncontrado).id
      }
    } catch (error) {
    }
  }

  const buscarSkill = async () => {
    carregarUser()
    skillsUser(await carregarUser()).then((response) => {
      setData(response.data)
    }).catch((e) => {
      setInfoAlert({mensagem: e.response.data.mensagem, visible: true, cor: 'tomato'})
    })
  }

  const testeDeSkill = (itemTeste: any) => {
    var teste = itemTeste.value
    obterSkillPorId(teste).then((response) => {
      setSkillSelecionada(response.data)
    })
  }


  const aumentarLevelSkill = (id: number) => {
    levelUp(id).then(() => {
      buscarSkill(),
      setInfoAlert({mensagem: 'Level up!!!', visible: true, cor: 'green'})
    }).catch((e) => {
      setInfoAlert({mensagem: e.response.data.mensagem, visible: true, cor: 'tomato'})
    })
  }

  const baixarLevelSkill = (id: number) => {
    levelDown(id).then(() => {
      buscarSkill()
      setInfoAlert({mensagem: 'Level down!!!', visible: true, cor: 'green'})
    }).catch((e) => {
      setInfoAlert({mensagem: e.response.data.mensagem, visible: true, cor: 'tomato'})
    })
  }

  const deletarSkillUser = (id: number) => {
    delUserSkill(id).then(() => {
      buscarSkill()
      setInfoAlert({mensagem: 'Skill removida com sucesso!', visible: true, cor: 'green'})
    }).catch((e) => {
      setInfoAlert({mensagem: e.response.data.mensagem, visible: true, cor: 'tomato'})
    })
  }

  const obterListaSkills = () => {
    obterTodasSkillsUserNot(user.id).then((response) => {
      setModalVisible(true)
      setListSkills(response.data)
      setSkillSelecionada(response.data[0])
    }).catch((e) => {
      setInfoAlert({mensagem: e.response.data.mensagem, visible: true, cor: 'tomato'})
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
      setInfoAlert({mensagem: 'Skill adquirida com sucesso!', visible: true, cor: 'green'})
    }).catch((e) => {
      setInfoAlert({mensagem: e.response.data.mensagem, visible: true, cor: 'tomato'})
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

      <View
        style={styles.botaoFixoContainer}
        
      >
        <TouchableOpacity style={styles.botaoFixo} onPress={() => obterListaSkills()}>
          <Text style={[styles.textoBotao, { fontFamily: 'fontSkillSwap'}]}>New Skill</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.botaoFixo, {backgroundColor: 'tomato'}]} onPress={() => deslogar()}>
        <Text style={[styles.textoBotao, { fontFamily: 'fontSkillSwap'}]}>Sair</Text>
        </TouchableOpacity>

      </View>

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

      <Snackbar
        style={{backgroundColor: infoAlert.cor, bottom: 70}}
        elevation={5}
        visible={infoAlert.visible}
        duration={1000}
        onDismiss={()=> setInfoAlert({mensagem: '', visible: false, cor: 'black'})}>
        <Text style={{fontSize: 24, color: 'white'}}>{infoAlert.mensagem}</Text>
      </Snackbar>

    </View>
  )
}
