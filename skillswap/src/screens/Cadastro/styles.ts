import { Dimensions, StyleSheet } from 'react-native';
import { white } from 'react-native-paper/lib/typescript/styles/themes/v2/colors';

export const styles = StyleSheet.create({
  backgroundCadastro: {
    width: '100%',
    height: '100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  tituloCadastro: {
    fontSize: 65,
    fontFamily: 'DevilCandle',
    fontWeight: '600',
    color: "white",
    // marginBottom: 15,
    marginTop: 79,

    textShadowColor: 'rgba(0, 0, 0, 0.7)', // Cor da sombra
    textShadowOffset: { width: 10, height: 10 }, // Offset da sombra (horizontal, vertical)
    textShadowRadius: 5,
  },

  containerFormularioCadastroCompleto: {
    width: '95%',
    maxWidth: 400,
    // height: 550, Dimensions.get('window')
    height: Dimensions.get('window').height,
    alignItems: 'center',
  },

  containerFormularioCadastro:{
    flex: 1,
    justifyContent: 'space-between',
    width: '100%',
    borderRadius: 10,
    alignItems: 'center',
    // backgroundColor: '#010216',
    // border: '1px solid white',
    padding: 9,
  },

  containerInputs: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: "100%"
  },

  containerCadastroButtons: {
    alignItems: 'center',
    width: "100%",
    // padding: 20,
    // backgroundColor: "#00000075"
  },

  containerInputsButton: {
    width: 290,
    height: 60,
    borderRadius: 100,
    backgroundColor: "white",
    // border: '2px solid #261038',
    // elevation: 1,
    // color: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 18,
  },

  botaoCadastroText: {
    fontSize: 28,
    // fontWeight: 'bold',
    color: "#261038"
  },

  botaoCadastrar: {
    alignItems: "center",
    width: "100%",
    padding: 5,
    borderRadius: 100,
    // backgroundColor: "#00000075"
  },

  botaoCadastrarText: {
    color: 'white',
    fontSize: 22,
  },

  gravadorDeSenha: {
    flex: 1,
    marginLeft: -25,
    marginTop: -10,
    alignSelf: 'flex-start'
  },
});
