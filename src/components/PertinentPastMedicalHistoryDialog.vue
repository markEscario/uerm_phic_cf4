<template>
  <EditPertinentPastMedicalHistoryDialog :EditPertinentHistoryModal="editPertinentHistoryModal" :fTitle="formTitle"
    :PtInfo="patientInfo" :editPPMedicalHistory="editPertinentPastMedicalHistory"
    @close="closeEditPertinentPastMedicalHistoryDialog" @hide="closeEditPertinentPastMedicalHistoryDialog" />
  <q-dialog v-if="pHModal" :model-value="true">
    <q-card style="width: 1980px; max-width: 180vw;">
      <q-card-section>
        <q-banner dense inline-actions class="text-white bg-primary q-mb-sm">
          <label class="text-caption">
            {{ patientData.LASTNAME }} {{ patientData.FIRSTNAME }} {{
            patientData.MIDDLENAME }} - {{ patientData.PATIENTNO[0] }}
          </label>
        </q-banner>

        <q-banner v-if="submitAlert" dense inline-actions class="text-white bg-green-3">
          <label class="text-caption">
            <q-spinner-hourglass color="primary" size="2em" />
            {{ formSubmitMsg }}
          </label>
        </q-banner>

        <q-space class="q-mb-sm" />
        <div class="text-caption text-weight-bold text-uppercase">ADD PATIENT'S {{ hTitle }}</div>
      </q-card-section>
      <q-form @submit="submitHistory" class="q-gutter-md" ref="form">
        <div class="row" style="max-width: 1800px">
          <div class="col-md-12 q-ml-md">
            <q-input class="text-uppercase" outlined v-model="patientPertinentHistory.pertinent_past_medical_history"
              autogrow hint="PERTINENT PAST MEDICAL HISTORY" lazy-rules
              :rules="[val => val && val.length > 0 || 'This is required']" />
          </div>
        </div>
        <div class="row q-pa-md">
          <q-btn class="q-mr-md" label="Submit" type="submit" color="primary" />
        </div>
      </q-form>
      <q-card-actions align="right" class="bg-white text-teal">
        <q-btn flat label="Close" @click="close" v-close-popup />
      </q-card-actions>

      <div class="row" style="max-width: 1820px">
        <div class="col-md-12 q-ml-md">
          <q-banner dense inline-actions class="text-white bg-primary">
            <label class="text-caption">
              PERTINENT PAST MEDICAL HISTORIES
            </label>

          </q-banner>
        </div>
        <q-space class="q-mb-md" />
        <div v-for="pertinentHistory in pPastHistories" :key="pertinentHistory" class="col-md-12 q-ml-md">
          <q-list class="q-mb-sm" bordered separator>
            <q-item>
              <q-item-section class="text-uppercase">{{ pertinentHistory.PERTINENT_PAST_MEDICAL_HISTORY }}
              </q-item-section>
              <q-btn round color="primary" icon="edit" @click="editPertinentPastMedicalHistoryDialog(pertinentHistory)"
                class="q-mr-sm" />
              <q-btn round color="red" icon="delete"
                @click="deletePertinentPastMedicalHistoryDialog(pertinentHistory)" />
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
import EditPertinentPastMedicalHistoryDialog from 'components/EditPertinentPastMedicalHistoryDialog.vue'

export default defineComponent({
  name: 'PertinentPastMedicalHistory',
  components: {
    EditPertinentPastMedicalHistoryDialog
  },
  props: [
    'pHModal',
    'patientData',
    'hTitle',
    'pPastHistories'],
  data() {
    return {
      patientInfo: {},
      formTitle: '',
      editPertinentHistoryModal: false,
      submitAlert: false,
      patientPertinentHistory: {
        patient_no: '',
        case_no: '',
        pertinent_past_medical_history: ''
      },
      editPertinentPastMedicalHistory: {
        id: '',
        patient_no: '',
        case_no: '',
        pertinent_past_medical_history: ''
      },
      searchHint: CONSTANTS.SEARCH_HINT,
      searchLabel: CONSTANTS.SEARCH_LABEL,
      btnCf4Label: CONSTANTS.BUTTON_CF4_LABEL,
      loadingLabel: CONSTANTS.LOADING_LABEL,
      AdLabel: CONSTANTS.AD_DIALOG_LABEL,
      formSubmitMsg: CONSTANTS.FORM_SUBMIT_HISTORY_MESSAGE
    }
  },
  created() {
    this.fetchPatientData()
  },
  computed: {
    ...mapGetters({
      employees: 'patientsCf4/patients',
      searchStatus: 'patientsCf4/searchStatus',
      patientDetails: 'patientsCf4/patientDetails'
    })
  },
  watch: {
    pPastHistory: {
      handler(val) {
        if (val) {
          this.patientPertinentHistory.patient_no = val.patient_no
          this.patientPertinentHistory.case_no = val.case_no
          this.patientPertinentHistory.pertinent_past_medical_history = val.pertinent_past_medical_history
        } else {
          this.patientPertinentHistory.patient_no = ''
          this.patientPertinentHistory.case_no = ''
          this.patientPertinentHistory.pertinent_past_medical_history = ''
        }
      },
      immediate: true
    }
  },
  methods: {
    async createPertinentPastMedicalHistory() {
      let data = {
        patient_no: this.patientData.PATIENTNO[0],
        case_no: this.patientData.CASENO,
        pertinent_past_medical_history: this.patientPertinentHistory.pertinent_past_medical_history
      }
      const result = await this.$store.dispatch('patientsCf4/createPertinentPastMedicalHistory', data)
      result.status === 200 ? (() => { this.submitAlert = true; })() : null
    },
    submitHistory() {
      this.createPertinentPastMedicalHistory();
      setTimeout(() => {
        this.submitAlert = false
        this.close()
        this.$router.go()
      }, 3000)
    },
    editPertinentPastMedicalHistoryDialog(pertinentHistory) {
      console.log('id: ', pertinentHistory.ID)
      this.editPertinentHistoryModal = true
      this.formTitle = 'EDIT PERTINENT PAST MEDICAL HISTORY'

      this.editPertinentPastMedicalHistory = {
        id: pertinentHistory.ID,
        patient_no: pertinentHistory.PATIENTNO,
        case_no: pertinentHistory.CASENO,
        pertinent_past_medical_history: pertinentHistory.PERTINENT_PAST_MEDICAL_HISTORY
      }
    },
    deletePertinentPastMedicalHistoryDialog(pertinentHistory) {
      console.log('id: ', pertinentHistory.ID)
      this.editPertinentHistoryModal = true,
        this.formTitle = 'DELETE PERTINENT PAST MEDICAL HISTORY'

      this.editPertinentPastMedicalHistory = {
        id: pertinentHistory.ID,
        patient_no: pertinentHistory.PATIENTNO,
        case_no: pertinentHistory.CASENO,
        pertinent_past_medical_history: pertinentHistory.PERTINENT_PAST_MEDICAL_HISTORY
      }
    },
    async fetchPatientData() {
      const result = await this.$store.dispatch('patientsCf4/getPatientDetails', this.$route.query.pNo)
      this.patientInfo = this.patientDetails
    },
    closeEditPertinentPastMedicalHistoryDialog() {
      this.editPertinentHistoryModal = false
    },
    close() {
      this.$emit('close')
    }
  }
})
</script>