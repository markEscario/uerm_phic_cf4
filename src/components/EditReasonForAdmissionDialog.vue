<template>
  <q-dialog v-if="eReasonForAdmissionDialog" :model-value="true">
    <q-card style="width: 1980px; max-width: 180vw;">
      <q-card-section>
        <q-banner dense inline-actions class="text-white bg-primary q-mb-sm">
          <label class="text-caption">
            {{ pInfo.LASTNAME }}, {{ pInfo.FIRSTNAME }} {{ pInfo.MIDDLENAME }} - {{ pInfo.PATIENTNO[0] }}
          </label>
        </q-banner>

        <q-banner v-if="submitAlert" dense inline-actions class="text-white bg-green-3">
          <label class="text-caption">
            <q-spinner-hourglass color="primary" size="2em" />
            {{ updateReasonForAdmissionMsg }}
          </label>
        </q-banner>

        <q-space class="q-mb-sm" />
        <div class="text-caption text-weight-bold text-uppercase">{{ dTitle }}</div>
      </q-card-section>
      <q-form @submit="submitUpdateCf4ReasonForAdmission" class="q-gutter-md" ref="form">
        <div class="row" style="max-width: 1800px">
          <div class="col-md-12 q-ml-md">
            <q-input class="text-uppercase" outlined v-model="cf4ReasonForAdmission.history_of_present_illness" autogrow
              hint="HISTORY OF PRESENT ILLNESS" lazy-rules
              :rules="[val => val && val.length > 0 || 'This is required']" />
          </div>
          <q-space class="q-mb-md" />
          <div class="col-md-12 q-ml-md">
            <q-input class="text-uppercase" outlined v-model="cf4ReasonForAdmission.pertinent_past_medical_history"
              autogrow hint="PERTINENT PAST MEDICAL HISTORY" lazy-rules
              :rules="[val => val && val.length > 0 || 'This is required']" />
          </div>

          <div class="col-md-2 q-ml-md">
            <div class="text-caption text-weight-bold text-uppercase q-mt-lg">OB / GYN HISTORY</div>
          </div>
        </div>

        <div class="row q-ml-md q-mt-xs">
          <div class="col-md-2 q-ml-md">
            <q-input v-model="text" hint="G" />
          </div>
          <div class="col-md-2 q-ml-md">
            <q-input v-model="text" hint="P" />
          </div>
        </div>
        <div class="row q-ml-md q-mt-xs">
          <div class="col-md-2 q-ml-md">
            <q-input v-model="text" hint="1" />
          </div>
          <div class="col-md-2 q-ml-md">
            <q-input v-model="text" hint="2" />
          </div>
          <div class="col-md-2 q-ml-md">
            <q-input v-model="text" hint="3" />
          </div>
          <div class="col-md-2 q-ml-md">
            <q-input v-model="text" hint="4" />
          </div>
        </div>
        <div class="row q-ml-md q-mt-xs">
          <div class="col-md-2 q-ml-md">
            <q-input outlined v-model="text" hint="LMP" />
          </div>
          <div class="col-md-2 q-ml-md">
            <q-checkbox size="xl" v-model="val" label="NA" />
          </div>
        </div>

        <div class="row q-ml-md q-mt-xs">
          <div class="col-md-4 q-ml-md">
            <div class="text-caption text-weight-bold text-uppercase q-mt-lg">PERTINENT SIGNS AND SYMPTOMS ON ADMISSION
              (tick applicable box/es):</div>
          </div>
        </div>

        <div class="row q-ml-md pssa-cb">
          <div class="col-md-6 q-ml-md">
            <div class="text-caption text-weight-bold text-uppercase q-mt-lg">
              <q-select filled v-model="multiple" multiple :options="options" label="SELECT" style="width: 850px" />
            </div>
          </div>
        </div>

        <div class="row q-ml-md q-mt-xs">
          <div class="col-md-6 q-ml-md">
            <div class="text-caption text-weight-bold text-uppercase q-mt-lg">4. Referred from another health care
              institution (HCI):</div>
            <div class="col-md-4 q-ml-md">
              <q-checkbox size="xl" v-model="no_rhci" label="No" />
              <q-checkbox size="xl" v-model="yes_rhci" label="Yes (Specify the Reason)" />
            </div>
          </div>
        </div>

        <div class="row q-ml-md q-mt-xs">
          <div class="col-md-4 q-ml-md">
            <q-input v-model="cf4ReasonForAdmission.specify_reason" hint="Reason" />
            <q-input v-model="cf4ReasonForAdmission.originating_hci" hint="Name of Orginating HCI" />
          </div>
        </div>


        <q-space />
        <div class="row q-pa-md">
          <q-btn class="q-mr-md" label="Update" type="submit" color="primary" />
        </div>
      </q-form>
      <q-card-actions align="right" class="bg-white text-teal">
        <q-btn flat label="Close" @click="close" v-close-popup />
      </q-card-actions>

      <q-space class="q-mb-sm" />
      <q-space class="q-mb-xl" />
    </q-card>
  </q-dialog>
</template>
<script>
import { defineComponent, ref } from 'vue'
import CONSTANTS from '../constants'

export default defineComponent({
  name: 'EditReasonForAdmissionDialog',
  props: ['eReasonForAdmissionDialog', 'pInfo', 'cf4RforAdmission', 'dTitle'],
  setup() {
    return {
      val: ref(false),
      no_rhci: ref(false),
      yes_rhci: ref(false),
      multiple: ref(null)
    }
  },
  data() {
    return {
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
        specify_reason: '',
        originating_hci: '',
        general_survey: '',
        p_height: '',
        p_weight: '',
        vital_sign_bp: '',
        vital_sign_hr: '',
        vital_sign_rr: '',
        vital_sign_temp: '',
        outcome_of_treatment: '',
        outcome_reason: '',
        cf4_status: ''
      },
      submitAlert: false,
      updatePatientDataMsg: CONSTANTS.FORM_UPDATE_PATIENT_DATA_MESSAGE,
      updateReasonForAdmissionMsg: CONSTANTS.FORM_UPDATE_REASON_FOR_ADMISSION_MESSAGE,
      options: [
        'Altered mental sensorium',
        'Diarrhea',
        'Hematemesis',
        'Palpitations',
        'Abdominal cramp/pain',
        'Dizziness',
        'Hematuria',
        'Seizures ',
        'Anorexia',
        'Dysphagia',
        'Hemoptysis',
        'Skin rashes',
        'Bleeding gums',
        'Dyspnea',
        'Irritability',
        'Stool, bloody/black tarry/mucoid',
        'Body weakness',
        'Dysuria',
        'Jaundice',
        'Sweating',
        'Blurring of vision',
        'Epistaxis',
        'Lower extrem1ty edema',
        'Urgency',
        'Chest pain/discomfort',
        'Fever',
        'Myalgia',
        'Vomiting',
        'Constipation',
        'Frequency of urination',
        'Orthopnea',
        'Weight loss',
        'Cough',
        'Headache',
        'Pain',
        'Others'
      ]
    }
  },
  watch: {
    cf4RforAdmission: {
      handler(val) {
        if (val) {
          this.cf4ReasonForAdmission.id = val.id
          this.cf4ReasonForAdmission.patient_no = val.patient_no
          this.cf4ReasonForAdmission.case_no = val.case_no
          this.cf4ReasonForAdmission.history_of_present_illness = val.history_of_present_illness
          this.cf4ReasonForAdmission.pertinent_past_medical_history = val.pertinent_past_medical_history
          this.cf4ReasonForAdmission.ob_g = val.ob_g
          this.cf4ReasonForAdmission.ob_p = val.ob_p
          this.cf4ReasonForAdmission.ob_1 = val.ob_1
          this.cf4ReasonForAdmission.ob_2 = val.ob_2
          this.cf4ReasonForAdmission.ob_3 = val.ob_3
          this.cf4ReasonForAdmission.ob_4 = val.ob_4
          this.cf4ReasonForAdmission.lmp = val.lmp
          this.cf4ReasonForAdmission.ob_na = val.ob_na
          this.cf4ReasonForAdmission.pertinent_signs_and_symptoms = val.pertinent_signs_and_symptoms
          this.cf4ReasonForAdmission.pain = val.pain
          this.cf4ReasonForAdmission.pain_site = val.pain_site
          this.cf4ReasonForAdmission.psas_other = val.psas_other
          this.cf4ReasonForAdmission.psas_other_desc = val.psas_other_desc
          this.cf4ReasonForAdmission.referred_to_another_hci = val.referred_to_another_hci
          this.cf4ReasonForAdmission.specify_reason = val.specify_reason
          this.cf4ReasonForAdmission.originating_hci = val.originating_hci
          this.cf4ReasonForAdmission.general_survey = val.general_survey
          this.cf4ReasonForAdmission.p_height = val.p_height
          this.cf4ReasonForAdmission.p_weight = val.p_weight
          this.cf4ReasonForAdmission.vital_sign_bp = val.vital_sign_bp
          this.cf4ReasonForAdmission.vital_sign_hr = val.vital_sign_hr
          this.cf4ReasonForAdmission.vital_sign_rr = val.vital_sign_rr
          this.cf4ReasonForAdmission.vital_sign_temp = val.vital_sign_temp
          this.cf4ReasonForAdmission.outcome_of_treatment = val.outcome_of_treatment
          this.cf4ReasonForAdmission.outcome_reason = val.outcome_reason
          this.cf4ReasonForAdmission.cf4_status = val.cf4_status
        } else {
          this.cf4ReasonForAdmission.id = ''
          this.cf4ReasonForAdmission.patient_no = ''
          this.cf4ReasonForAdmission.case_no = ''
          this.cf4ReasonForAdmission.history_of_present_illness = ''
          this.cf4ReasonForAdmission.pertinent_past_medical_history = ''
          this.cf4ReasonForAdmission.ob_g = ''
          this.cf4ReasonForAdmission.ob_p = ''
          this.cf4ReasonForAdmission.ob_1 = ''
          this.cf4ReasonForAdmission.ob_2 = ''
          this.cf4ReasonForAdmission.ob_3 = ''
          this.cf4ReasonForAdmission.ob_4 = ''
          this.cf4ReasonForAdmission.lmp = ''
          this.cf4ReasonForAdmission.ob_na = ''
          this.cf4ReasonForAdmission.pertinent_signs_and_symptoms = ''
          this.cf4ReasonForAdmission.pain = ''
          this.cf4ReasonForAdmission.pain_site = ''
          this.cf4ReasonForAdmission.psas_other = ''
          this.cf4ReasonForAdmission.psas_other_desc = ''
          this.cf4ReasonForAdmission.referred_to_another_hci = ''
          this.cf4ReasonForAdmission.specify_reason = ''
          this.cf4ReasonForAdmission.originating_hci = ''
          this.cf4ReasonForAdmission.general_survey = ''
          this.cf4ReasonForAdmission.p_height = ''
          this.cf4ReasonForAdmission.p_weight = ''
          this.cf4ReasonForAdmission.vital_sign_bp = ''
          this.cf4ReasonForAdmission.vital_sign_hr = ''
          this.cf4ReasonForAdmission.vital_sign_rr = ''
          this.cf4ReasonForAdmission.vital_sign_temp = ''
          this.cf4ReasonForAdmission.outcome_of_treatment = ''
          this.cf4ReasonForAdmission.outcome_reason = ''
          this.cf4ReasonForAdmission.cf4_status = ''
        }
      },
      immediate: true
    }
  },
  methods: {
    async updateCf4ReasonForAdmission() {
      let data = {
        id: this.cf4ReasonForAdmission.id,
        patient_no: this.cf4ReasonForAdmission.patient_no,
        case_no: this.cf4ReasonForAdmission.case_no,
        history_of_present_illness: this.cf4ReasonForAdmission.history_of_present_illness,
        pertinent_past_medical_history: this.cf4ReasonForAdmission.pertinent_past_medical_history,
        ob_g: this.cf4ReasonForAdmission.ob_g,
        ob_p: this.cf4ReasonForAdmission.ob_p,
        ob_1: this.cf4ReasonForAdmission.ob_1,
        ob_2: this.cf4ReasonForAdmission.ob_2,
        ob_3: this.cf4ReasonForAdmission.ob_3,
        ob_4: this.cf4ReasonForAdmission.ob_4,
        lmp: this.cf4ReasonForAdmission.lmp,
        ob_na: this.cf4ReasonForAdmission.ob_na,
        ob_na: this.cf4ReasonForAdmission.ob_na,
        pertinent_signs_and_symptoms: this.multiple,
        pain: this.cf4ReasonForAdmission.pain,
        pain_site: this.cf4ReasonForAdmission.pain_site,
        psas_other: this.cf4ReasonForAdmission.psas_other_desc,
        referred_to_another_hci: this.cf4ReasonForAdmission.referred_to_another_hci,
        specify_reason: this.cf4ReasonForAdmission.specify_reason,
        originating_hci: this.cf4ReasonForAdmission.originating_hci,
        general_survey: this.cf4ReasonForAdmission.general_survey,
        p_height: this.cf4ReasonForAdmission.p_height,
        p_weight: this.cf4ReasonForAdmission.p_weight,
        vital_sign_bp: this.cf4ReasonForAdmission.vital_sign_bp,
        vital_sign_hr: this.cf4ReasonForAdmission.vital_sign_hr,
        vital_sign_rr: this.cf4ReasonForAdmission.vital_sign_rr,
        vital_sign_temp: this.cf4ReasonForAdmission.vital_sign_temp,
        outcome_of_treatment: this.cf4ReasonForAdmission.outcome_of_treatment,
        outcome_reason: this.cf4ReasonForAdmission.outcome_reason,
        cf4_status: this.cf4ReasonForAdmission.cf4_status,
      }
      console.log('per: ', data.pertinent_signs_and_symptoms)
      const result = await this.$store.dispatch('patientsCf4/updateCf4ReasonForAdmission', data)
      result.status === 200 ? (() => { this.submitAlert = true; })() : null
    },
    submitUpdateCf4ReasonForAdmission() {
      this.updateCf4ReasonForAdmission()
      setTimeout(() => {
        this.submitAlert = false
        this.close()
        // this.$router.go()
      }, 3000)
    },
    close() {
      this.$emit('close')
    }
  }

})
</script>
<style scoped>
.pssa-cb {
  margin-top: -20px;
}
</style>