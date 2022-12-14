import axios from "axios";

export async function searchPatientsByLastNameCaseNo(context, payload) {
  try {
    console.log('payload: ', payload)
    const response = await axios.get(`${process.env.API_HOST}/search_patients_by_lastname_caseno?searchData=${payload.lastNameCaseNo}`)
    console.log('result: ', response.data)
    context.commit('setSearchedPatients', response.data)

    return response
  } catch (err) {
    console.log(err);
    return err
  }
}
export async function searchPatientsByDate(context, payload) {
  try {
    console.log('payloadx: ', payload)
    const response = await axios.get(`${process.env.API_HOST}/search_patients_by_date?searchData=${payload.dateAdAndDis}`)
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
    console.log('data no: ', payload)
    const response = await axios.get(`${process.env.API_HOST}/patient_details?dataNo=${payload}`)
    console.log('resultX: ', response.data[0])
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
    const response = await axios.get(`${process.env.API_HOST}/patient_encoders?empCode=${payload.empCode}`)
    console.log('result: ', response.data[0])
    context.commit('setPatientEncoders', response[0])

    return response
  } catch (err) {
    console.log(err);
    return err
  }
}
export async function createCf4(context, payload) {
  try {
    console.log('cf4: ', payload)
    const response = await axios.post(`${process.env.API_HOST}/create_patient_cf4`, payload)
    console.log('result: ', response.data)
    context.commit('setPDataNo', response.data)

    return response
  } catch (err) {
    console.log(err);
    return err
  }
}
export async function getCf4PatientData(context, payload) {
  try {
    console.log('pNo: ', payload)
    const response = await axios.get(`${process.env.API_HOST}/cf4_patient_data?patientNo=${payload}`)
    console.log('response: ', response)
    context.commit('setCf4PatientData', response.data[0])

    return response
  } catch (err) {
    console.log(err);
    return err
  }
}
export async function getCf4ReasonForAdmission(context, payload) {
  try {
    console.log('pNo: ', payload)
    const response = await axios.get(`${process.env.API_HOST}/cf4_reason_for_admission?patientNo=${payload}`)
    console.log('response ROA: ', response.data[0])
    for (const item of response.data) {
      item['RHCI_YES'] === 'true' ? true : false
      item['RHCI_NO'] === 'true' ? true : false
    }
    context.commit('setCf4ReasonForAdmission', response.data[0])

    return response
  } catch (err) {
    console.log(err);
    return err
  }
}
export async function getCf4CourseInTheWard(context, payload) {
  try {
    console.log('pNo: ', payload)
    const response = await axios.get(`${this.state.patientsCf4.apiUrl}/cf4_course_in_the_ward?patientNo=${payload}`)
    console.log('response CIW: ', response.data)
    context.commit('setCf4CourseInTheWard', response.data)
    return response

  } catch (err) {
    console.log(err);
    return err
  }
}
export async function getCf4OutComeOfTreatment(context, payload) {
  try {
    console.log('pNo: ', payload)
    const response = await axios.get(`${this.state.patientsCf4.apiUrl}/cf4_outcome_of_treatment?patientNo=${payload}`)
    console.log('response: ', response)
    context.commit('setCf4OutComeOfTreatment', response.data[0])
    return response

  } catch (err) {
    console.log(err);
    return err
  }
}
export async function updateCf4PatientData(context, payload) {
  try {
    console.log('Edit Patient Data: ', payload.id)
    const response = await axios.put(`${this.state.patientsCf4.apiUrl}/update_cf4_patient_data/${payload.id}`, payload)
    console.log('resultx: ', response.data)

    return response
  } catch (err) {
    console.log(err);
    return err
  }
}
export async function updateCf4ReasonForAdmission(context, payload) {
  try {
    console.log('edit cf4 reason for admission: ', payload)
    const response = await axios.put(`${this.state.patientsCf4.apiUrl}/update_cf4_reason_for_admission/${payload.id}`, payload)
    console.log('result: ', response.data)

    return response
  } catch (err) {
    console.log(err);
    return err
  }
}
export async function createCf4CourseInTheWard(context, payload) {
  try {
    console.log('cf4: ', payload)
    const response = await axios.post(`${this.state.patientsCf4.apiUrl}/create_cf4_course_in_the_ward`, payload)
    console.log('result: ', response.data)

    return response
  } catch (err) {
    console.log(err);
    return err
  }
}
export async function updateCf4OutComeOfTreatment(context, payload) {
  try {
    console.log('outcomeof treatment: ', payload)
    const response = await axios.put(`${this.state.patientsCf4.apiUrl}/update_cf4_outcome_of_treatment/${payload.id}`, payload)
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
export async function getPatientHistoryEntries(context, payload) {
  try {
    console.log('pNoYou: ', payload)
    const response = await axios.get(`${this.state.patientsCf4.apiUrl}/history_of_present_illness_entries?patientNo=${payload}`)
    console.log('resultEntries: ', response.data)
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
export async function createPertinentPastMedicalHistory(context, payload) {
  try {
    console.log('pertinent: ', payload)
    const response = await axios.post(`${this.state.patientsCf4.apiUrl}/create_pertinent_past_medical_history`, payload)
    console.log('result: ', response.data)

    return response
  } catch (err) {
    console.log(err);
    return err
  }
}
export async function updatePatientHistory(context, payload) {
  try {
    console.log('edit history: ', payload)
    const response = await axios.put(`${this.state.patientsCf4.apiUrl}/update_history_of_present_illness/${payload.id}`, payload)
    console.log('result: ', response.data)

    return response
  } catch (err) {
    console.log(err);
    return err
  }
}
export async function updatePertinentPastMedicalHistory(context, payload) {
  try {
    console.log('update pertinent: ', payload)
    const response = await axios.put(`${this.state.patientsCf4.apiUrl}/update_pertinent_past_medical_history/${payload.id}`, payload)
    console.log('result: ', response.data)

    return response
  } catch (err) {
    console.log(err);
    return err
  }
}
export async function deletePatientHistory(context, payload) {
  try {
    console.log('delete history: ', payload)
    const response = await axios.put(`${this.state.patientsCf4.apiUrl}/delete_history_of_present_illness/${payload.id}`, payload)
    console.log('result: ', response.data)

    return response
  } catch (err) {
    console.log(err);
    return err
  }
}
export async function deletePertinentPastMedicalHistory(context, payload) {
  try {
    console.log('delete pertinent: ', payload)
    const response = await axios.put(`${this.state.patientsCf4.apiUrl}/delete_pertinent_past_medical_history/${payload.id}`, payload)
    console.log('result: ', response.data)

    return response
  } catch (err) {
    console.log(err);
    return err
  }
}
export async function getPertinentPastMedicalHistoryEntries(context, payload) {
  try {
    const response = await axios.get(`${this.state.patientsCf4.apiUrl}/pertinent_past_medical_history_entries?patientNo=${payload}`)
    console.log('resultEntries: ', response.data)
    // response.data = response.data.map(diagnosis => diagnosis.AD_DIAGNOSIS)
    context.commit('setPertinentPastMedicalHistories', response.data)

    return response
  } catch (err) {
    console.log(err);
    return err
  }
}
