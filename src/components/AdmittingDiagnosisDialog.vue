<template>
  <q-dialog v-if="AdModal" :model-value="true">
    <q-card style="width: 1980px; max-width: 180vw;">
      <q-card-section>
        <q-banner dense inline-actions class="text-white bg-primary">
          <label class="text-caption">
            {{ AdData.LASTNAME }} {{ AdData.FIRSTNAME }} {{
            AdData.MIDDLENAME }} - {{ AdData.PATIENTNO[0] }}
          </label>

        </q-banner>
        <q-space class="q-mb-sm" />
        <div class="text-caption text-weight-bold text-uppercase">PATIENT'S {{ AdLabel }}</div>
      </q-card-section>
      <q-form @submit="submitAdDiagnosis" class="q-gutter-md" ref="form">
        <div class="row" style="max-width: 1800px">

          <div class="col-md-12 q-ml-md">
            <q-input outlined v-model="adDiagnosis.admitting_diagnosis" autogrow hint="ADMITTING DIAGNOSIS" lazy-rules
              :rules="[val => val && val.length > 0 || 'This is required']" />
          </div>
          <q-space class="q-mb-md" />
          <div class="col-md-12 q-ml-md">
            <q-input outlined v-model="adDiagnosis.discharge_diagnosis" autogrow hint="DISCHARGE DIAGNOSIS" lazy-rules
              :rules="[val => val && val.length > 0 || 'This is required']" />
          </div>

          <div class="col-md-2 q-ml-md">
            <q-space class="q-mb-md" />
            <q-input outlined v-model="adDiagnosis.a_first_case_rate" hint="FIRST CASE RATE" />
          </div>
          <div class="col-md-2 q-ml-md">
            <q-space class="q-mb-md" />
            <q-input outlined v-model="adDiagnosis.a_second_case_rate" hint="SECOND CASE RATE" />
          </div>

        </div>
        <div class="row q-pa-md">
          <q-btn class="q-mr-md" label="Submit" type="submit" color="primary" />
        </div>
      </q-form>
      <q-card-actions align="right" class="bg-white text-teal">


        <q-btn flat label="Close" @click="close" v-close-popup />
      </q-card-actions>

      <q-space class="q-mb-sm" />
      <q-separator class="q-ml-md q-mr-md" />
      <q-space class="q-mb-md" />

      <div class="row" style="max-width: 1800px">
        <div class="col-md-12 q-ml-md">
          <q-banner dense inline-actions class="text-white bg-primary">
            <label class="text-caption">
              ENTRIES
            </label>

          </q-banner>
        </div>
        <q-space class="q-mb-md" />
        <div class="col-md-12 q-ml-md">
          <q-input outlined v-model="adDiagnosis.discharge_diagnosis" autogrow hint="DISCHARGE DIAGNOSIS" />
        </div>

        <div class="col-md-2 q-ml-md">
          <q-space class="q-mb-md" />
          <q-input outlined hint="FIRST CASE RATE" />
        </div>
        <div class="col-md-2 q-ml-md">
          <q-space class="q-mb-md" />
          <q-input outlined hint="SECOND CASE RATE" />
        </div>

      </div>
      <q-space class="q-mb-xl" />
    </q-card>
  </q-dialog>
</template>
<script>
import { defineComponent, ref } from 'vue'
import { mapGetters } from 'vuex'
import CONSTANTS from '../constants'

export default defineComponent({
  name: 'AdmittingDiagnosisDialog',
  setup() {
    return {
      triggerPositive() {
        $q.notify({
          type: 'positive',
          message: 'Project was submitted'
        })
      },
      triggerInfo() {
        $q.notify({
          type: 'info',
          message: 'Project was updated'
        })
      },
      triggerNegative() {
        $q.notify({
          type: 'negative',
          message: 'Project was deleted'
        })
      }
    }
  },
  props: ['AdModal', 'AdData'],

  data() {
    return {
      AdLabel: CONSTANTS.AD_DIALOG_LABEL,
      patientAdData: {},
      adDiagnosis: {
        patient_no: '',
        case_no: '',
        admitting_diagnosis: '',
        discharge_diagnosis: '',
        a_first_case_rate: '',
        a_second_case_rate: '',
        ad_status: ''
      },
      searchHint: CONSTANTS.SEARCH_HINT,
      searchLabel: CONSTANTS.SEARCH_LABEL,
      btnCf4Label: CONSTANTS.BUTTON_CF4_LABEL,
      loadingLabel: CONSTANTS.LOADING_LABEL
    }
  },
  computed: {
    ...mapGetters({
      employees: 'patientsCf4/patients',
      searchStatus: 'patientsCf4/searchStatus',
      patientDetails: 'patientsCf4/patientDetails',
      searchedPatients: 'patientsCf4/searchedPatients',
    })
  },
  methods: {
    async getPatientDetails(patientNo) {
      await this.$router.push({ path: 'patient_cf4', query: { pNo: patientNo } })
    },
    async createAdDiagnosis() {
      let data = {
        patient_no: this.AdData.PATIENTNO[0],
        case_no: this.AdData.CASENO,
        admitting_diagnosis: this.adDiagnosis.admitting_diagnosis,
        discharge_diagnosis: this.adDiagnosis.discharge_diagnosis,
        a_first_case_rate: this.adDiagnosis.a_first_case_rate,
        a_second_case_rate: this.adDiagnosis.a_second_case_rate,
        ad_status: CONSTANTS.NEW_AD_STATUS,
        emp_code: this.AdData.ENCODED_BY
      }
      const result = await this.$store.dispatch('patientsCf4/createAdDiagnosis', data)
      this.submitStatus === 200 ? (() => { this.close(); this.triggerPositive(); })() : null
    },
    submitAdDiagnosis() {
      // this.title === 'Assign Project' ? this.saveProject() : this.title === 'Edit Project' ? this.saveEditProject() : this.deleteProject()
      this.createAdDiagnosis();
    },
    close() {
      this.$emit('close')
    }
  }
})
</script>