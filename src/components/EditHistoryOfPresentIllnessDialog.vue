<template>
  <q-dialog v-if="EditHistoryModal" :model-value="true">
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
            {{ fTitle === 'DELETE HISTORY OF PRESENT ILLNESS' ? 'HISTORY OF PRESENT ILLNESS WAS DELETED' :
            formUpdateHistoryMsg
            }}
          </label>
        </q-banner>

        <q-space class="q-mb-sm" />
        <div class="text-caption text-weight-bold text-uppercase">{{ fTitle }}</div>
      </q-card-section>
      <q-form @submit="submitUpdatedHistory" class="q-gutter-md" ref="form">
        <div v-if="fTitle === 'EDIT HISTORY OF PRESENT ILLNESS'" class="row" style="max-width: 1800px">
          <div class="col-md-12 q-ml-md">
            <q-input class="text-uppercase" outlined v-model="editPatientHistory.history_of_present_illness" autogrow
              hint="HISTORY PRESENT ILLNESS" lazy-rules :rules="[val => val && val.length > 0 || 'This is required']" />
          </div>
        </div>
        <div v-else class="row">
          <div class="col-md-8 q-ml-md">
            ARE YOUR SURE YOU WANT TO DELETE THIS RECORD?
          </div>
          <div class="col-md-8 q-ml-md text-weight-bold text-uppercase">
            {{ editPatientHistory.history_of_present_illness }}
          </div>
        </div>
        <div class="row q-pa-md">
          <q-btn v-if="fTitle === 'EDIT HISTORY OF PRESENT ILLNESS'" class="q-mr-md" label="Update" type="submit"
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
import { mapGetters } from 'vuex'
import CONSTANTS from '../constants'

export default defineComponent({
  name: 'EditHistoryOfPresentIllness',
  props: ['EditHistoryModal', 'PtInfo', 'pHistory', 'editPHistory', 'fTitle'],
  data() {
    return {
      editPatientHistory: {
        id: '',
        patient_no: '',
        case_no: '',
        history_of_present_illness: ''
      },
      submitAlert: false,
      formUpdateHistoryMsg: CONSTANTS.FORM_UPDATE_HISTORY_MESSAGE
    }
  },
  watch: {
    editPHistory: {
      handler(val) {
        if (val) {
          this.editPatientHistory.id = val.id
          this.editPatientHistory.patient_no = val.patient_no
          this.editPatientHistory.case_no = val.case_no
          this.editPatientHistory.history_of_present_illness = val.history_of_present_illness
        } else {
          this.editPatientHistory.id = ''
          this.editPatientHistory.patient_no = ''
          this.editPatientHistory.case_no = ''
          this.editPatientHistory.history_of_present_illness = ''
        }
      },
      immediate: true
    }
  },
  methods: {
    async editHistoryOfPresentIllness() {
      let data = {
        id: this.editPatientHistory.id,
        patient_no: this.editPatientHistory.patient_no,
        case_no: this.editPatientHistory.case_no,
        history_of_present_illness: this.editPatientHistory.history_of_present_illness
      }
      const result = await this.$store.dispatch('patientsCf4/updatePatientHistory', data)
      result.status === 200 ? (() => { this.submitAlert = true; })() : null
    },
    async deletePatientHistory() {
      let data = {
        id: this.editPatientHistory.id,
        patient_no: this.editPatientHistory.patient_no,
        case_no: this.editPatientHistory.case_no,
        admitting_diagnosis: this.editPatientHistory.history_of_present_illness,
        hpi_status: 'DELETED'
      }
      const result = await this.$store.dispatch('patientsCf4/deletePatientHistory', data)
      result.status === 200 ? (() => { this.submitAlert = true; })() : null
    },
    submitUpdatedHistory() {
      console.log('title: ', this.fTitle)
      this.fTitle === 'EDIT HISTORY OF PRESENT ILLNESS' ? this.editHistoryOfPresentIllness() : this.deletePatientHistory()
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