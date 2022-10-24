<template>
  <q-dialog v-if="ePatientDataDialog" :model-value="true">
    <q-card style="width: 1980px; max-width: 180vw;">
      <q-card-section>
        <q-banner dense inline-actions class="text-white bg-primary q-mb-sm">
          <label class="text-caption">
            {{ pInfo.LASTNAME }}, {{ pInfo.FIRSTNAME }} {{ pInfo.MIDDLENAME }} - {{ pInfo.PATIENTNO[0] }}
          </label>
        </q-banner>

        <q-banner v-if="submitAlert" dense inline-actions class="text-white bg-green-3">
          <label class="text-caption">
            <q-spinner-hourglass color="primary" size="2em" />
            {{ updatePatientDataMsg }}
          </label>
        </q-banner>

        <q-space class="q-mb-sm" />
        <div class="text-caption text-weight-bold text-uppercase">{{ dTitle }}</div>
      </q-card-section>
      <q-form @submit="submitUpdateCf4PData" class="q-gutter-md" ref="form">
        <div class="row" style="max-width: 1800px">
          <div class="col-md-12 q-ml-md">
            <q-input class="text-uppercase" outlined v-model="cf4PatientData.chief_complaint" autogrow
              hint="CHIEF COMPLAINT" lazy-rules :rules="[val => val && val.length > 0 || 'This is required']" />
          </div>
          <div class="col-md-12 q-ml-md">
            <q-input class="text-uppercase" outlined v-model="cf4PatientData.admitting_diagnosis" autogrow
              hint="ADMITTING DIAGNOSIS" />
          </div>
          <q-space class="q-mb-md" />
          <div class="col-md-12 q-ml-md">
            <q-input class="text-uppercase" outlined v-model="cf4PatientData.discharge_diagnosis" autogrow
              hint="DISCHARGE DIAGNOSIS" />
          </div>
          <div class="col-md-2 q-ml-md">
            <q-space class="q-mb-md" />
            <q-input class="text-uppercase" outlined v-model="cf4PatientData.a_first_case_rate"
              hint="FIRST CASE RATE" />
          </div>
          <div class="col-md-2 q-ml-md">
            <q-space class="q-mb-md" />
            <q-input class="text-uppercase" outlined v-model="cf4PatientData.a_second_case_rate"
              hint="SECOND CASE RATE" />
          </div>
        </div>
        <div class="row q-pa-md">
          <q-btn class="q-mr-md" label="Update" type="submit" color="primary" />
          <q-btn label="Close" @click="close" color="grey" v-close-popup />
        </div>
      </q-form>
    </q-card>
  </q-dialog>
</template>
<script>
import { defineComponent, ref } from 'vue'
import CONSTANTS from '../constants'
import { mapGetters } from 'vuex'

export default defineComponent({
  name: 'EditPatientDataDialog',
  props: ['ePatientDataDialog', 'pInfo', 'cf4PData', 'dTitle'],
  data() {
    return {
      cf4PatientData: {
        id: '',
        patient_no: '',
        case_no: '',
        admitting_diagnosis: '',
        discharge_diagnosis: '',
        a_first_case_rate: '',
        a_second_case_rate: '',
        cf4_status: ''
      },
      submitAlert: false,
      updatePatientDataMsg: CONSTANTS.FORM_UPDATE_PATIENT_DATA_MESSAGE
    }
  },
  mounted() {
    this.getCf4PatientData()
  },
  computed: {
    ...mapGetters({
      searchStatus: 'patientsCf4/searchStatus',
      patientDetails: 'patientsCf4/patientDetails',
      cf4PD: 'patientsCf4/cf4PatientData',
    })
  },
  watch: {
    cf4PData: {
      handler(val) {
        if (val) {
          this.cf4PatientData.id = val.id
          this.cf4PatientData.patient_no = val.patient_no
          this.cf4PatientData.case_no = val.case_no
          this.cf4PatientData.chief_complaint = val.chief_complaint
          this.cf4PatientData.admitting_diagnosis = val.admitting_diagnosis
          this.cf4PatientData.discharge_diagnosis = val.discharge_diagnosis
          this.cf4PatientData.a_first_case_rate = val.a_first_case_rate
          this.cf4PatientData.a_second_case_rate = val.a_second_case_rate
          this.cf4PatientData.cf4_status = val.cf4_status
        }
      },
      immediate: true
    }
  },
  methods: {
    async getCf4PatientData() {
      const res = await this.$store.dispatch('patientsCf4/getCf4PatientData', this.$route.query.pNo)
    },
    async updateCf4PData() {
      let data = {
        id: this.cf4PatientData.id,
        patient_no: this.cf4PatientData.patient_no,
        case_no: this.cf4PatientData.case_no,
        chief_complaint: this.cf4PatientData.chief_complaint,
        admitting_diagnosis: this.cf4PatientData.admitting_diagnosis,
        discharge_diagnosis: this.cf4PatientData.discharge_diagnosis,
        a_first_case_rate: this.cf4PatientData.a_first_case_rate,
        a_second_case_rate: this.cf4PatientData.a_second_case_rate
      }
      const result = await this.$store.dispatch('patientsCf4/updateCf4PatientData', data)
      result.status === 200 ? (() => { this.submitAlert = true; })() : null
    },
    submitUpdateCf4PData() {
      this.updateCf4PData()
      setTimeout(() => {
        this.submitAlert = false
        this.close()
        this.getCf4PatientData();
      }, 3000)
    },
    close() {
      this.$emit('close')
      this.cf4PatientData = {}
    }
  }

})
</script>
