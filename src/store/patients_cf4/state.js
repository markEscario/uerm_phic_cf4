import { SessionStorage } from 'quasar'
export default function () {
  const sessionUser = SessionStorage.getItem('userData')
  return {
    //
    apiUrl: 'http://localhost:3000/cf4_api',
    users: [],
    patients: [],
    searchedPatients: [],
    patientDetails: {},
    patientDiagnosis: [],
    patientEncoders: {},
    isLogged: false,
    profileData: {},
    loggedUsers: !sessionUser ? {} : sessionUser,
    registerResponse: '',
    loginResponse: '',
    connectionStatus: '',
    submitStatus: ''
  }
}
