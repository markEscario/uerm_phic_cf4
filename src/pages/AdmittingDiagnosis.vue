<template>
  <AdmittingDiagnosisDialog :AdModal="adModal" :vData="projects" @close="closeDialog" @hide="closeDialog" />
  <div class="q-pa-md" style="max-width: 1940px">
    <q-banner dense inline-actions class="text-white bg-grey">
      <label class="text-h6">
        {{ patientDetails.LASTNAME }}, {{ patientDetails.FIRSTNAME }} {{ patientDetails.MIDDLENAME }} - {{
        Array.isArray(patientDetails.PATIENTNO) ? patientDetails.PATIENTNO[0] : patientDetails.PATIENTNO }}
      </label>
    </q-banner>
    <q-space class="q-mb-md" />
    <label class="text-weight-bold">ADMITTING DIAGNOSIS</label>
  </div>
</template>
<script>
import { defineComponent, ref } from 'vue'
import { useQuasar } from 'quasar'
import { mapGetters } from 'vuex'
import moment from 'moment'
import CONSTANTS from '../constants'

export default defineComponent({
  name: 'patientCf4',
  props: ['plan'],
  setup() {
    const $q = useQuasar()
    return {
      triggerPositive() {
        $q.notify({
          type: 'positive',
          message: 'Your inputs was submitted'
        })
      },
      triggerInfo() {
        $q.notify({
          type: 'info',
          message: 'Your inputs was updated'
        })
      },
      triggerNegative() {
        $q.notify({
          type: 'negative',
          message: 'Your inputs was deleted'
        })
      }
    }
  },
  data() {
    return {
      moment,
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
      searchedPatients: 'patientsCf4/searchedPatients',
    })
  },

  created() {
    this.fetchPatientData()
  },
  watch: {
    pInfo: {
      handler(val) {
        if (val) {
          console.log('val: ', val)
        }
      },
      immediate: true
    }

  },
  methods: {
    async fetchPatientData() {
      console.log('pNo: ', this.$route.query.pNo)
      const result = await this.$store.dispatch('patientsCf4/getPatientDetails', this.$route.query.pNo)
      console.log('pInfo: ', result)
    },
    async admittingDiagnosis(patientNo) {
      await this.$router.push({ path: 'admitting_diagnosis', query: { pNo: patientNo } })
    }

  }


})
</script>