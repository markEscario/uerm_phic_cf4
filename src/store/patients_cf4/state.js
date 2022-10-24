import { SessionStorage } from 'quasar'
export default function () {
  const sessionUser = SessionStorage.getItem('userData')
  return {
    // http://10.107.0.11:8080
    apiUrl: 'http://localhost:3000/cf4_api',
    users: [],
    patients: [],
    searchedPatients: [],
    patientDetails: {},
    cf4PatientData: {},
    cf4ReasonForAdmission: {},
    cf4CourseInTheWard: {},
    cf4OutComeOfTreatment: {},
    patientDiagnosis: [],
    patientHistories: [],
    pertinentPastMedicalHistories: [],
    patientEncoders: {},
    isLogged: false,
    profileData: {},
    loggedUsers: !sessionUser ? {} : sessionUser,
    registerResponse: '',
    loginResponse: '',
    connectionStatus: '',
    submitStatus: '',
    pDataNo: ''
  }
}
// PROCESS ENV
// DATE UTILS
