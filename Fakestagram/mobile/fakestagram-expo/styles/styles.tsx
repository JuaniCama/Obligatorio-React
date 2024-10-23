import { StyleSheet, Dimensions } from 'react-native';

// Obtenemos las dimensiones de la pantalla
const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  authContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  authTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  label: {
    alignSelf: 'flex-start',
    fontSize: 16,
    marginBottom: 8,
    color: '#333',
  },
  input: {
    width: '100%',
    padding: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginBottom: 16,
  },
  switchMode: {
    marginTop: 16,
  },
  switchText: {
    color: '#007bff',
    textDecorationLine: 'underline',
  },
  button: {
    padding: 12,
    backgroundColor: '#007bff',
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
  },
  link: {
    marginTop: 16,
    color: '#007bff',
    textDecorationLine: 'underline',
  },
  // Estilos para la pantalla de Feed y posts
  feedContainer: {
    flex: 1,
    padding: 16,
    alignItems: 'center', // Centrar los elementos
  },
  feedContent: {
    width: '100%',
    maxWidth: 600, // Definir un ancho máximo para el contenido
    alignSelf: 'center',
  },
  feedTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  postContainer: {
    marginBottom: 20,
    width: '100%',
  },
  postImage: {
    width: '100%', // Mantener el ancho al 100% del contenedor padre
    height: 600, // Ajustar la altura según lo necesario
    borderRadius: 10,
  },
  postCaption: {
    fontSize: 16,
    marginTop: 8,
  },
  addPostButton: {
    position: 'absolute',  // Hacer que el botón esté en una posición absoluta
    bottom: 15,            // Ajusta el valor según lo que necesites para bajarlo
    right: 20,             // Ajusta la posición horizontal si es necesario
    backgroundColor: '#007bff',
    borderRadius: 50,
    width: 60,             // Ajusta el tamaño del botón
    height: 50,            // Ajusta el tamaño del botón
    justifyContent: 'center',
    alignItems: 'center',
  },
  addPostButtonText: {
    color: '#fff',
    fontSize: 40,          // Ajusta el tamaño del texto "+" si es necesario
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 18,
    marginBottom: 10,
  },
  imagePickerButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  username: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  postFooter: {
    marginTop: 10,
  },
  likesText: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  viewCommentsText: {
    color: '#888',
    fontSize: 12,
  },
  postInfo: {
    padding: 10,
  },
  likes: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  caption: {
    color: '#333',
  },
  comments: {
    color: '#999',
    marginTop: 5,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
});

export default styles;
