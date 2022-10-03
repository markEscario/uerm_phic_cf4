<template>
  <AdmittingDiagnosisDialog :AdModal="adModal" :vData="adDiagnosis" :AdData="patientsInfo"
    :PAdDiagnosis="patientAdDiagnosis" :DTitle="dialogTitle" @close="closeAdDiagnosisDialog"
    @hide="closeAdDiagnosisDialog" />
  <q-expansion-item class="bg-amber-3" default-opened>
    <template v-slot:header>
      <q-item-section avatar>
        <q-avatar>
          <q-avatar icon="account_box" color="primary" text-color="white" />
        </q-avatar>
      </q-item-section>

      <q-item-section>
        II. PATIENT DATA
      </q-item-section>
      <q-btn class="q-mr-sm" outline rounded color="primary" label="ADMITTING DIAGNOSIS"
        @click="openAdmittingDiagnosis(patientDetails)" size="sm" />
    </template>

    <q-card>
      <q-card-section>
        <div class="row">

          <div class="col-md-6">
            <label class="text-weight-bold">1. Name of Patient</label>
            <q-space />
            <div class="row">
              <div class="col-md-3">
                {{ patientDetails.LASTNAME }}
                <q-space />
                <label class="text-caption text-weight-bold">LASTNAME</label>
              </div>
              <div class="col-md-3">
                {{ patientDetails.FIRSTNAME }}
                <q-space />
                <label class="text-caption text-weight-bold">FIRSTNAME</label>
              </div>
              <div class="col-md-3">
                {{ patientDetails.MIDDLENAME }}
                <q-space />
                <label class="text-caption text-weight-bold">MIDDLENAME</label>
              </div>
            </div>

          </div>
          <div class="col-md-2">
            <label class="text-weight-bold">2. PIN</label>
            <q-space />
            <div class="row">
              <div class="col-md-3">
              </div>
            </div>
          </div>
          <div class="col-md-2">
            <label class="text-weight-bold">3. Age</label>
            <q-space />
            <div class="row">
              <div class="col-md-3">
                {{ Array.isArray(patientDetails.AGE) ? patientDetails.AGE[0] : patientDetails.AGE }}
              </div>
            </div>
          </div>
          <div class="col-md-2">
            <label class="text-weight-bold">3. Sex</label>
            <q-space />
            <div class="row">
              <div class="col-md-3">
                {{ patientDetails.SEX }}
              </div>
            </div>
          </div>

        </div>
        <q-space class="q-pa-sm" />

        <div class="row">
          <div class="col-md-3">
            <label class="text-weight-bold">5. Chief Complaint</label>
            <q-space />
            {{ patientDetails.CC }}
          </div>
        </div>
        <q-space class="q-pa-sm" />
        <div class="row">
          <div class="col-md-4">
            <label class="text-weight-bold">6. Admitting Diagnosis</label>
            <q-space />
            <div class="text-uppercase" v-for="diagnosis in patientAdDiagnosis" :key="diagnosis">
              {{ diagnosis.AD_DIAGNOSIS }}
            </div>
          </div>
          <div class="col-md-4">
            <label class="text-weight-bold">7. Discharge Diagnosis</label>
            <q-space />
            <div class="text-uppercase" v-for="diagnosis in patientAdDiagnosis" :key="diagnosis">
              {{ diagnosis.DIS_DIAGNOSIS }}
            </div>
          </div>
          <div class="col-md-2">
            <label class="text-weight-bold">8 a. 1st Case Rate Code </label>
            <q-space />
            <div class="text-uppercase" v-for="diagnosis in patientAdDiagnosis" :key="diagnosis">
              {{ diagnosis.AFIRST_CASE_RATE }}
            </div>
          </div>
          <div class="col-md-2">
            <label class="text-weight-bold">8 a. 2nd Case Rate Code </label>
            <q-space />
            <div class="text-uppercase" v-for="diagnosis in patientAdDiagnosis" :key="diagnosis">
              {{ diagnosis.ASECOND_CASE_RATE }}
            </div>
          </div>

        </div>

        <q-space class="q-pa-sm" />

        <div class="row">
          <div class="col-md-3">
            <label class="text-weight-bold">9. a. Date Admitted </label>
            <q-space />
            {{ patientDetails.DATEAD ? moment(patientDetails.DATEAD.substr(0, 10)).format('MMMM d, YYYY') :
            patientDetails.DATEAD }}

          </div>

          <div class="col-md-3">
            <label class="text-weight-bold">9. b. Time Admitted </label>
            <q-space />
            {{ patientDetails.DATEAD ? moment(patientDetails.DATEAD).format('hh:mm A') :
            patientDetails.DATEAD }}
          </div>

        </div>
        <div class="row">
          <div class="col-md-3">
            <label class="text-weight-bold">9. a. Date Discharged </label>
            <q-space />
            {{ patientDetails.DATEDIS ? moment(patientDetails.DATEDIS.substr(0, 10)).format('MMMM d, YYYY')
            :
            patientDetails.DATEDIS }}
          </div>

          <div class="col-md-3">
            <label class="text-weight-bold">9. b. Time Discharged </label>
            <q-space />
            {{ patientDetails.DATEAD ? moment(patientDetails.DATEDIS).format('hh:mm A') :
            patientDetails.DATEDIS }}
          </div>

        </div>

      </q-card-section>
    </q-card>
  </q-expansion-item>
</template>
<script>
import { defineComponent, ref } from "vue";
import { mapGetters } from 'vuex'
import moment from 'moment'
import CONSTANTS from '../constants'
import AdmittingDiagnosisDialog from 'components/AdmittingDiagnosisDialog.vue'

export default defineComponent({
  name: 'PatientData',
  components: {
    AdmittingDiagnosisDialog
  },
  data() {
    return {
      moment,
      dialogTitle: '',
      adModal: false,
      patientsInfo: {},
      patientAdDiagnosis: [],
      adDiagnosis: {
        patient_no: '',
        case_no: '',
        admitting_diagnosis: '',
        discharge_diagnosis: '',
        a_first_case_rate: '',
        a_second_case_rate: '',
        ad_status: ''
      },
    }
  },
  created() {
    this.fetchPatientData()
    this.getAdDiagnosisEntries()
  },
  computed: {
    ...mapGetters({
      employees: 'patientsCf4/patients',
      searchStatus: 'patientsCf4/searchStatus',
      patientDetails: 'patientsCf4/patientDetails',
      patientDiagnosis: 'patientsCf4/patientDiagnosis',
      searchedPatients: 'patientsCf4/searchedPatients'
    })
  },
  methods: {
    async fetchPatientData() {
      const result = await this.$store.dispatch('patientsCf4/getPatientDetails', this.$route.query.pNo)
    },
    async getAdDiagnosisEntries() {
      const result = await this.$store.dispatch('patientsCf4/getAdDiagnosisEntries', this.$route.query.pNo)
      this.patientAdDiagnosis = this.patientDiagnosis
    },
    openAdmittingDiagnosis(pInfo) {
      this.dialogTitle = CONSTANTS.AD_DIALOG_LABEL
      this.adModal = true
      this.patientsInfo = pInfo
    },
    closeAdDiagnosisDialog() {
      this.adModal = false
      this.adDiagnosis = {}
    }
  }
})
</script>