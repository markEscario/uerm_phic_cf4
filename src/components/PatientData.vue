<template>
  <EditPatientDataDialog :ePatientDataDialog="editPatientDataDialog" :dTitle="dialogTitle" :pInfo="patientDetails"
    :cf4PData="cf4PatientData" @close="closeEditPatientDataDialog" @hide="closeEditPatientDataDialog" />
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
      <q-btn class="q-mr-sm" outline rounded color="primary" label="UPDATE" @click="patientDataDialog(cf4PD)"
        size="sm" />
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
                {{ Array.isArray(patientDetails.PATIENTNO) ? patientDetails.PATIENTNO[0] : patientDetails.PATIENTNO }}
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
            <label class="text-weight-bold">3. SEX</label>
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
            <div class="text-uppercase">
              {{ cf4PD.AD_DIAGNOSIS }}
            </div>
          </div>
          <div class="col-md-4">
            <label class="text-weight-bold">7. Discharge Diagnosis</label>
            <q-space />
            <div class="text-uppercase">
              {{ cf4PD.DIS_DIAGNOSIS }}
            </div>
          </div>
          <div class="col-md-2">
            <label class="text-weight-bold">8 a. 1st Case Rate Code </label>
            <q-space />
            <div class="text-uppercase">
              {{ cf4PD.AFIRST_CASE_RATE }}
            </div>
          </div>
          <div class="col-md-2">
            <label class="text-weight-bold">8 a. 2nd Case Rate Code </label>
            <q-space />
            <div class="text-uppercase">
              {{ cf4PD.ASECOND_CASE_RATE }}
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
import EditPatientDataDialog from 'components/EditPatientDataDialog.vue'

export default defineComponent({
  name: 'PatientData',
  components: {
    EditPatientDataDialog
  },
  data() {
    return {
      moment,
      dialogTitle: '',
      editPatientDataDialog: false,
      patientInfo: {},
      cf4PatientData: {
        id: 0,
        patient_no: '',
        case_no: '',
        admitting_diagnosis: '',
        discharge_diagnosis: '',
        a_first_case_rate: '',
        a_second_case_rate: '',
        cf4_status: ''
      },
    }
  },
  created() {
    this.fetchPatientData()
    this.getCf4PatientData()
  },
  computed: {
    ...mapGetters({
      employees: 'patientsCf4/patients',
      searchStatus: 'patientsCf4/searchStatus',
      patientDetails: 'patientsCf4/patientDetails',
      cf4PD: 'patientsCf4/cf4PatientData',
    })
  },
  methods: {
    async fetchPatientData() {
      await this.$store.dispatch('patientsCf4/getPatientDetails', this.$route.query.pNo)
    },
    async getCf4PatientData() {
      await this.$store.dispatch('patientsCf4/getCf4PatientData', this.$route.query.pNo)
    },
    patientDataDialog(data) {
      console.log('data: ', data.PATIENTNO)
      this.dialogTitle = 'EDIT PATIENT DATA'
      this.editPatientDataDialog = true
      this.cf4PatientData = {
        id: data.ID,
        patient_no: data.PATIENT_NO,
        case_no: data.CASE_NO,
        admitting_diagnosis: data.AD_DIAGNOSIS,
        discharge_diagnosis: data.DIS_DIAGNOSIS,
        a_first_case_rate: data.AFIRST_CASE_RATE,
        a_second_case_rate: data.ASECOND_CASE_RATE,
        cf4_status: 'UPDATED'
      }
    },
    closeEditPatientDataDialog() {
      this.editPatientDataDialog = false
    }
  }
})
</script>