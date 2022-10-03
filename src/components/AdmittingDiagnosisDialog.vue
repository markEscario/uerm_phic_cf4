<template>
  <EditAdDiagnosisDialog :EditAdModal="editAdModal" :fTitle="formTitle" :PtInfo="patientInfo"
    :PtDiagnosis="editAdDiagnosis" @close="closeEditAdDiagnosisDialog" @hide="closeEditAdDiagnosisDialog" />
  <q-dialog v-if="AdModal" :model-value="true">
    <q-card style="width: 1980px; max-width: 180vw;">

      <q-card-section>
        <q-banner dense inline-actions class="text-white bg-primary q-mb-sm">
          <label class="text-caption">
            {{ AdData.LASTNAME }} {{ AdData.FIRSTNAME }} {{
            AdData.MIDDLENAME }} - {{ AdData.PATIENTNO[0] }}
          </label>
        </q-banner>

        <q-banner v-if="submitAlert" dense inline-actions class="text-white bg-green-3">
          <label class="text-caption">
            <q-spinner-hourglass color="primary" size="2em" />
            {{ formSubmitMsg }}
          </label>
        </q-banner>

        <q-space class="q-mb-sm" />
        <div class="text-caption text-weight-bold text-uppercase">ADD PATIENT'S {{ DTitle }}</div>
      </q-card-section>
      <q-form @submit="submitAdDiagnosis" class="q-gutter-md" ref="form">
        <div class="row" style="max-width: 1800px">
          <div class="col-md-12 q-ml-md">
            <q-input class="text-uppercase" outlined v-model="adDiagnosis.admitting_diagnosis" autogrow
              hint="ADMITTING DIAGNOSIS" lazy-rules :rules="[val => val && val.length > 0 || 'This is required']" />
          </div>
          <q-space class="q-mb-md" />
          <div class="col-md-12 q-ml-md">
            <q-input class="text-uppercase" outlined v-model="adDiagnosis.discharge_diagnosis" autogrow
              hint="DISCHARGE DIAGNOSIS" lazy-rules :rules="[val => val && val.length > 0 || 'This is required']" />
          </div>
          <div class="col-md-2 q-ml-md">
            <q-space class="q-mb-md" />
            <q-input class="text-uppercase" outlined v-model="adDiagnosis.a_first_case_rate" hint="FIRST CASE RATE" />
          </div>
          <div class="col-md-2 q-ml-md">
            <q-space class="q-mb-md" />
            <q-input class="text-uppercase" outlined v-model="adDiagnosis.a_second_case_rate" hint="SECOND CASE RATE" />
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

      <div class="row" style="max-width: 1820px">
        <div class="col-md-12 q-ml-md">
          <q-banner dense inline-actions class="text-white bg-primary">
            <label class="text-caption">
              ADMITTING DIAGNOSIS
            </label>

          </q-banner>
        </div>
        <q-space class="q-mb-md" />
        <div v-for="diagnosis in PAdDiagnosis" :key="diagnosis" class="col-md-12 q-ml-md">
          <q-list class="q-mb-sm" bordered separator>
            <q-item>
              <q-item-section class="text-uppercase"> {{ diagnosis.AD_DIAGNOSIS }}</q-item-section>
              <q-btn round color="primary" icon="edit" @click="editAdDiagnosisDialog(diagnosis)" class="q-mr-sm" />
              <q-btn round color="red" icon="delete" @click="deleteAdDiagnosisDialog(diagnosis)" />
            </q-item>
          </q-list>
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
import EditAdDiagnosisDialog from 'components/EditAdDiagnosisDialog.vue'

export default defineComponent({
  name: 'AdmittingDiagnosisDialog',
  components: {
    EditAdDiagnosisDialog
  },
  props: ['AdModal', 'vData', 'AdData', 'PAdDiagnosis', 'DTitle'],
  data() {
    return {
      patientAdData: {},
      patientInfo: {},
      adDiagnosis: {
        patient_no: '',
        case_no: '',
        admitting_diagnosis: '',
        discharge_diagnosis: '',
        a_first_case_rate: '',
        a_second_case_rate: '',
        ad_status: ''
      },
      editAdDiagnosis: {
        id: '',
        patient_no: '',
        case: '',
        admitting_diagnosis: '',
        discharge_diagnosis: '',
        a_first_case_rate: '',
        a_second_case_rate: ''
      },
      deleteAdDiagnosis: {
        id: '',
        patient_no: '',
        admitting_diagnosis: '',
        case: '',
        ad_status: ''
      },
      formTitle: '',
      editAdModal: false,
      submitAlert: false,
      searchHint: CONSTANTS.SEARCH_HINT,
      searchLabel: CONSTANTS.SEARCH_LABEL,
      btnCf4Label: CONSTANTS.BUTTON_CF4_LABEL,
      loadingLabel: CONSTANTS.LOADING_LABEL,
      AdLabel: CONSTANTS.AD_DIALOG_LABEL,
      formSubmitMsg: CONSTANTS.FORM_SUBMIT_MESSAGE
    }
  },
  created() {
    this.fetchPatientData()
  },
  computed: {
    ...mapGetters({
      employees: 'patientsCf4/patients',
      searchStatus: 'patientsCf4/searchStatus',
      patientDetails: 'patientsCf4/patientDetails',
      searchedPatients: 'patientsCf4/searchedPatients',
    })
  },
  watch: {
    vData: {
      handler(val) {
        if (val) {
          this.adDiagnosis.admitting_diagnosis = val.admitting_diagnosis
          this.adDiagnosis.discharge_diagnosis = val.discharge_diagnosis
          this.adDiagnosis.a_first_case_rate = val.a_first_case_rate
          this.adDiagnosis.a_second_case_rate = val.a_second_case_rate
        } else {
          this.adDiagnosis.admitting_diagnosis = ''
          this.adDiagnosis.discharge_diagnosis = ''
          this.adDiagnosis.a_first_case_rate = ''
          this.adDiagnosis.a_second_case_rate = ''
        }
      },
      immediate: true
    }
  },
  methods: {
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
      result.status === 200 ? (() => { this.submitAlert = true; })() : null
    },
    async cf4() {
      await this.$router.push({ path: 'patient_cf4', query: { pNo: this.AdData.PATIENTNO[0] } })
    },
    submitAdDiagnosis() {
      // this.title === 'Assign Project' ? this.saveProject() : this.title === 'Edit Project' ? this.saveEditProject() : this.deleteProject()
      this.createAdDiagnosis();
      setTimeout(() => {
        this.submitAlert = false
        this.close()
        this.$router.go()
      }, 3000)
    },
    editAdDiagnosisDialog(pDiagnosis) {
      console.log('id: ', pDiagnosis.ID)
      this.editAdModal = true
      this.formTitle = 'EDIT ADMITTING DIAGNOSIS'

      this.editAdDiagnosis = {
        id: pDiagnosis.ID,
        patient_no: pDiagnosis.PATIENTNO,
        case_no: pDiagnosis.CASENO,
        admitting_diagnosis: pDiagnosis.AD_DIAGNOSIS,
        discharge_diagnosis: pDiagnosis.DIS_DIAGNOSIS,
        a_first_case_rate: pDiagnosis.AFIRST_CASE_RATE,
        a_second_case_rate: pDiagnosis.ASECOND_CASE_RATE
      }
    },
    deleteAdDiagnosisDialog(pDiagnosis) {
      console.log('id: ', pDiagnosis.ID)
      this.editAdModal = true,
        this.formTitle = 'DELETE ADMITTING DIAGNOSIS'

      this.editAdDiagnosis = {
        id: pDiagnosis.ID,
        patient_no: pDiagnosis.PATIENTNO,
        case_no: pDiagnosis.CASENO,
        admitting_diagnosis: pDiagnosis.AD_DIAGNOSIS
      }
    },
    async fetchPatientData() {
      const result = await this.$store.dispatch('patientsCf4/getPatientDetails', this.$route.query.pNo)
      this.patientInfo = this.patientDetails
    },
    closeEditAdDiagnosisDialog() {
      this.editAdModal = false
    },
    close() {
      this.$emit('close')
    }
  }
})
</script>