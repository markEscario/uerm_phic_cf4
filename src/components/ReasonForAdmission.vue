<template>
  <HistoryOfPresentIllnessDialog :hModal="historyModal" :pHistory="patientHistory" :Histories="patientHistories"
    :AdData="patientsInfo" :hTitle="dialogTitle" @close="closeHistoryDialog" @hide="closeHistoryDialog" />
  <PertinentPastMedicalHistoryDialog :pHModal="pHistoryModal" :pPastHistories="pertinentPastMedicalHistories"
    :patientData="patientsInfo" :hTitle="dialogTitle" @close="closePertinentPastMedicalHistoryDialog"
    @hide="closePertinentPastMedicalHistoryDialog" />
  <q-expansion-item class="bg-amber-3">
    <template v-slot:header>
      <q-item-section avatar>
        <q-avatar icon="personal_injury" color="primary" text-color="white" />
      </q-item-section>

      <q-item-section>
        III. REASON FOR ADMISSION
      </q-item-section>
      <q-btn class="q-mr-sm" outline rounded color="primary" label="HISTORY OF PRESENT ILLNESS" size="sm"
        @click="historyDialog(patientDetails)" />
      <q-btn class="q-mr-sm" outline rounded color="primary" label="PERTINENT PAST MEDICAL HISTORY" size="sm"
        @click="pertinentPastMedicalHistoryDialog(patientDetails)" />
      <q-btn class="q-mr-sm" outline rounded color="primary" label="OB / GYN HISTORY" size="sm" />
      <q-btn class="q-mr-sm" outline rounded color="primary" label="PERTINENT SIGN AND SYMPTOMS ON ADMISSION"
        size="sm" />
      <q-btn class="q-mr-sm" outline rounded color="primary" label="PHYSICAL EXAMINATION ON ADMISSION" size="sm" />
    </template>

    <q-card>
      <q-card-section>
        <div class="row">
          <div class="col-md-11">
            <label class="text-weight-bold">1. History of Present Illness</label>
            <q-space />
            <div class="text-uppercase" v-for="history in patientHistories" :key="history">
              {{ history.HISTORY_OF_PRESENT_ILLNESS }}
            </div>
          </div>
          <q-space class="q-pa-md" />
          <div class="col-md-11">
            <label class="text-weight-bold">2. a. Pertinent Past Medical History</label>
            <q-space />
            <div class="text-uppercase" v-for="pertinentHistory in pertinentPastMedicalHistories"
              :key="pertinentHistory">
              {{ pertinentHistory.PERTINENT_PAST_MEDICAL_HISTORY }}
            </div>
          </div>
          <q-space class="q-pa-md" />
          <div class="col-md-11">
            <label class="text-weight-bold">2. b. OB/GYN History</label>
            <q-space />

          </div>
          <q-space class="q-pa-md" />
          <div class="col-md-11">
            <label class="text-weight-bold">3. Pertinent Signs and Symptoms on Admission (tick applicable
              box/es)</label>
            <q-space />

          </div>
          <q-space class="q-pa-md" />
          <div class="col-md-11">
            <label class="text-weight-bold">4. Referred from another health care institution (HCI)</label>
            <q-space />

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
import HistoryOfPresentIllnessDialog from 'components/HistoryOfPresentIllnessDialog.vue'
import PertinentPastMedicalHistoryDialog from 'components/PertinentPastMedicalHistoryDialog.vue'

export default defineComponent({
  name: 'ReasonForAdmission',
  components: {
    HistoryOfPresentIllnessDialog,
    PertinentPastMedicalHistoryDialog
  },
  data() {
    return {
      moment,
      dialogTitle: '',
      historyModal: false,
      pHistoryModal: false,
      patientsInfo: {},
      patientHistory: {
        history_of_present_illness: ''
      }
    }
  },
  created() {
    this.fetchPatientData()
    this.getPatientHistoryEntries()
    this.getPertinentPastMedicalHistoryEntries()
  },
  computed: {
    ...mapGetters({
      employees: 'patientsCf4/patients',
      searchStatus: 'patientsCf4/searchStatus',
      patientDetails: 'patientsCf4/patientDetails',
      patientHistories: 'patientsCf4/patientHistories',
      pertinentPastMedicalHistories: 'patientsCf4/pertinentPastMedicalHistories',
      searchedPatients: 'patientsCf4/searchedPatients'
    })
  },
  methods: {
    async fetchPatientData() {
      const result = await this.$store.dispatch('patientsCf4/getPatientDetails', this.$route.query.pNo)
    },
    async getPatientHistoryEntries() {
      console.log('pNoX: ', this.$route.query.pNo)
      const result = await this.$store.dispatch('patientsCf4/getPatientHistoryEntries', this.$route.query.pNo)
    },
    async getPertinentPastMedicalHistoryEntries() {
      console.log('pertinents: ', this.$route.query.pNo)
      const result = await this.$store.dispatch('patientsCf4/getPertinentPastMedicalHistoryEntries', this.$route.query.pNo)
    },
    historyDialog(pInfo) {
      this.dialogTitle = CONSTANTS.HISTORY_DIALOG_LABEL
      this.historyModal = true
      this.patientsInfo = pInfo
    },
    pertinentPastMedicalHistoryDialog(pInfo) {
      this.dialogTitle = CONSTANTS.PERTINENT_PAST_MEDICAL_HISTORY_DIALOG_LABEL
      this.pHistoryModal = true
      this.patientsInfo = pInfo
    },
    closeHistoryDialog() {
      this.historyModal = false
    },
    closePertinentPastMedicalHistoryDialog() {
      this.pHistoryModal = false
    }
  }
})
</script>