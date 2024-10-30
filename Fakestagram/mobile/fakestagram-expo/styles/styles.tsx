import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  addPostButtonCenter: {
    position: 'absolute',
    bottom: height * 0.1,
    alignSelf: 'center',
    backgroundColor: '#007bff',
    borderRadius: 30,
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000, 
  },
  addPostButtonText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
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
    alignItems: 'center',
  },
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
  feedContainer: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    width: '100%',
  },
  feedContent: {
    width: '100%',
    maxWidth: 600,
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
    alignItems: 'center',
  },
  postImage: {
    width: width * 0.95,
    height: width * 0.95,
    borderRadius: 10,
    resizeMode: 'cover',
  },
  postCaption: {
    fontSize: 16,
    marginTop: 8,
    paddingHorizontal: 10,
    textAlign: 'left', 
    width: '100%',
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
    width: '100%',
    paddingHorizontal: 10,
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
    paddingHorizontal: 10,
    width: '100%',
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
    width: '100%',
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
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  flatListContentContainer: {
    alignItems: 'center',
    paddingBottom: 100,
  },
  addPostButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#007bff',
    borderRadius: 30,
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },  
  loginContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  loginLogo: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  loginAppTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#C13584',
    marginBottom: 30,
    textTransform: 'uppercase',
  },
  loginInputContainer: {
    width: '85%',
    marginBottom: 20,
  },
  loginInput: {
    width: '100%',
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#f0f0f0',
    marginBottom: 10,
    fontSize: 16,
  },
  loginButton: {
    width: '85%',
    padding: 15,
    backgroundColor: '#C13584',
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  loginLink: {
    marginTop: 20,
    fontSize: 16,
    color: '#C13584',
  },
  loginCreateAccountText: {
    color: '#888',
    marginTop: 10,
    fontSize: 14,
  },
  addPostButtonTopRight: {
    position: 'absolute',
    top: -50,
    right: -400,
    backgroundColor: '#007bff',
    borderRadius: 30,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 100,
    elevation: 10,
  },
});

export default styles;
