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
              label="HISTORY OF PRESENT ILLNESS" lazy-rules
              :rules="[val => val && val.length > 0 || 'This is required']" />
          </div>
          <q-space class="q-mb-md" />
          <div class="col-md-12 q-ml-md">
            <q-input class="text-uppercase" outlined v-model="cf4ReasonForAdmission.pertinent_past_medical_history"
              autogrow label="PERTINENT PAST MEDICAL HISTORY" lazy-rules
              :rules="[val => val && val.length > 0 || 'This is required']" />
          </div>

          <div class="col-md-2 q-ml-md">
            <div class="text-caption text-weight-bold text-uppercase q-mt-lg">OB / GYN HISTORY</div>
          </div>
        </div>

        <div class="row q-ml-md q-mt-xs">
          <div class="col-md-2 q-ml-md">
            <q-input v-model="cf4ReasonForAdmission.ob_g" hint="G" />
          </div>
          <div class="col-md-2 q-ml-md">
            <q-input v-model="cf4ReasonForAdmission.ob_p" hint="P" />
          </div>
        </div>
        <div class="row q-ml-md q-mt-xs">
          <div class="col-md-2 q-ml-md">
            <q-input v-model="cf4ReasonForAdmission.ob_1" hint="1" />
          </div>
          <div class="col-md-2 q-ml-md">
            <q-input v-model="cf4ReasonForAdmission.ob_2" hint="2" />
          </div>
          <div class="col-md-2 q-ml-md">
            <q-input v-model="cf4ReasonForAdmission.ob_3" hint="3" />
          </div>
          <div class="col-md-2 q-ml-md">
            <q-input v-model="cf4ReasonForAdmission.ob_4" hint="4" />
          </div>
        </div>
        <div class="row q-ml-md q-mt-xs">
          <div class="col-md-2 q-ml-md">
            <q-input outlined v-model="cf4ReasonForAdmission.lmp" hint="LMP" />
          </div>
          <div class="col-md-2 q-ml-md">
            <q-checkbox size="xl" v-model="cf4ReasonForAdmission.ob_na" label="NA" />
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
              <q-select filled v-model="cf4ReasonForAdmission.pertinent_signs_and_symptoms" multiple :options="psas"
                label="SELECT" style="width: 850px" />
            </div>
          </div>
        </div>

        <div class="row q-ml-md q-mt-xs">
          <div class="col-md-6 q-ml-md">
            <div class="text-caption text-weight-bold text-uppercase q-mt-lg">4. Referred from another health care
              institution (HCI):</div>
            <div class="col-md-4 q-ml-md">
              <q-checkbox size="xl" v-model="cf4ReasonForAdmission.rhci_no" label="No" />
              <q-checkbox size="xl" v-model="cf4ReasonForAdmission.rhci_yes" label="Yes (Specify the Reason)" />
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
        <div class="row q-ml-md q-mt-xs">
          <div class="col-md-6 q-ml-md text-weight-bold">
            S. Physical Examination on Admission (Pertinent Findings per System)
          </div>
        </div>

        <div class="row q-ml-md q-mt-xs">
          <div class="col-md-3 q-ml-md">
            General Survey
            <q-checkbox size="xl" v-model="cf4ReasonForAdmission.awake_and_alert" /> Awake and Alert
            <q-checkbox size="xl" v-model="cf4ReasonForAdmission.altered_sensorium" /> Altered Sensorium
          </div>
          <div class="col-md-2 q-ml-md">
            <q-input v-model="cf4ReasonForAdmission.altered_sensorium_data" />
          </div>
          <div class="col-md-2 q-ml-md">
            <q-input v-model="cf4ReasonForAdmission.p_height" label="Height" />
          </div>
          <div class="col-md-2 q-ml-md">
            <q-input v-model="cf4ReasonForAdmission.p_weight" label="Weight" />
          </div>
        </div>

        <div class="row q-ml-md q-mt-xs">
          <div class="col-md-2 q-ml-md">
            Vital Sign
          </div>
        </div>

        <div class="row q-ml-md q-mt-xs">
          <div class="col-md-2 q-ml-md">
            <q-input v-model="cf4ReasonForAdmission.vital_sign_bp" label="BP" />
          </div>
          <div class="col-md-2 q-ml-md">
            <q-input v-model="cf4ReasonForAdmission.vital_sign_hr" label="HR" />
          </div>
          <div class="col-md-2 q-ml-md">
            <q-input v-model="cf4ReasonForAdmission.vital_sign_rr" label="RR" />
          </div>
          <div class="col-md-2 q-ml-md">
            <q-input v-model="cf4ReasonForAdmission.vital_sign_temp" label="TEMP" />
          </div>
        </div>

        <q-space class="q-mb-lg" />

        <div class="row q-ml-md pssa-cb">
          <div class="col-md-6 q-ml-md">
            <div class="text-caption text-weight-bold text-uppercase q-mt-lg">
              <q-select filled v-model="cf4ReasonForAdmission.heent" multiple :options="heents" label="HEENT"
                style="width: 850px" />
            </div>
          </div>
          <div class="col-md-2 q-ml-md">
            <q-input v-model="cf4ReasonForAdmission.heent_others" label="Others" />
          </div>
        </div>

        <q-space class="q-mb-lg" />

        <div class="row q-ml-md q-mt-xs">
          <div class="col-md-8 q-ml-md text-weight-bold">
            5. Physical Examination continued (Pertinent Findings per System)
          </div>
        </div>

        <q-space class="q-mb-md" />

        <div class="row q-ml-md pssa-cb">
          <div class="col-md-6 q-ml-md">
            <div class="text-caption text-weight-bold text-uppercase q-mt-lg">
              <q-select filled v-model="cf4ReasonForAdmission.chest_lungs" multiple :options="chest"
                label="CHEST / LUNGS" style="width: 850px" />
            </div>
          </div>
          <div class="col-md-2 q-ml-md">
            <q-input v-model="cf4ReasonForAdmission.chest_lungs_others" label="Others" />
          </div>
        </div>

        <q-space class="q-mb-lg" />

        <div class="row q-ml-md pssa-cb">
          <div class="col-md-6 q-ml-md">
            <div class="text-caption text-weight-bold text-uppercase q-mt-lg">
              <q-select filled v-model="cf4ReasonForAdmission.cvs" multiple :options="cvs" label="CVS"
                style="width: 850px" />
            </div>
          </div>
          <div class="col-md-2 q-ml-md">
            <q-input v-model="cf4ReasonForAdmission.cvs_others" label="Others" />
          </div>
        </div>

        <q-space class="q-mb-lg" />

        <div class="row q-ml-md pssa-cb">
          <div class="col-md-6 q-ml-md">
            <div class="text-caption text-weight-bold text-uppercase q-mt-lg">
              <q-select filled v-model="cf4ReasonForAdmission.abdomen" multiple :options="abdomen" label="ABDOMEN"
                style="width: 850px" />
            </div>
          </div>
          <div class="col-md-2 q-ml-md">
            <q-input v-model="cf4ReasonForAdmission.abdomen_others" label="Others" />
          </div>
        </div>

        <q-space class="q-mb-lg" />

        <div class="row q-ml-md pssa-cb">
          <div class="col-md-6 q-ml-md">
            <div class="text-caption text-weight-bold text-uppercase q-mt-lg">
              <q-select filled v-model="cf4ReasonForAdmission.gu" multiple :options="gu" label="GU (IE)"
                style="width: 850px" />
            </div>
          </div>
          <div class="col-md-2 q-ml-md">
            <q-input v-model="cf4ReasonForAdmission.gu_others" label="Others" />
          </div>
        </div>

        <q-space class="q-mb-lg" />

        <div class="row q-ml-md pssa-cb">
          <div class="col-md-6 q-ml-md">
            <div class="text-caption text-weight-bold text-uppercase q-mt-lg">
              <q-select filled v-model="cf4ReasonForAdmission.skin" multiple :options="skin" label="SKIN / EXTREMITIES"
                style="width: 850px" />
            </div>
          </div>
          <div class="col-md-2 q-ml-md">
            <q-input v-model="cf4ReasonForAdmission.skin_others" label="Others" />
          </div>
        </div>

        <q-space class="q-mb-lg" />

        <div class="row q-ml-md pssa-cb">
          <div class="col-md-6 q-ml-md">
            <div class="text-caption text-weight-bold text-uppercase q-mt-lg">
              <q-select filled v-model="cf4ReasonForAdmission.neuro_exam" multiple :options="neuro_exam"
                label="NEURO / EXAM" style="width: 850px" />
            </div>
          </div>
          <div class="col-md-2 q-ml-md">
            <q-input v-model="cf4ReasonForAdmission.neuro_exam_others" label="Others" />
          </div>
        </div>

        <q-space class="q-mb-lg" />
        <div class="row q-pa-md">
          <q-btn class="q-mr-md" label="Update" type="submit" color="primary" />
          <q-btn label="Close" @click="close" color="grey" v-close-popup />
        </div>
      </q-form>
      <q-space class="q-mb-xl" />
    </q-card>
  </q-dialog>
</template>
<script>
import { cf4ReasonForAdmission } from 'src/store/patients_cf4/getters'
import { defineComponent, ref } from 'vue'
import CONSTANTS from '../constants'

export default defineComponent({
  name: 'EditReasonForAdmissionDialog',
  props: ['eReasonForAdmissionDialog', 'pInfo', 'cf4RForAdmission', 'dTitle'],
  setup() {
    return {
      no_rhci: ref(false),
      yes_rhci: ref(false),
      v_chest_lungs: ref(null),
      v_cvs: ref(null),
      v_psas: ref(null),
      v_abdomen: ref(null),
      v_gu: ref(null),
      v_skin: ref(null),
      v_neuro_exam: ref(null)
    }
  },
  data() {
    return {
      ob_check: false,
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
        ob_na: false,
        pertinent_signs_and_symptoms: [],
        pain: '',
        pain_site: '',
        psas_other: '',
        psas_other_desc: '',
        referred_to_another_hci: '',
        rhci_yes: false,
        rhci_no: false,
        specify_reason: '',
        originating_hci: '',
        general_survey: '',
        awake_and_alert: false,
        altered_sensorium: false,
        altered_sensorium_data: '',
        p_height: '',
        p_weight: '',
        vital_sign_bp: '',
        vital_sign_hr: '',
        vital_sign_rr: '',
        vital_sign_temp: '',
        heent: [],
        heent_others: '',
        chest_lungs: [],
        chest_lungs_others: '',
        cvs: [],
        cvs_others: '',
        abdomen: [],
        abdomen_others: '',
        gu: [],
        gu_others: '',
        skin: [],
        skin_others: '',
        neuro_exam: [],
        neuro_exam_others: '',
        outcome_of_treatment: '',
        outcome_reason: '',
        cf4_status: ''
      },
      submitAlert: false,
      updatePatientDataMsg: CONSTANTS.FORM_UPDATE_PATIENT_DATA_MESSAGE,
      updateReasonForAdmissionMsg: CONSTANTS.FORM_UPDATE_REASON_FOR_ADMISSION_MESSAGE,
      psas: [
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
      ],
      heents: [
        'Essentially normal',
        'Abnormal pupillary reaction',
        'Cervical lymphadenopathy',
        'Dry mucous membrane',
        'Icteric sclerae',
        'Pale conjunctivae ',
        'Sunken eyeballs',
        'Sunken fontanelle '
      ],
      chest: [
        'Essentially normal',
        'Asymmetrical chest expansion',
        'Decreased breath sounds',
        'Wheezes',
        'Lump/s over breast(s)',
        'Rales/crackles/rhonchi',
        'Intercostal rib/clavicular retraction'
      ],
      cvs: [
        'Essentially normal',
        'Displaced apex beat',
        'Heaves and/or thrills',
        'Pericardia! bulge',
        'Irregular rhythm',
        'Muffled heart sounds',
        'Murmur'
      ],
      abdomen: [
        'Essentially normal',
        'Abdominal rigidity',
        'Abdomen tenderness',
        'Hyperactive bowel sounds',
        'Palpable mass(es)',
        'Tympanitic/dull abdomen',
        'Uterine contraction'
      ],
      gu: [
        'Essentially normal',
        'Blood stained in exam finger',
        'Cervical dilatation',
        'Presence of abnormal discharge'
      ],
      skin: [
        'Essentially normal',
        'Clubbing',
        'Cold clammy skin',
        'Cyanosis/mottled skin',
        'Edema/swelling',
        'Decreased mobility',
        'Pale nailbeds',
        'Poor skin turgor',
        'Rashes/petechiae',
        'Weak pulses'
      ],
      neuro_exam: [
        'Essentially normal',
        'Abnormal gait',
        'Abnormal position sense',
        'Abnormal/decreased sensation',
        'Abnormal reflex(es)',
        'Poor/altered memory ',
        'Poor muscle tone/strength',
        'Poor coordination'
      ]
    }
  },
  watch: {
    cf4RForAdmission: {
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
          this.cf4ReasonForAdmission.pertinent_signs_and_symptoms = new Array(val.pertinent_signs_and_symptoms)
          this.cf4ReasonForAdmission.pain = val.pain
          this.cf4ReasonForAdmission.pain_site = val.pain_site
          this.cf4ReasonForAdmission.psas_other = val.psas_other
          this.cf4ReasonForAdmission.psas_other_desc = val.psas_other_desc
          this.cf4ReasonForAdmission.referred_to_another_hci = val.referred_to_another_hci
          this.cf4ReasonForAdmission.rhci_yes = val.rhci_yes,
            this.cf4ReasonForAdmission.rhci_no = val.rhci_no,
            this.cf4ReasonForAdmission.specify_reason = val.specify_reason
          this.cf4ReasonForAdmission.originating_hci = val.originating_hci
          this.cf4ReasonForAdmission.general_survey = val.general_survey
          this.cf4ReasonForAdmission.awake_and_alert = val.awake_and_alert
          this.cf4ReasonForAdmission.altered_sensorium = val.altered_sensorium
          this.cf4ReasonForAdmission.altered_sensorium_data = val.altered_sensorium_data
          this.cf4ReasonForAdmission.p_height = val.p_height
          this.cf4ReasonForAdmission.p_weight = val.p_weight
          this.cf4ReasonForAdmission.vital_sign_bp = val.vital_sign_bp
          this.cf4ReasonForAdmission.vital_sign_hr = val.vital_sign_hr
          this.cf4ReasonForAdmission.vital_sign_rr = val.vital_sign_rr
          this.cf4ReasonForAdmission.vital_sign_temp = val.vital_sign_temp
          this.cf4ReasonForAdmission.heent = new Array(val.heent)
          this.cf4ReasonForAdmission.heent_others = val.heent_others
          this.cf4ReasonForAdmission.chest_lungs = new Array(val.chest_lungs)
          this.cf4ReasonForAdmission.chest_lungs_others = val.chest_lungs_others
          this.cf4ReasonForAdmission.cvs = new Array(val.cvs)
          this.cf4ReasonForAdmission.cvs_others = val.cvs_others
          this.cf4ReasonForAdmission.abdomen = new Array(val.abdomen)
          this.cf4ReasonForAdmission.abdomen_others = val.abdomen_others
          this.cf4ReasonForAdmission.gu = new Array(val.gu)
          this.cf4ReasonForAdmission.gu_others = val.gu_others
          this.cf4ReasonForAdmission.skin = new Array(val.skin)
          this.cf4ReasonForAdmission.skin_others = val.skin_others
          this.cf4ReasonForAdmission.neuro_exam = new Array(val.neuro_exam)
          this.cf4ReasonForAdmission.neuro_exam_others = val.neuro_exam_others
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
          this.cf4ReasonForAdmission.rhci_yes = ''
          this.cf4ReasonForAdmission.rhci_no = ''
          this.cf4ReasonForAdmission.specify_reason = ''
          this.cf4ReasonForAdmission.originating_hci = ''
          this.cf4ReasonForAdmission.general_survey = ''
          this.cf4ReasonForAdmission.awake_and_alert = ''
          this.cf4ReasonForAdmission.altered_sensorium = ''
          this.cf4ReasonForAdmission.altered_sensorium_data = ''
          this.cf4ReasonForAdmission.p_height = ''
          this.cf4ReasonForAdmission.p_weight = ''
          this.cf4ReasonForAdmission.vital_sign_bp = ''
          this.cf4ReasonForAdmission.vital_sign_hr = ''
          this.cf4ReasonForAdmission.vital_sign_rr = ''
          this.cf4ReasonForAdmission.vital_sign_temp = ''
          this.cf4ReasonForAdmission.heent = ''
          this.cf4ReasonForAdmission.heent_others = ''
          this.cf4ReasonForAdmission.chest_lungs = ''
          this.cf4ReasonForAdmission.chest_lungs_others = ''
          this.cf4ReasonForAdmission.cvs = ''
          this.cf4ReasonForAdmission.cvs_others = ''
          this.cf4ReasonForAdmission.abdomen = ''
          this.cf4ReasonForAdmission.abdomen_others = ''
          this.cf4ReasonForAdmission.gu = ''
          this.cf4ReasonForAdmission.gu_others = ''
          this.cf4ReasonForAdmission.skin = ''
          this.cf4ReasonForAdmission.skin_others = ''
          this.cf4ReasonForAdmission.neuro_exam = ''
          this.cf4ReasonForAdmission.neuro_exam_others = ''
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
        pertinent_signs_and_symptoms: this.cf4ReasonForAdmission.pertinent_signs_and_symptoms,
        pain: this.cf4ReasonForAdmission.pain,
        pain_site: this.cf4ReasonForAdmission.pain_site,
        psas_other: this.cf4ReasonForAdmission.psas_other,
        psas_other_desc: this.cf4ReasonForAdmission.psas_other_desc,
        referred_to_another_hci: this.cf4ReasonForAdmission.referred_to_another_hci,
        rhci_yes: this.cf4ReasonForAdmission.rhci_yes,
        rhci_no: this.cf4ReasonForAdmission.rhci_no,
        specify_reason: this.cf4ReasonForAdmission.specify_reason,
        originating_hci: this.cf4ReasonForAdmission.originating_hci,
        general_survey: this.cf4ReasonForAdmission.general_survey,
        awake_and_alert: this.cf4ReasonForAdmission.awake_and_alert,
        altered_sensorium: this.cf4ReasonForAdmission.altered_sensorium,
        altered_sensorium_data: this.cf4ReasonForAdmission.altered_sensorium_data,
        p_height: this.cf4ReasonForAdmission.p_height,
        p_weight: this.cf4ReasonForAdmission.p_weight,
        vital_sign_bp: this.cf4ReasonForAdmission.vital_sign_bp,
        vital_sign_hr: this.cf4ReasonForAdmission.vital_sign_hr,
        vital_sign_rr: this.cf4ReasonForAdmission.vital_sign_rr,
        vital_sign_temp: this.cf4ReasonForAdmission.vital_sign_temp,
        heent: this.cf4ReasonForAdmission.heent,
        heent_others: this.cf4ReasonForAdmission.heent_others,
        chest_lungs: this.cf4ReasonForAdmission.chest_lungs,
        chest_lungs_others: this.cf4ReasonForAdmission.chest_lungs_others,
        cvs: this.cf4ReasonForAdmission.cvs,
        cvs_others: this.cf4ReasonForAdmission.cvs_others,
        abdomen: this.cf4ReasonForAdmission.abdomen,
        abdomen_others: this.cf4ReasonForAdmission.abdomen_others,
        gu: this.cf4ReasonForAdmission.gu,
        gu_others: this.cf4ReasonForAdmission.gu_others,
        skin: this.cf4ReasonForAdmission.skin,
        skin_others: this.cf4ReasonForAdmission.skin_others,
        neuro_exam: this.cf4ReasonForAdmission.neuro_exam,
        neuro_exam_others: this.cf4ReasonForAdmission.neuro_exam_others,
        outcome_of_treatment: this.cf4ReasonForAdmission.outcome_of_treatment,
        outcome_reason: this.cf4ReasonForAdmission.outcome_reason,
        cf4_status: this.cf4ReasonForAdmission.cf4_status,
      }
      const result = await this.$store.dispatch('patientsCf4/updateCf4ReasonForAdmission', data)
      result.status === 200 ? (() => { this.submitAlert = true; })() : null
      // var array = JSON.parse("[" + string + "]");
    },
    checkObNa() {
      alert(this.cf4ReasonForAdmission.ob_na)
    },
    submitUpdateCf4ReasonForAdmission() {
      this.updateCf4ReasonForAdmission()
      setTimeout(() => {
        this.submitAlert = false
        this.close()
        this.$router.go()
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