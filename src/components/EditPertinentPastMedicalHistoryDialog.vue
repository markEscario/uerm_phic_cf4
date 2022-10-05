<template>
  <q-dialog v-if="EditPertinentHistoryModal" :model-value="true">
    <q-card style="width: 1980px; max-width: 180vw;">
      <q-card-section>
        <q-banner dense inline-actions class="text-white bg-primary q-mb-sm">
          <label class="text-caption">
            {{ PtInfo.LASTNAME }}, {{ PtInfo.FIRSTNAME }} {{ PtInfo.MIDDLENAME }} {{ PtInfo.PATIENTNO[0] }}
          </label>
        </q-banner>

        <q-banner v-if="submitAlert" dense inline-actions class="text-white bg-green-3">
          <label class="text-caption">
            <q-spinner-hourglass color="primary" size="2em" />
            {{ fTitle === 'DELETE PERTINENT PAST MEDICAL HISTORY' ? 'PERTINENT PAST MEDICAL HISTORY WAS DELETED' :
            formUpdatePertinentHistoryMsg
            }}
          </label>
        </q-banner>

        <q-space class="q-mb-sm" />
        <div class="text-caption text-weight-bold text-uppercase">{{ fTitle }}</div>
      </q-card-section>
      <q-form @submit="submitUpdateForm" class="q-gutter-md" ref="form">
        <div v-if="fTitle === 'EDIT PERTINENT PAST MEDICAL HISTORY'" class="row" style="max-width: 1800px">
          <div class="col-md-12 q-ml-md">
            <q-input class="text-uppercase" outlined v-model="editPPMHistory.pertinent_past_medical_history" autogrow
              hint="PERTINENT PAST MEDICAL HISTORY" lazy-rules
              :rules="[val => val && val.length > 0 || 'This is required']" />
          </div>
        </div>
        <div v-else class="row">
          <div class="col-md-8 q-ml-md">
            ARE YOUR SURE YOU WANT TO DELETE THIS RECORD?
          </div>
          <div class="col-md-8 q-ml-md text-weight-bold text-uppercase">
            {{ editPPMHistory.pertinent_past_medical_history }}
          </div>
        </div>
        <div class="row q-pa-md">
          <q-btn v-if="fTitle === 'EDIT PERTINENT PAST MEDICAL HISTORY'" class="q-mr-md" label="Update" type="submit"
            color="primary" />
          <q-btn v-else class="q-mr-md" label="DELETE" type="submit" color="red" />
        </div>
      </q-form>
      <q-card-actions align="right" class="bg-white text-teal">
        <q-btn flat label="Close" @click="close" v-close-popup />
      </q-card-actions>

      <q-space class="q-mb-sm" />
      <q-space class="q-mb-xl" />
    </q-card>
  </q-dialog>
</template>
<script>
import { defineComponent, ref } from 'vue'
import CONSTANTS from '../constants'

export default defineComponent({
  name: 'EditPastMedicalHistory',
  props: ['EditPertinentHistoryModal', 'PtInfo', 'editPPMedicalHistory', 'fTitle'],
  data() {
    return {
      editPPMHistory: {
        id: '',
        patient_no: '',
        case_no: '',
        pertinent_past_medical_history: ''
      },
      submitAlert: false,
      formUpdatePertinentHistoryMsg: CONSTANTS.FORM_UPDATE_PERTINENT_HISTORY_MESSAGE
    }
  },
  watch: {
    editPPMedicalHistory: {
      handler(val) {
        if (val) {
          this.editPPMHistory.id = val.id
          this.editPPMHistory.patient_no = val.patient_no
          this.editPPMHistory.case_no = val.case_no
          this.editPPMHistory.pertinent_past_medical_history = val.pertinent_past_medical_history
        } else {
          this.editPPMHistory.id = ''
          this.editPPMHistory.patient_no = ''
          this.editPPMHistory.case_no = ''
          this.editPPMHistory.pertinent_past_medical_history = ''
        }
      },
      immediate: true
    }
  },
  methods: {
    async editPertinentPastMedicalHistory() {
      let data = {
        id: this.editPPMHistory.id,
        patient_no: this.editPPMHistory.patient_no,
        case_no: this.editPPMHistory.case_no,
        pertinent_past_medical_history: this.editPPMHistory.pertinent_past_medical_history
      }
      const result = await this.$store.dispatch('patientsCf4/updatePertinentPastMedicalHistory', data)
      result.status === 200 ? (() => { this.submitAlert = true; })() : null
    },
    async deletePertinentPastMedicalHistory() {
      let data = {
        id: this.editPPMHistory.id,
        patient_no: this.editPPMHistory.patient_no,
        case_no: this.editPPMHistory.case_no,
        pertinent_past_medical_history: this.editPPMHistory.pertinent_past_medical_history,
        ppmh_status: 'DELETED'
      }
      const result = await this.$store.dispatch('patientsCf4/deletePertinentPastMedicalHistory', data)
      result.status === 200 ? (() => { this.submitAlert = true; })() : null
    },
    submitUpdateForm() {
      console.log('title: ', this.fTitle)
      this.fTitle === 'EDIT PERTINENT PAST MEDICAL HISTORY' ? this.editPertinentPastMedicalHistory() : this.deletePertinentPastMedicalHistory()
      setTimeout(() => {
        this.submitAlert = false
        this.close()
        this.$router.go()
      }, 3000)
    },
    close() {
      this.$emit('close')
    }
  }

})
</script>