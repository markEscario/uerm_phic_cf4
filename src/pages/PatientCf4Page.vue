<template>
  <EditPatientDataDialog :ePatientDataDialog="editPatientDataDialog" :dTitle="dialogTitle" :pInfo="patientDetails"
    :cf4PData="cf4PatientData" @close="closeEditPatientDataDialog" @hide="closeEditPatientDataDialog" />
  <div class="q-pa-md" style="max-width: 1940px">
    <q-banner dense inline-actions class="text-white bg-grey">
      <label class="text-h6">
        {{ patientDetails.LASTNAME }}, {{ patientDetails.FIRSTNAME }} {{ patientDetails.MIDDLENAME }} CASE NO: {{
        patientDetails.CASENO }}
      </label>
    </q-banner>
    <q-space class="q-pa-sm" />
    <div class="row">
      <div class="col-md-12">
        <q-btn outline class="q-mr-sm" round color="primary" icon="arrow_back" @click="$router.go(-1)" />
      </div>
    </div>
    <q-space class="q-pa-sm" />
    <q-list bordered class="rounded-borders">
      <q-expansion-item class="bg-amber-3" default-opened>
        <template v-slot:header>
          <q-item-section avatar>
            <q-avatar icon="local_hospital" color="primary" text-color="white" />
          </q-item-section>

          <q-item-section>
            I. HEALTH CARE INSTITUTION
          </q-item-section>
        </template>
        <q-card>
          <q-card-section>
            <div class="row">
              <div class="col-md-6">
                <label class="text-weight-bold text-uppercase">1. Name of HCI</label>
                <q-space />
                {{ nameOfHci }}
              </div>
              <div class="col-md-3">
                <label class="text-weight-bold text-uppercase">2. Accreditation Number</label>
                <q-space />
                {{ accreditationNo }}
              </div>
            </div>

            <q-space class="q-pa-sm" />

            <div class="row">
              <div class="col-md-6">
                <label class="text-weight-bold text-uppercase">3. Address of HCI</label>
                <q-space />
                {{ addressOfHci }}
              </div>

            </div>
            <q-space />
            {{ addressBottomLabel }}
          </q-card-section>
        </q-card>
      </q-expansion-item>

      <q-separator class="q-pa-sm" />
      <PatientData />
      <q-separator class="q-pa-sm" />

      <ReasonForAdmission />
      <q-separator class="q-pa-sm" />

      <CourseInTheWard />
      <q-separator class="q-pa-sm" />

      <q-expansion-item class="bg-amber-3">
        <template v-slot:header>
          <q-item-section avatar>
            <q-avatar icon="local_pharmacy" color="primary" text-color="white" />
          </q-item-section>

          <q-item-section>
            V. DRUGS / MEDICINES
          </q-item-section>
        </template>

        <q-card>
          <q-card-section>
            Fetch:
            <q-input v-model="text" />
          </q-card-section>
        </q-card>
      </q-expansion-item>

      <q-separator class="q-pa-sm" />
      <OutComeOfTreatment />
      <q-separator class="q-pa-sm" />
    </q-list>

    <q-space class="q-pa-sm" />
  </div>
</template>
<script>
import { defineComponent, ref } from 'vue'
import { mapGetters } from 'vuex'
import moment from 'moment'
import CONSTANTS from '../constants'
import ReasonForAdmission from 'components/ReasonForAdmission.vue'
import PatientData from 'components/PatientData.vue'
import CourseInTheWard from 'components/CourseInTheWard.vue'
import OutComeOfTreatment from 'components/OutComeOfTreatment.vue'

export default defineComponent({
  name: 'patientCf4',
  components: {
    ReasonForAdmission,
    PatientData,
    CourseInTheWard,
    OutComeOfTreatment
  },
  data() {
    return {
      moment,
      dialogTitle: '',
      adModal: false,
      editAdModal: false,
      patientsInfo: {},
      nameOfHci: CONSTANTS.NAME_OF_HCI,
      accreditationNo: CONSTANTS.ACCREDITATION_NO,
      addressOfHci: CONSTANTS.ADDRESS_OF_HCI,
      addressBottomLabel: CONSTANTS.ADDRESS_BOTTOM_LABEL
    }
  },
  computed: {
    ...mapGetters({
      employees: 'patientsCf4/patients',
      searchStatus: 'patientsCf4/searchStatus',
      patientDetails: 'patientsCf4/patientDetails',
      patientDiagnosis: 'patientsCf4/patientDiagnosis',
      searchedPatients: 'patientsCf4/searchedPatients',
      encoders: 'patientsCf4/encoders'
    })
  },
  mounted() {
    this.fetchPatientData()
  },
  methods: {
    async fetchPatientData() {
      const result = await this.$store.dispatch('patientsCf4/getPatientDetails', this.$route.query.pNo)
      console.log('r: ', result)
    }
  }

})
</script>
