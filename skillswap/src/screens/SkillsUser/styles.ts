import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({

  paginaHomeListSkillUser: {
    backgroundColor: '#010216',
    marginTop: 0,
  },

  tituloListaDeSkills: {
    fontSize: 46,
    color: 'white',
    marginTop: 8,
    // fontFamily: 'fontSkillSwap',
    alignItems: 'center',
    textAlign: 'center',
  },

  tituloLogin: {
    fontSize: 65,
    fontFamily: 'DevilCandle',
    fontWeight: '600',
    color: "white",
    marginTop: 79,

    textShadowColor: 'rgba(0, 0, 0, 0.7)',
    textShadowOffset: { width: 10, height: 10 },
    textShadowRadius: 5,
  },

  containerPrincipal: {
    display: 'flex',
    justifyContent: 'space-between',
    backgroundColor: '../../assets/img/backgroundList.png',
    alignItems: 'center',
    width: '100%',
    height: 500,
  },

  containerListaDeSkillsUser: {
    width: '100%',
    height: 410,
    minHeight: 410,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  buttonAddSkill: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgb(27, 20, 39)',
    color: '#6d5223',
    width: '100%',
    fontSize: 16,
    fontFamily: 'fontSkillSwap',
  },

  visualizarTodasSkills: {
    marginTop: 10,
    width: '100%',
    maxHeight: 350,
  },

  ModalObterSkill: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    display: 'flex',
    flexDirection: 'column',
    width: 400,
    backgroundColor: 'rgb(255, 255, 255)',
    boxShadow: '2px 2px 24px black',
    borderRadius: 20,
    alignItems: 'center',
  },

  tituloModalObterSkill: {
    fontFamily: 'fontSkillSwap',
    fontSize: 40,
    textAlign: 'center',
    marginBottom: 40,
  },
});

export default styles;
