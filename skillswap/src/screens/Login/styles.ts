import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  backgroundLogin: {
    width: '100%',
    height: '100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  tituloLogin: {
    fontSize: 55,
    fontFamily: 'DevilCandle',
    fontWeight: '600',
    color: "white",
    marginBottom: 15,
    marginTop: 10,
  },

  containerFormularioLoginCompleto: {
    width: '80%',
    maxWidth: 400,
    height: 360,
    alignItems: 'center',
  },

  containerFormularioLogin:{
    flex: 1,
    justifyContent: 'space-between',
    width: '100%',
    borderRadius: 10,
    alignItems: 'center',
    backgroundColor: '#010216',
    border: '1px solid white',
    padding: 9,
  },

  containerInputs: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: "85%"
  },

  containerLoginButtons: {
    alignItems: 'center',
    width: "100%"
  },

  containerInputsButton: {
    width: "60%",
    height: 50,
    borderRadius: 6,
    backgroundColor: "white",
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 18,
  },

  botaoLoginText: {
    fontSize: 24,
  },

  botaoCadastrar: {
    alignItems: "center",
    width: "100%",
  },

  botaoCadastrarText: {
    color: 'white',
    fontSize: 16,
  },

  gravadorDeSenha: {
    flex: 1,
    marginLeft: -25,
    marginTop: -10,
    alignSelf: 'flex-start'
  },
});
