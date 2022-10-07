<template>
  <EditReasonForAdmissionDialog :eReasonForAdmissionDialog="editReasonForAdmissionDialog" :dTitle="dialogTitle"
    :pInfo="patientDetails" :cf4RForAdmission="cf4ReasonForAdmission" @close="closeEditReasonForAdmissionDialog"
    @hide="closeEditReasonForAdmissionDialog" />
  <q-expansion-item class="bg-amber-3">
    <template v-slot:header>
      <q-item-section avatar>
        <q-avatar icon="personal_injury" color="primary" text-color="white" />
      </q-item-section>

      <q-item-section>
        III. REASON FOR ADMISSION
      </q-item-section>
      <q-btn class="q-mr-sm" outline rounded color="primary" label="UPDATE" size="sm"
        @click="reasonForAdmissionDialog(cf4RFA)" />
    </template>

    <q-card>
      <q-card-section>
        <div class="row">
          <div class="col-md-11">
            <label class="text-weight-bold">1. History of Present Illness</label>
            <q-space />
            <div class="text-uppercase">
              {{ cf4RFA.HISTORY_OF_PRESENT_ILLNESS }}
            </div>
          </div>
          <q-space class="q-pa-md" />
          <div class="col-md-11">
            <label class="text-weight-bold">2. a. Pertinent Past Medical History</label>
            <q-space />
            <div class="text-uppercase">
              {{ cf4RFA.PERTINENT_PAST_MEDICAL_HISTORY }}
            </div>
          </div>
          <q-space class="q-pa-md" />
          <div class="col-md-11">
            <label class="text-weight-bold">2. b. OB/GYN History</label>
            <q-space />
            <div class="text-uppercase">
              G: {{ cf4RFA.OB_G }} P: {{ cf4RFA.OB_P }}
            </div>
          </div>
          <q-space class="q-pa-md" />
          <div class="col-md-11">
            <label class="text-weight-bold">3. Pertinent Signs and Symptoms on Admission (tick applicable
              box/es)</label>
            <q-space />
            <div class="row q-ml-md pssa-mt">
              <div class="col-md-3 q-ml-md">
                <div class="text-caption text-uppercase q-mt-lg">
                  <q-checkbox size="xl" v-model="shape" val="Altered Mental Sensorium"
                    label="Altered Mental Sensorium" />
                </div>
              </div>
              <div class="col-md-2 q-ml-md">
                <div class="text-caption text-uppercase q-mt-lg">
                  <q-checkbox size="xl" v-model="shape" val="Diarrhea" label="Diarrhea" />
                </div>
              </div>
              <div class="col-md-3 q-ml-md">
                <div class="text-caption text-uppercase q-mt-lg">
                  <q-checkbox size="xl" v-model="shape" val="Hematemesis" label="Hematemesis" />
                </div>
              </div>
              <div class="col-md-2 q-ml-md">
                <div class="text-caption text-uppercase q-mt-lg">
                  <q-checkbox size="xl" v-model="shape" val="Palpitations" label="Palpitations" />
                </div>
              </div>
            </div>

            <div class="row q-ml-md pssa-mt">
              <div class="col-md-3 q-ml-md">
                <div class="text-caption text-uppercase q-mt-lg">
                  <q-checkbox size="xl" v-model="shape" val="Abdominal cramp/pain" label="Abdominal cramp/pain" />
                </div>
              </div>
              <div class="col-md-2 q-ml-md">
                <div class="text-caption text-uppercase q-mt-lg">
                  <q-checkbox size="xl" v-model="shape" val="Dizziness" label="Dizziness" />
                </div>
              </div>
              <div class="col-md-3 q-ml-md">
                <div class="text-caption text-uppercase q-mt-lg">
                  <q-checkbox size="xl" v-model="shape" val="Hematuria" label="Hematuria" />
                </div>
              </div>
              <div class="col-md-2 q-ml-md">
                <div class="text-caption text-uppercase q-mt-lg">
                  <q-checkbox size="xl" v-model="shape" val="Seizures" label="Seizures" />
                </div>
              </div>
            </div>

            <div class="row q-ml-md pssa-mt">
              <div class="col-md-3 q-ml-md">
                <div class="text-caption text-uppercase q-mt-lg">
                  <q-checkbox size="xl" v-model="shape" val="Anorexia" label="Anorexia" />
                </div>
              </div>
              <div class="col-md-2 q-ml-md">
                <div class="text-caption text-uppercase q-mt-lg">
                  <q-checkbox size="xl" v-model="shape" val="Dysphagia" label="Dysphagia" />
                </div>
              </div>
              <div class="col-md-3 q-ml-md">
                <div class="text-caption text-uppercase q-mt-lg">
                  <q-checkbox size="xl" v-model="shape" val="Hemoptysis" label="Hemoptysis" />
                </div>
              </div>
              <div class="col-md-2 q-ml-md">
                <div class="text-caption text-uppercase q-mt-lg">
                  <q-checkbox size="xl" v-model="shape" val="Skin rashes" label="Skin rashes" />
                </div>
              </div>
            </div>

            <div class="row q-ml-md pssa-mt">
              <div class="col-md-3 q-ml-md">
                <div class="text-caption text-uppercase q-mt-lg">
                  <q-checkbox size="xl" v-model="shape" val="Bleeding gums" label="Bleeding gums" />
                </div>
              </div>
              <div class="col-md-2 q-ml-md">
                <div class="text-caption text-uppercase q-mt-lg">
                  <q-checkbox size="xl" v-model="shape" val="Dyspnea" label="Dyspnea" />
                </div>
              </div>
              <div class="col-md-3 q-ml-md">
                <div class="text-caption text-uppercase q-mt-lg">
                  <q-checkbox size="xl" v-model="shape" val="Irritability" label="Irritability" />
                </div>
              </div>
              <div class="col-md-3 q-ml-md">
                <div class="text-caption text-uppercase q-mt-lg">
                  <q-checkbox size="xl" v-model="shape" val="Stool, bloody/black tarry/mucoid"
                    label="Stool, bloody/black tarry/mucoid" />
                </div>
              </div>
            </div>

            <div class="row q-ml-md pssa-mt">
              <div class="col-md-3 q-ml-md">
                <div class="text-caption text-uppercase q-mt-lg">
                  <q-checkbox size="xl" v-model="shape" val="Body weakness" label="Body weakness" />
                </div>
              </div>
              <div class="col-md-2 q-ml-md">
                <div class="text-caption text-uppercase q-mt-lg">
                  <q-checkbox size="xl" v-model="shape" val="Dysuria" label="Dysuria" />
                </div>
              </div>
              <div class="col-md-3 q-ml-md">
                <div class="text-caption text-uppercase q-mt-lg">
                  <q-checkbox size="xl" v-model="shape" val="Jaundice" label="Jaundice" />
                </div>
              </div>
              <div class="col-md-2 q-ml-md">
                <div class="text-caption text-uppercase q-mt-lg">
                  <q-checkbox size="xl" v-model="shape" val="Sweating" label="Sweating" />
                </div>
              </div>
            </div>

            <div class="row q-ml-md pssa-mt">
              <div class="col-md-3 q-ml-md">
                <div class="text-caption text-uppercase q-mt-lg">
                  <q-checkbox size="xl" v-model="shape" val="Blurring of vision" label="Blurring of vision" />
                </div>
              </div>
              <div class="col-md-2 q-ml-md">
                <div class="text-caption text-uppercase q-mt-lg">
                  <q-checkbox size="xl" v-model="shape" val="Epistaxis" label="Epistaxis " />
                </div>
              </div>
              <div class="col-md-3 q-ml-md">
                <div class="text-caption text-uppercase q-mt-lg">
                  <q-checkbox size="xl" v-model="shape" val="Lower extrem1ty edema" label="Lower extrem1ty edema" />
                </div>
              </div>
              <div class="col-md-2 q-ml-md">
                <div class="text-caption text-uppercase q-mt-lg">
                  <q-checkbox size="xl" v-model="shape" val="Urgency" label="Urgency" />
                </div>
              </div>
            </div>

            <div class="row q-ml-md pssa-mt">
              <div class="col-md-3 q-ml-md">
                <div class="text-caption text-uppercase q-mt-lg">
                  <q-checkbox size="xl" v-model="shape" val="Chest pain/discomfort" label="Chest pain/discomfort" />
                </div>
              </div>
              <div class="col-md-2 q-ml-md">
                <div class="text-caption text-uppercase q-mt-lg">
                  <q-checkbox size="xl" v-model="shape" val="Fever" label="Fever" />
                </div>
              </div>
              <div class="col-md-3 q-ml-md">
                <div class="text-caption text-uppercase q-mt-lg">
                  <q-checkbox size="xl" v-model="shape" val="Myalgia" label="Myalgia" />
                </div>
              </div>
              <div class="col-md-2 q-ml-md">
                <div class="text-caption text-uppercase q-mt-lg">
                  <q-checkbox size="xl" v-model="shape" val="Vomiting" label="Vomiting" />
                </div>
              </div>
            </div>

            <div class="row q-ml-md pssa-mt">
              <div class="col-md-3 q-ml-md">
                <div class="text-caption text-uppercase q-mt-lg">
                  <q-checkbox size="xl" v-model="shape" val="Constipation" label="Constipation " />
                </div>
              </div>
              <div class="col-md-2 q-ml-md">
                <div class="text-caption text-uppercase q-mt-lg">
                  <q-checkbox size="xl" v-model="shape" val="Frequency of urination" label="Frequency of urination" />
                </div>
              </div>
              <div class="col-md-3 q-ml-md">
                <div class="text-caption text-uppercase q-mt-lg">
                  <q-checkbox size="xl" v-model="shape" val="Orthopnea" label="Orthopnea" />
                </div>
              </div>
              <div class="col-md-2 q-ml-md">
                <div class="text-caption text-uppercase q-mt-lg">
                  <q-checkbox size="xl" v-model="shape" val="Weight loss" label="Weight loss" />
                </div>
              </div>
            </div>

            <div class="row q-ml-md pssa-mt">
              <div class="col-md-3 q-ml-md">
                <div class="text-caption text-uppercase q-mt-lg">
                  <q-checkbox size="xl" v-model="shape" val="Cough" label="Cough" />
                </div>
              </div>
              <div class="col-md-2 q-ml-md">
                <div class="text-caption text-uppercase q-mt-lg">
                  <q-checkbox size="xl" v-model="shape" val="Headache" label="Headache" />
                </div>
              </div>
              <div class="col-md-3 q-ml-md">
                <div class="text-caption text-uppercase q-mt-lg">
                  <q-checkbox size="xl" v-model="shape" val="Pain" label="Pain" />
                </div>
              </div>
              <div class="col-md-2 q-ml-md">
                <div class="text-caption text-uppercase q-mt-lg">
                  <q-checkbox size="xl" v-model="shape" val="Weight los" label="Weight los" />
                </div>
              </div>
            </div>
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
import EditReasonForAdmissionDialog from 'components/EditReasonForAdmissionDialog.vue'

export default defineComponent({
  name: 'ReasonForAdmission',
  components: {
    EditReasonForAdmissionDialog
  },
  setup() {
    return {
      shape: ref(['line'])
    }
  },
  data() {
    return {
      moment,
      dialogTitle: '',
      editReasonForAdmissionDialog: false,
      cf4ReasonForAdmission: {
        id: '',
        patient_no: '',
        case_no: '',
        history_of_present_illness: '',
        pertinent_past_medical_history: '',
        ob_g: '',
        ob_p: '',
        ob_1: '',
        ob_2: '',
        ob_3: '',
        ob_4: '',
        lmp: '',
        ob_na: '',
        pertinent_signs_and_symptoms: [],
        pain: '',
        pain_site: '',
        psas_other: '',
        psas_other_desc: '',
        referred_to_another_hci: '',
        rhci_yes: '',
        rhci_no: '',
        specify_reason: '',
        originating_hci: '',
        general_survey: '',
        awake_and_alert: '',
        altered_sensorium: '',
        aletered_sensorium_data: '',
        p_height: '',
        p_weight: '',
        vital_sign_bp: '',
        vital_sign_hr: '',
        vital_sign_rr: '',
        vital_sign_temp: '',
        heent: '',
        heent_others: '',
        chest_lungs: '',
        chest_lungs_others: '',
        cvs: '',
        cvs_others: '',
        abdomen: '',
        abdomen_others: '',
        gu: [],
        gu_others: '',
        skin: [],
        skin_others: '',
        neuro_exam: [],
        neuro_exam_others: '',
        outcome_of_treatment: '',
        outcome_reason: '',
      }
    }
  },
  created() {
    // this.fetchPatientData()/
    this.getCf4ReasonForAdmission()
  },
  computed: {
    ...mapGetters({
      patientDetails: 'patientsCf4/patientDetails',
      cf4RFA: 'patientsCf4/cf4ReasonForAdmission',
    })
  },
  methods: {
    async fetchPatientData() {
      const result = await this.$store.dispatch('patientsCf4/getPatientDetails', this.$route.query.pNo)
    },
    async getCf4ReasonForAdmission() {
      await this.$store.dispatch('patientsCf4/getCf4ReasonForAdmission', this.$route.query.pNo)
    },
    reasonForAdmissionDialog(data) {
      console.log('data PID: ', data.PATIENT_NO)
      this.dialogTitle = 'EDIT REASON FOR ADMISSION'
      this.editReasonForAdmissionDialog = true
      this.cf4ReasonForAdmission = {
        id: data.ID,
        patient_no: data.PATIENT_NO,
        case_no: data.CASE_NO,
        history_of_present_illness: data.HISTORY_OF_PRESENT_ILLNESS,
        pertinent_past_medical_history: data.PERTINENT_PAST_MEDICAL_HISTORY,
        ob_g: data.OB_G,
        ob_p: data.OB_P,
        ob_1: data.OB_1,
        ob_2: data.OB_2,
        ob_3: data.OB_3,
        ob_4: data.OB_4,
        lmp: data.LMP,
        ob_na: data.OB_NA,
        pertinent_signs_and_symptoms: data.PERTINENT_SIGNS_AND_SYMPTOMS,
        pain: data.PAIN,
        pain_site: data.PAIN_SITE,
        psas_other: data.PSAS_OTHER,
        psas_other_desc: data.PSAS_OTHER_DESC,
        referred_to_another_hci: data.REFERRED_TO_ANOTHER_HCI,
        rhci_yes: data.RHCI_YES,
        rhci_no: data.RHCI_NO,
        specify_reason: data.SPECIFY_REASON,
        originating_hci: data.ORIGINATING_HCI,
        general_survey: data.GENERAL_SURVEY,
        awake_and_alert: data.AWAKE_AND_ALERT,
        altered_sensorium: data.ALTERED_SENSORIUM,
        altered_sensorium_data: data.ALTERED_SENSORIUM_DATA,
        p_height: data.P_HEIGHT,
        p_weight: data.P_WEIGHT,
        vital_sign_bp: data.VITAL_SIGN_BP,
        vital_sign_hr: data.VITAL_SIGN_HR,
        vital_sign_rr: data.VITAL_SIGN_RR,
        vital_sign_temp: data.VITAL_SIGN_TEMP,
        heent: data.HEENT,
        heent_others: data.HEENT_OTHERS,
        chest_lungs: data.CHEST_LUNGS,
        chest_lungs_others: data.CHEST_LUNGS_OTHERS,
        cvs: data.CVS,
        cvs_others: data.CVS_OTHERS,
        abdomen: data.ABDOMEN,
        abdomen_others: data.ABDOMEN_OTHERS,
        gu: data.GU,
        gu_others: data.GU_OTHERS,
        skin: data.SKIN,
        skin_others: data.SKIN_OTHERS,
        neuro_exam: data.NEURO_EXAM,
        neuro_exam_others: data.NEURO_EXAM_OTHERS,
        outcome_of_treatment: data.OUTCOME_OF_TREATMENT,
        outcome_reason: data.OUTCOME_REASON,
        cf4_status: 'UPDATED'
      }
    },
    closeEditReasonForAdmissionDialog() {
      this.editReasonForAdmissionDialog = false
    }
  }
})
</script>
<style scoped>
.pssa-mt {
  margin-top: -22px;
  /* display: block; */
  margin-left: auto;
  margin-right: auto;
  width: 80%;
}
</style>