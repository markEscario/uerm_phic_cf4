<template>
  <EditHistoryOfPresentIllnessDialog :EditHistoryModal="editHistoryModal" :fTitle="formTitle" :PtInfo="patientInfo"
    :pHistory="patientHistory" :editPHistory="editPatientHistory" @close="closeEditPatientHistoryDialog"
    @hide="closeEditPatientHistoryDialog" />
  <q-dialog v-if="hModal" :model-value="true">
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
        <div class="text-caption text-weight-bold text-uppercase">ADD PATIENT'S {{ hTitle }}</div>
      </q-card-section>
      <q-form @submit="submitHistory" class="q-gutter-md" ref="form">
        <div class="row" style="max-width: 1800px">
          <div class="col-md-12 q-ml-md">
            <q-input class="text-uppercase" outlined v-model="patientHistory.history_of_present_illness" autogrow
              hint="HISTORY OF RPRESENT ILLNESS" lazy-rules
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

      <!-- <q-space class="q-mb-sm" />
      <q-separator class="q-ml-md q-mr-md" />
      <q-space class="q-mb-md" /> -->

      <div class="row" style="max-width: 1820px">
        <div class="col-md-12 q-ml-md">
          <q-banner dense inline-actions class="text-white bg-primary">
            <label class="text-caption">
              HISTORY OF PRESENT ILLNESS
            </label>

          </q-banner>
        </div>
        <q-space class="q-mb-md" />
        <div v-for="hist in Histories" :key="hist" class="col-md-12 q-ml-md">
          <q-list class="q-mb-sm" bordered separator>
            <q-item>
              <q-item-section class="text-uppercase">{{ hist.HISTORY_OF_PRESENT_ILLNESS }}</q-item-section>
              <q-btn round color="primary" icon="edit" @click="editPatientHistoryDialog(hist)" class="q-mr-sm" />
              <q-btn round color="red" icon="delete" @click="deletePatientHistoryDialog(hist)" />
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
import EditHistoryOfPresentIllnessDialog from 'components/EditHistoryOfPresentIllnessDialog.vue'

export default defineComponent({
  name: 'HistoryOfPresentIllness',
  components: {
    EditHistoryOfPresentIllnessDialog
  },
  props: ['hModal', 'vData', 'AdData', 'hTitle', 'Histories'],
  data() {
    return {
      patientAdData: {},
      patientInfo: {},
      formTitle: '',
      editHistoryModal: false,
      submitAlert: false,
      patientHistory: {
        patient_no: '',
        case_no: '',
        history_of_present_illness: ''
      },
      editPatientHistory: {
        id: '',
        patient_no: '',
        case_no: '',
        history_of_present_illness: ''
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
      patientDetails: 'patientsCf4/patientDetails',
      searchedPatients: 'patientsCf4/searchedPatients',
    })
  },
  watch: {
    pHistory: {
      handler(val) {
        if (val) {
          this.patientHistory.patient_no = val.patient_no
          this.patientHistory.case_no = val.case_no
          this.patientHistory.history_of_present_illness = val.history_of_present_illness
        } else {
          this.patientHistory.patient_no = ''
          this.patientHistory.case_no = ''
          this.patientHistory.history_of_present_illness = ''
        }
      },
      immediate: true
    }
  },
  methods: {
    async createHistoryOfPresentIllness() {
      let data = {
        patient_no: this.AdData.PATIENTNO[0],
        case_no: this.AdData.CASENO,
        history_of_present_illness: this.patientHistory.history_of_present_illness
      }
      const result = await this.$store.dispatch('patientsCf4/createHistoryOfPresentIllness', data)
      result.status === 200 ? (() => { this.submitAlert = true; })() : null
    },
    submitHistory() {
      // this.title === 'Assign Project' ? this.saveProject() : this.title === 'Edit Project' ? this.saveEditProject() : this.deleteProject()
      this.createHistoryOfPresentIllness();
      setTimeout(() => {
        this.submitAlert = false
        this.close()
        this.$router.go()
      }, 3000)
    },
    editPatientHistoryDialog(history) {
      console.log('id: ', history.ID)
      this.editHistoryModal = true
      this.formTitle = 'EDIT HISTORY OF PRESENT ILLNESS'

      this.editPatientHistory = {
        id: history.ID,
        patient_no: history.PATIENTNO,
        case_no: history.CASENO,
        history_of_present_illness: history.HISTORY_OF_PRESENT_ILLNESS
      }
    },
    deletePatientHistoryDialog(history) {
      console.log('id: ', history.ID)
      this.editHistoryModal = true,
        this.formTitle = 'DELETE HISTORY OF PRESENT ILLNESS'

      this.editPatientHistory = {
        id: history.ID,
        patient_no: history.PATIENTNO,
        case_no: history.CASENO,
        history_of_present_illness: history.HISTORY_OF_PRESENT_ILLNESS
      }
    },
    async fetchPatientData() {
      const result = await this.$store.dispatch('patientsCf4/getPatientDetails', this.$route.query.pNo)
      this.patientInfo = this.patientDetails
    },
    closeEditPatientHistoryDialog() {
      this.editHistoryModal = false
    },
    close() {
      this.$emit('close')
    }
  }
})
</script>