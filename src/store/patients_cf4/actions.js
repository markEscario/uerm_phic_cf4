import axios from "axios";

export async function searchPatients(context, payload) {
  try {
    console.log('payload: ', payload)
    const response = await axios.get(`${this.state.patientsCf4.apiUrl}/search_patients?searchData=${payload.filterData}`)
    console.log('result: ', response.data)
    context.commit('setSearchedPatients', response.data)

    return response
  } catch (err) {
    console.log(err);
    return err
  }
}
export async function getPatientDetails(context, payload) {
  try {
    console.log('p details: ', payload)
    const response = await axios.get(`${this.state.patientsCf4.apiUrl}/patient_details?patientNo=${payload}`)
    console.log('result: ', response.data[0])
    context.commit('setPatientDetails', response.data[0])

    return response
  } catch (err) {
    console.log(err);
    return err
  }
}
export async function getEncoders(context, payload) {
  try {
    console.log('code: ', payload.empCode)
    const response = await axios.get(`${this.state.patientsCf4.apiUrl}/patient_encoders?empCode=${payload.empCode}`)
    console.log('result: ', response.data[0])
    context.commit('setPatientEncoders', response[0])

    return response
  } catch (err) {
    console.log(err);
    return err
  }
}
export async function createAdDiagnosis(context, payload) {
  try {
    console.log('add diagnosis: ', payload)
    const response = await axios.post(`${this.state.patientsCf4.apiUrl}/create_admitting_diagnosis`, payload)
    console.log('result: ', response.data)

    return response
  } catch (err) {
    console.log(err);
    return err
  }
}
export async function updateAdDiagnosis(context, payload) {
  try {
    console.log('edit diagnosis: ', payload)
    const response = await axios.put(`${this.state.patientsCf4.apiUrl}/update_admitting_diagnosis/${payload.id}`, payload)
    console.log('result: ', response.data)

    return response
  } catch (err) {
    console.log(err);
    return err
  }
}
export async function deleteAdDiagnosis(context, payload) {
  try {
    console.log('edit diagnosis: ', payload)
    const response = await axios.put(`${this.state.patientsCf4.apiUrl}/delete_admitting_diagnosis/${payload.id}`, payload)
    console.log('result: ', response.data)

    return response
  } catch (err) {
    console.log(err);
    return err
  }
}
export async function getAdDiagnosisEntries(context, payload) {
  try {
    console.log('pNo: ', payload)
    const response = await axios.get(`${this.state.patientsCf4.apiUrl}/admitting_diagnosis_entries?patientNo=${payload}`)
    console.log('resultEntries: ', response.data)
    // response.data = response.data.map(diagnosis => diagnosis.AD_DIAGNOSIS)
    context.commit('setPatientDiagnosis', response.data)

    return response
  } catch (err) {
    console.log(err);
    return err
  }
}
export async function getPatientHistoryEntries(context, payload) {
  try {
    console.log('pNoYou: ', payload)
    const response = await axios.get(`${this.state.patientsCf4.apiUrl}/history_of_present_illness_entries?patientNo=${payload}`)
    console.log('resultEntries: ', response.data)
    // response.data = response.data.map(diagnosis => diagnosis.AD_DIAGNOSIS)
    context.commit('setPatientHistories', response.data)

    return response
  } catch (err) {
    console.log(err);
    return err
  }
}
export async function createHistoryOfPresentIllness(context, payload) {
  try {
    console.log('history: ', payload)
    const response = await axios.post(`${this.state.patientsCf4.apiUrl}/create_history_of_present_illness`, payload)
    console.log('result: ', response.data)

    return response
  } catch (err) {
    console.log(err);
    return err
  }
}
export async function updatePatientHistory(context, payload) {
  try {
    console.log('edit diagnosis: ', payload)
    const response = await axios.put(`${this.state.patientsCf4.apiUrl}/update_history_of_present_illness/${payload.id}`, payload)
    console.log('result: ', response.data)

    return response
  } catch (err) {
    console.log(err);
    return err
  }
}
