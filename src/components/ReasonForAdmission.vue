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
            <label class="text-weight-bold">History of Present Illness:</label>
            <q-space />
            <div class="text-uppercase">
              {{ cf4RFA.HISTORY_OF_PRESENT_ILLNESS }}
            </div>
            <q-space class="q-pa-md" />
          </div>
          <div class="col-md-11">
            <label class="text-weight-bold">Pertinent Past Medical History:</label>
            <q-space />
            <div class="text-uppercase">
              {{ cf4RFA.PERTINENT_PAST_MEDICAL_HISTORY }}
            </div>
            <q-space class="q-pa-md" />

          </div>
          <div class="col-md-11">
            <label class="text-weight-bold">OB/GYN History:</label>
            <q-space />
            <div class="text-uppercase">
              G: {{ cf4RFA.OB_G }} P: {{ cf4RFA.OB_P }} ( {{ cf4RFA.OB_1 }} - {{ cf4RFA.OB_2 }} - {{ cf4RFA.OB_3 }} - {{
              cf4RFA.OB_4 }} ) LMP: {{ cf4RFA.LMP }}
              <q-checkbox v-model="cf4RFA.OB_NA" true-value="true" size="xl" disabled /> NA
            </div>

            <q-space class="q-pa-md" />
          </div>
          <q-space class="q-pa-md" />
          <div class="col-md-11">
            <label class="text-weight-bold">Pertinent Signs and Symptoms on Admission (tick applicable
              box/es)</label>
            <q-space />
            <div class="row q-ml-md pssa-mt">
              <div class="col-md-3 q-ml-md">
                <div class="text-caption text-uppercase q-mt-lg">
                  <q-checkbox v-if="Object.values(pPsas).includes('Altered Mental Sensorium')" size="xl"
                    v-model="checker" val="Altered Mental Sensorium" label="Altered Mental Sensorium" disable />
                  <q-checkbox v-else size="xl" v-model="cBox" val="Altered Mental Sensorium"
                    label="Altered Mental Sensorium" disable />
                </div>
              </div>
              <div class="col-md-2 q-ml-md">
                <div class="text-caption text-uppercase q-mt-lg">
                  <q-checkbox v-if="Object.values(pPsas).includes('Diarrhea')" size="xl" v-model="checker"
                    val="Diarrhea" label="Diarrhea" disable />
                  <q-checkbox v-else size="xl" v-model="cBox" val="Diarrhea" label="Diarrhea" disable />
                </div>
              </div>
              <div class="col-md-3 q-ml-md">
                <div class="text-caption text-uppercase q-mt-lg">
                  <q-checkbox v-if="Object.values(pPsas).includes('Hematemesis')" size="xl" v-model="checker"
                    val="Hematemesis" label="Hematemesis" disable />
                  <q-checkbox v-else size="xl" v-model="cBox" val="Hematemesis" label="Hematemesis" disable />
                </div>
              </div>
              <div class="col-md-2 q-ml-md">
                <div class="text-caption text-uppercase q-mt-lg">
                  <q-checkbox v-if="Object.values(pPsas).includes('Palpitations')" size="xl" v-model="checker"
                    val="Palpitations" label="Palpitations" disable />
                  <q-checkbox v-else size="xl" v-model="cBox" val="Palpitations" label="Palpitations" disable />
                </div>
              </div>
            </div>

            <q-space class="q-mb-sm" />
            <div class="row q-ml-md pssa-mt">
              <div class="col-md-3 q-ml-md">
                <div class="text-caption text-uppercase">
                  <q-checkbox v-if="Object.values(pPsas).includes('Abdominal cramp/pain')" size="xl" v-model="checker"
                    val="Abdominal cramp/pain" label="Abdominal cramp/pain" disable />
                  <q-checkbox v-else size="xl" v-model="cBox" val="Abdominal cramp/pain" label="Abdominal cramp/pain"
                    disable />
                </div>
              </div>
              <div class="col-md-2 q-ml-md">
                <div class="text-caption text-uppercase">
                  <q-checkbox v-if="Object.values(pPsas).includes('Dizziness')" size="xl" v-model="checker"
                    val="Dizziness" label="Dizziness" disable />
                  <q-checkbox v-else size="xl" v-model="cBox" val="Dizziness" label="Dizziness" disable />
                </div>
              </div>
              <div class="col-md-3 q-ml-md">
                <div class="text-caption text-uppercase">
                  <q-checkbox v-if="Object.values(pPsas).includes('Hematuria')" size="xl" v-model="checker"
                    val="Hematuria" label="Hematuria" disable />
                  <q-checkbox v-else size="xl" v-model="cBox" val="Hematuria" label="Hematuria" disable />
                </div>
              </div>
              <div class="col-md-2 q-ml-md">
                <div class="text-caption text-uppercase">
                  <q-checkbox v-if="Object.values(pPsas).includes('Seizures')" size="xl" v-model="checker"
                    val="Seizures" label="Seizures" disable />
                  <q-checkbox v-else size="xl" v-model="cBox" val="Seizures" label="Seizures" disable />
                </div>
              </div>
            </div>

            <q-space class="q-mb-xs" />
            <div class="row q-ml-md pssa-mt">
              <div class="col-md-3 q-ml-md">
                <div class="text-caption text-uppercase">
                  <q-checkbox v-if="Object.values(pPsas).includes('Anorexia')" size="xl" v-model="checker"
                    val="Anorexia" label="Anorexia" disable />
                  <q-checkbox v-else size="xl" v-model="cBox" val="Anorexia" label="Anorexia" disable />
                </div>
              </div>
              <div class="col-md-2 q-ml-md">
                <div class="text-caption text-uppercase">
                  <q-checkbox v-if="Object.values(pPsas).includes('Dysphagia')" size="xl" v-model="checker"
                    val="Dysphagia" label="Dysphagia" disable />
                  <q-checkbox v-else size="xl" v-model="cBox" val="Dysphagia" label="Dysphagia" disable />
                </div>
              </div>
              <div class="col-md-3 q-ml-md">
                <div class="text-caption text-uppercase">
                  <q-checkbox v-if="Object.values(pPsas).includes('Hemoptysis')" size="xl" v-model="checker"
                    val="Hemoptysis" label="Hemoptysis" disable />
                  <q-checkbox v-else size="xl" v-model="cBox" val="Hemoptysis" label="Hemoptysis" disable />
                </div>
              </div>
              <div class="col-md-2 q-ml-md">
                <div class="text-caption text-uppercase">
                  <q-checkbox v-if="Object.values(pPsas).includes('Skin rashes')" size="xl" v-model="checker"
                    val="Skin rashes " label="Skin rashes " disable />
                  <q-checkbox v-else size="xl" v-model="cBox" val="Skin rashes" label="Skin rashes " disable />
                </div>
              </div>
            </div>

            <q-space class="q-mb-xs" />
            <div class="row q-ml-md pssa-mt">
              <div class="col-md-3 q-ml-md">
                <div class="text-caption text-uppercase">
                  <q-checkbox v-if="Object.values(pPsas).includes('Bleeding gums')" size="xl" v-model="checker"
                    val="Bleeding gums" label="Bleeding gums" disable />
                  <q-checkbox v-else size="xl" v-model="cBox" val="Bleeding gums" label="Bleeding gums" disable />
                </div>
              </div>
              <div class="col-md-2 q-ml-md">
                <div class="text-caption text-uppercase">
                  <q-checkbox v-if="Object.values(pPsas).includes('Dyspnea')" size="xl" v-model="checker" val="Dyspnea"
                    label="Dyspnea" disable />
                  <q-checkbox v-else size="xl" v-model="cBox" val="Dyspnea" label="Dyspnea" disable />
                </div>
              </div>
              <div class="col-md-3 q-ml-md">
                <div class="text-caption text-uppercase">
                  <q-checkbox v-if="Object.values(pPsas).includes('Irritability')" size="xl" v-model="checker"
                    val="Irritability" label="Irritability" disable />
                  <q-checkbox v-else size="xl" v-model="cBox" val="Irritability" label="Irritability" disable />
                </div>
              </div>
              <div class="col-md-3 q-ml-md">
                <div class="text-caption text-uppercase">
                  <q-checkbox v-if="Object.values(pPsas).includes('Stool, bloody/black tarry/mucoid')" size="xl"
                    v-model="checker" val="Stool, bloody/black tarry/mucoid" label="Stool, bloody/black tarry/mucoid"
                    disable />
                  <q-checkbox v-else size="xl" v-model="cBox" val="Stool, bloody/black tarry/mucoid"
                    label="Stool, bloody/black tarry/mucoid" disable />
                </div>
              </div>
            </div>

            <q-space class="q-mb-xs" />
            <div class="row q-ml-md pssa-mt">
              <div class="col-md-3 q-ml-md">
                <div class="text-caption text-uppercase">
                  <q-checkbox v-if="Object.values(pPsas).includes('Body weaknes')" size="xl" v-model="checker"
                    val="Body weaknes" label="Body weaknes" disable />
                  <q-checkbox v-else size="xl" v-model="cBox" val="Body weaknes" label="Body weaknes" disable />
                </div>
              </div>
              <div class="col-md-2 q-ml-md">
                <div class="text-caption text-uppercase">
                  <q-checkbox v-if="Object.values(pPsas).includes('Dysuria')" size="xl" v-model="checker" val="Dysuria"
                    label="Dysuria" disable />
                  <q-checkbox v-else size="xl" v-model="cBox" val="Dysuria" label="Dysuria" disable />
                </div>
              </div>
              <div class="col-md-3 q-ml-md">
                <div class="text-caption text-uppercase">
                  <q-checkbox v-if="Object.values(pPsas).includes('Jaundice')" size="xl" v-model="checker"
                    val="Jaundice" label="Jaundice" disable />
                  <q-checkbox v-else size="xl" v-model="cBox" val="Jaundice" label="Jaundice" disable />
                </div>
              </div>
              <div class="col-md-3 q-ml-md">
                <div class="text-caption text-uppercase">
                  <q-checkbox v-if="Object.values(pPsas).includes('Sweating')" size="xl" v-model="checker"
                    val="Sweating" label="Sweating" disable />
                  <q-checkbox v-else size="xl" v-model="cBox" val="Sweating" label="Sweating" disable />
                </div>
              </div>
            </div>

            <q-space class="q-mb-xs" />
            <div class="row q-ml-md pssa-mt">
              <div class="col-md-3 q-ml-md">
                <div class="text-caption text-uppercase">
                  <q-checkbox v-if="Object.values(pPsas).includes('Blurring of vision')" size="xl" v-model="checker"
                    val="Blurring of vision" label="Blurring of vision" disable />
                  <q-checkbox v-else size="xl" v-model="cBox" val="Blurring of vision" label="Blurring of vision"
                    disable />
                </div>
              </div>
              <div class="col-md-2 q-ml-md">
                <div class="text-caption text-uppercase">
                  <q-checkbox v-if="Object.values(pPsas).includes('Epistaxis')" size="xl" v-model="checker"
                    val="Epistaxis" label="Epistaxis" disable />
                  <q-checkbox v-else size="xl" v-model="cBox" val="Epistaxis" label="Epistaxis" disable />
                </div>
              </div>
              <div class="col-md-3 q-ml-md">
                <div class="text-caption text-uppercase">
                  <q-checkbox v-if="Object.values(pPsas).includes('Lower extrem1ty edema')" size="xl" v-model="checker"
                    val="Lower extrem1ty edema" label="Lower extrem1ty edema" disable />
                  <q-checkbox v-else size="xl" v-model="cBox" val="Lower extrem1ty edema" label="Lower extrem1ty edema"
                    disable />
                </div>
              </div>
              <div class="col-md-3 q-ml-md">
                <div class="text-caption text-uppercase">
                  <q-checkbox v-if="Object.values(pPsas).includes('Urgency')" size="xl" v-model="checker" val="Urgency"
                    label="Urgency" disable />
                  <q-checkbox v-else size="xl" v-model="cBox" val="Urgency" label="Urgency" disable />
                </div>
              </div>
            </div>

            <q-space class="q-mb-xs" />
            <div class="row q-ml-md pssa-mt">
              <div class="col-md-3 q-ml-md">
                <div class="text-caption text-uppercase">
                  <q-checkbox v-if="Object.values(pPsas).includes('Chest pain/discomfort')" size="xl" v-model="checker"
                    val="Chest pain/discomfort" label="Chest pain/discomfort" disable />
                  <q-checkbox v-else size="xl" v-model="cBox" val="Chest pain/discomfort" label="Chest pain/discomfort"
                    disable />
                </div>
              </div>
              <div class="col-md-2 q-ml-md">
                <div class="text-caption text-uppercase">
                  <q-checkbox v-if="Object.values(pPsas).includes('Fever')" size="xl" v-model="checker" val="Fever"
                    label="Fever" disable />
                  <q-checkbox v-else size="xl" v-model="cBox" val="Fever" label="Fever" disable />
                </div>
              </div>
              <div class="col-md-3 q-ml-md">
                <div class="text-caption text-uppercase">
                  <q-checkbox v-if="Object.values(pPsas).includes('Myalgia')" size="xl" v-model="checker" val="Myalgia"
                    label="Myalgia" disable />
                  <q-checkbox v-else size="xl" v-model="cBox" val="Myalgia" label="Myalgia" disable />
                </div>
              </div>
              <div class="col-md-3 q-ml-md">
                <div class="text-caption text-uppercase">
                  <q-checkbox v-if="Object.values(pPsas).includes('Vomiting')" size="xl" v-model="checker"
                    val="Vomiting" label="Vomiting" disable />
                  <q-checkbox v-else size="xl" v-model="cBox" val="Vomiting" label="Vomiting" disable />
                </div>
              </div>
            </div>

            <q-space class="q-mb-xs" />
            <div class="row q-ml-md pssa-mt">
              <div class="col-md-3 q-ml-md">
                <div class="text-caption text-uppercase">
                  <q-checkbox v-if="Object.values(pPsas).includes('Constipation')" size="xl" v-model="checker"
                    val="Constipation" label="Constipation" disable />
                  <q-checkbox v-else size="xl" v-model="cBox" val="Constipation" label="Constipation" disable />
                </div>
              </div>
              <div class="col-md-2 q-ml-md">
                <div class="text-caption text-uppercase">
                  <q-checkbox v-if="Object.values(pPsas).includes('Frequency of urination')" size="xl" v-model="checker"
                    val="Frequency of urination" label="Frequency of urination" disable />
                  <q-checkbox v-else size="xl" v-model="cBox" val="Frequency of urination"
                    label="Frequency of urination" disable />
                </div>
              </div>
              <div class="col-md-3 q-ml-md">
                <div class="text-caption text-uppercase">
                  <q-checkbox v-if="Object.values(pPsas).includes('Orthopnea')" size="xl" v-model="checker"
                    val="Orthopnea" label="Orthopnea" disable />
                  <q-checkbox v-else size="xl" v-model="cBox" val="Orthopnea" label="Orthopnea" disable />
                </div>
              </div>
              <div class="col-md-3 q-ml-md">
                <div class="text-caption text-uppercase">
                  <q-checkbox v-if="Object.values(pPsas).includes('Weight loss')" size="xl" v-model="checker"
                    val="Weight loss" label="Weight loss" disable />
                  <q-checkbox v-else size="xl" v-model="cBox" val="Weight loss" label="Weight loss" disable />
                </div>
              </div>
            </div>

            <q-space class="q-mb-xs" />
            <div class="row q-ml-md pssa-mt">
              <div class="col-md-3 q-ml-md">
                <div class="text-caption text-uppercase">
                  <q-checkbox v-if="Object.values(pPsas).includes('Cough')" size="xl" v-model="checker" val="Cough"
                    label="Cough" disable />
                  <q-checkbox v-else size="xl" v-model="cBox" val="Cough" label="Cough" disable />
                </div>
              </div>
              <div class="col-md-2 q-ml-md">
                <div class="text-caption text-uppercase">
                  <q-checkbox v-if="Object.values(pPsas).includes('Headache')" size="xl" v-model="checker"
                    val="Headache" label="Headache" disable />
                  <q-checkbox v-else size="xl" v-model="cBox" val="Headache" label="Headache" disable />
                </div>
              </div>
              <div class="col-md-3 q-ml-md">
                <div class="text-caption text-uppercase">
                  <q-checkbox v-if="Object.values(pPsas).includes('Pain')" size="xl" v-model="checker" val="Pain"
                    label="Pain" disable />
                  <q-checkbox v-else size="xl" v-model="cBox" val="Pain" label="Pain" disable />
                  {{ cf4RFA.PAIN_SITE }} (site)
                </div>
              </div>
              <div class="col-md-2 q-ml-md">
                <div class="text-caption text-uppercase">
                  <q-checkbox v-if="Object.values(pPsas).includes('Others')" size="xl" v-model="checker" val="Others"
                    label="Others" disable />
                  <q-checkbox v-else size="xl" v-model="cBox" val="Others" label="Others" disable />
                </div>
              </div>
              <div class="col-md-2 q-ml-md">
                <div class="text-subtitle">
                  <q-input v-model="cf4RFA.PSAS_OTHER" label="Others" disable />
                </div>
                <q-space class="q-mb-lg" />
              </div>
            </div>
          </div>

          <div class="col-md-4 q-mr-xl">
            <label class="text-weight-bold">Referred from another health care institution (HCI)</label>
            <q-checkbox v-if="cf4RFA.RHCI_NO === 'true'" v-model="checker" size="xl" label="No" disable />
            <q-checkbox v-else v-model="cBox" size="xl" label="No" disable />
            <q-checkbox v-if="cf4RFA.RHCI_YES === 'true'" v-model="checker" size="xl" label="Yes, specify reason"
              disable />
            <q-checkbox v-else v-model="cBox" size="xl" label="Yes, specify reason" disable />
          </div>
          <div class="col-md-2">
            <q-input class="q-mr-xl s-reason" v-model="cf4RFA.SPECIFY_REASON" label="Reason" disable />
          </div>
          <div class="col-md-2">
            <q-input class="q-mr-xl name-hci" v-model="cf4RFA.ORIGINATING_HCI" label="Name of Originating HCI"
              disable />
          </div>
        </div>

        <q-space class="q-mb-md" />

        <div class="row">
          <div class="col-md-5">
            <label class="text-weight-bold">Physical Examination on Admission (Pertinent Findings per System)</label>
          </div>
        </div>
        <div class="row">
          <div class="col-md-4">
            <q-space class="q-mb-sm" />
            <label class="text-weight-bold">General Survey</label>
            <q-checkbox v-if="cf4RFA.AWAKE_AND_ALERT === 'true'" v-model="checker" size="xl" label="Awake and Alert"
              disable />
            <q-checkbox v-else v-model="cBox" size="xl" label="Awake and Alert" disable />
            <q-checkbox v-if="cf4RFA.ALTERED_SENSORIUM === 'true'" v-model="checker" size="xl"
              label="Altered Sensorium" />
            <q-checkbox v-else v-model="cBox" size="xl" label="Altered Sensorium" disable />
          </div>
          <div class="col-md-2">
            <q-input class="altered" v-model="cf4RFA.ALTERED_SENSORIUM_DATA" disable />
          </div>
          <div class="col-md-2 text-caption text-uppercase">
            <q-input class="height" v-model="cf4RFA.P_HEIGHT" disable label="Height (cm.)" />
          </div>
          <div class="col-md-2">
            <q-input class="weight" v-model="cf4RFA.P_WEIGHT" disable label="Weight (kg.)" />
          </div>
        </div>

        <div class="row">
          <div class="col-md-2">
            <q-space class="q-mb-lg" />
            <label class="vs-label text-weight-bold">Vital Signs</label>
          </div>
          <div class="col-md-2 q-ml-md">
            <q-input v-model="cf4RFA.VITAL_SIGN_BP" disable label="BP" />
          </div>
          <div class="col-md-2 q-ml-md">
            <q-input v-model="cf4RFA.VITAL_SIGN_HR" disable label="HR" />
          </div>
          <div class="col-md-2 q-ml-md">
            <q-input v-model="cf4RFA.VITAL_SIGN_RR" disable label="RR" />
          </div>
          <div class="col-md-2 q-ml-md">
            <q-input v-model="cf4RFA.VITAL_SIGN_TEMP" disable label="Temp" />
          </div>
        </div>

        <q-space class="q-mb-lg" />
        <div class="row">
          <div class="col-md-2">
            <q-space class="q-mb-lg" />
            <label class="vs-label text-weight-bold">HEENT</label>
          </div>
          <div class="col-md-2 q-ml-md">
            <div class="text-caption text-uppercase">
              <q-checkbox v-if="Object.values(pHeent).includes('Essentially normal')" size="xl" v-model="checker"
                val="Essentially normal" label="Essentially normal" disable />
              <q-checkbox v-else size="xl" v-model="cBox" val="Essentially normal" label="Essentially normal" disable />
            </div>
          </div>
          <div class="col-md-2 q-ml-md">
            <q-checkbox v-if="Object.values(pHeent).includes('Abnormal pupillary reaction')" size="xl" v-model="checker"
              val="Abnormal pupillary reaction" label="Abnormal pupillary reaction" />
            <q-checkbox v-else size="xl" v-model="cBox" val="Abnormal pupillary reaction"
              label="Abnormal pupillary reaction" disable />
          </div>
          <div class="col-md-2 q-ml-md">
            <q-checkbox v-if="Object.values(pHeent).includes('Cervical lymphadenopathy')" size="xl" v-model="checker"
              val="Cervical lymphadenopathy" label="Cervical lymphadenopathy" />
            <q-checkbox v-else size="xl" v-model="cBox" val="Cervical lymphadenopathy" label="Cervical lymphadenopathy"
              disable />
          </div>
          <div class="col-md-2 q-ml-md">
            <q-checkbox v-if="Object.values(pHeent).includes('Dry mucous membrane')" size="xl" v-model="checker"
              val="Dry mucous membrane" label="Dry mucous membrane" />
            <q-checkbox v-else size="xl" v-model="cBox" val="Dry mucous membrane" label="Dry mucous membrane "
              disable />
          </div>
        </div>

        <div class="row">
          <div class="col-md-2">
            <q-space class="q-mb-lg" />
            <label class="vs-label text-weight-bold"></label>
          </div>
          <div class="col-md-2 q-ml-md">
            <div class="text-caption text-uppercase">
              <q-checkbox v-if="Object.values(pHeent).includes('Icteric sclerae')" size="xl" v-model="checker"
                val="Icteric sclerae" label="Icteric sclerae" disable />
              <q-checkbox v-else size="xl" v-model="cBox" val="Icteric sclerae" label="Icteric sclerae" disable />
            </div>
          </div>
          <div class="col-md-2 q-ml-md">
            <q-checkbox v-if="Object.values(pHeent).includes('Pale conjunctivae')" size="xl" v-model="checker"
              val="Pale conjunctivae" label="Pale conjunctivae" />
            <q-checkbox v-else size="xl" v-model="cBox" val="Pale conjunctivae" label="Pale conjunctivae" disable />
          </div>
          <div class="col-md-2 q-ml-md">
            <q-checkbox v-if="Object.values(pHeent).includes('Sunken eyeballs')" size="xl" v-model="checker"
              val="Sunken eyeballs " label="Sunken eyeballs" disable />
            <q-checkbox v-else size="xl" v-model="cBox" val="Sunken eyeballs" label="Sunken eyeballs" disable />
          </div>
        </div>

        <div class="row">
          <div class="col-md-2">
          </div>
          <div class="col-md-2 q-ml-lg">
            <div class="text-caption text-uppercase">
              <q-input v-model="cf4RFA.HEENT_OTHERS" label="Others" disable />
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col-md-2">
            <q-space class="q-mb-lg" />
            <label class="vs-label text-weight-bold">CHEST / LUNGS</label>
          </div>
          <div class="col-md-2 q-ml-md">
            <div class="text-caption text-uppercase">
              <q-checkbox v-if="Object.values(pChest).includes('Essentially normal')" size="xl" v-model="checker"
                val="Essentially normal" label="Essentially normal" disable />
              <q-checkbox v-else size="xl" v-model="cBox" val="Essentially normal" label="Essentially normal" disable />
            </div>
          </div>
          <div class="col-md-2 q-ml-md">
            <q-checkbox v-if="Object.values(pChest).includes('Asymmetrical chest expansion')" size="xl"
              v-model="checker" val="Asymmetrical chest expansion" label="Asymmetrical chest expansion" disable />
            <q-checkbox v-else size="xl" v-model="cBox" val="Asymmetrical chest expansion"
              label="Asymmetrical chest expansion" disable />
          </div>
          <div class="col-md-2 q-ml-md">
            <q-checkbox v-if="Object.values(pChest).includes('Decreased breath sounds')" size="xl" v-model="checker"
              val="Decreased breath sounds" label="Decreased breath sounds" disabled />
            <q-checkbox v-else size="xl" v-model="cBox" val="Decreased breath sounds" label="Decreased breath sounds"
              disable />
          </div>
          <div class="col-md-2 q-ml-md">
            <q-checkbox v-if="Object.values(pChest).includes('Wheezes')" size="xl" v-model="checker" val="Wheezes"
              label="Wheezes" disabled />
            <q-checkbox v-else size="xl" v-model="cBox" val="Wheezes" label="Wheezes" disable />
          </div>
        </div>

        <div class="row">
          <div class="col-md-2">
            <q-space class="q-mb-lg" />
            <label class="vs-label text-weight-bold"></label>
          </div>
          <div class="col-md-2 q-ml-md">
            <div class="text-caption text-uppercase">
              <q-checkbox v-if="Object.values(pChest).includes('Lump/s over breast(s)')" size="xl" v-model="checker"
                val="Lump/s over breast(s)" label="Lump/s over breast(s)" disable />
              <q-checkbox v-else size="xl" v-model="cBox" val="Lump/s over breast(s)" label="Lump/s over breast(s)"
                disable />
            </div>
          </div>
          <div class="col-md-2 q-ml-md">
            <q-checkbox v-if="Object.values(pChest).includes('Rales/crackles/rhonchi')" size="xl" v-model="checker"
              val="Rales/crackles/rhonchi " label="Rales/crackles/rhonchi" disable />
            <q-checkbox v-else size="xl" v-model="cBox" val="Rales/crackles/rhonchi " label="Rales/crackles/rhonchi "
              disable />
          </div>
          <div class="col-md-2 q-ml-md">
            <q-checkbox v-if="Object.values(pChest).includes('Intercostal rib/clavicular retraction')" size="xl"
              v-model="checker" val="Intercostal rib/clavicular retraction"
              label="Intercostal rib/clavicular retraction" disable />
            <q-checkbox v-else size="xl" v-model="cBox" val="Intercostal rib/clavicular retraction"
              label="Intercostal rib/clavicular retraction" disable />
          </div>
        </div>

        <div class="row">
          <div class="col-md-2">
          </div>
          <div class="col-md-2 q-ml-lg">
            <div class="text-caption text-uppercase">
              <q-input v-model="cf4RFA.CHEST_LUNGS_OTHERS" label="Others" disable />
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col-md-2">
            <q-space class="q-mb-lg" />
            <label class="vs-label text-weight-bold">CVS</label>
          </div>
          <div class="col-md-2 q-ml-md">
            <div class="text-caption text-uppercase">
              <q-checkbox v-if="Object.values(pCvs).includes('Essentially normal')" size="xl" v-model="checker"
                val="Essentially normal" label=" Essentially normal" disable />
              <q-checkbox v-else size="xl" v-model="cBox" val=" Essentially normal" label=" Essentially normal"
                disable />
            </div>
          </div>
          <div class="col-md-2 q-ml-md">
            <q-checkbox v-if="Object.values(pCvs).includes('Displaced apex beat')" size="xl" v-model="checker"
              val="Displaced apex beat" label="Displaced apex beat" disable />
            <q-checkbox v-else size="xl" v-model="cBox" val="Displaced apex beat" label="Displaced apex beat" disable />
          </div>
          <div class="col-md-2 q-ml-md">
            <q-checkbox v-if="Object.values(pCvs).includes('Heaves and/or thrills')" size="xl" v-model="checker"
              val="Heaves and/or thrills" label="Heaves and/or thrills" disable />
            <q-checkbox v-else size="xl" v-model="cBox" val="Heaves and/or thrills" label="Heaves and/or thrills"
              disable />
          </div>
          <div class="col-md-2 q-ml-md">
            <q-checkbox v-if="Object.values(pCvs).includes('Pericardia! bulge')" size="xl" v-model="checker"
              val="Pericardia! bulge" label="Pericardia! bulge" disable />
            <q-checkbox v-else size="xl" v-model="cBox" val="Pericardia! bulge" label="Pericardia! bulge" disable />
          </div>
        </div>

        <div class="row">
          <div class="col-md-2">
            <q-space class="q-mb-lg" />
            <label class="vs-label text-weight-bold"></label>
          </div>
          <div class="col-md-2 q-ml-md">
            <div class="text-caption text-uppercase">
              <q-checkbox v-if="Object.values(pCvs).includes('Irregular rhythm')" size="xl" v-model="checker"
                val="Irregular rhythm" label="Irregular rhythm" disable />
              <q-checkbox v-else size="xl" v-model="cBox" val="Irregular rhythm" label="Irregular rhythm" disable />
            </div>
          </div>
          <div class="col-md-2 q-ml-md">
            <q-checkbox v-if="Object.values(pCvs).includes('Muffled heart sounds')" size="xl" v-model="checker"
              val="Muffled heart sounds " label="Muffled heart sounds" disable />
            <q-checkbox v-else size="xl" v-model="cBox" val="Muffled heart sounds " label="Muffled heart sounds "
              disable />
          </div>
          <div class="col-md-2 q-ml-md">
            <q-checkbox v-if="Object.values(pCvs).includes('Murmur')" size="xl" v-model="checker" val="Murmur "
              label="Murmur" disable />
            <q-checkbox v-else size="xl" v-model="cBox" val="Murmur" label="Murmur" disable />
          </div>
        </div>

        <div class="row">
          <div class="col-md-2">
          </div>
          <div class="col-md-2 q-ml-lg">
            <div class="text-caption text-uppercase">
              <q-input v-model="cf4RFA.CVS_OTHERS" label="Others" disable />
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col-md-2">
            <q-space class="q-mb-lg" />
            <label class="vs-label text-weight-bold">ABDOMEN</label>
          </div>
          <div class="col-md-2 q-ml-md">
            <div class="text-caption text-uppercase">
              <q-checkbox v-if="Object.values(pAbdomen).includes('Essentially normal')" size="xl" v-model="checker"
                val="Essentially normal" label=" Essentially normal" disable />
              <q-checkbox v-else size="xl" v-model="cBox" val=" Essentially normal" label=" Essentially normal"
                disable />
            </div>
          </div>
          <div class="col-md-2 q-ml-md">
            <q-checkbox v-if="Object.values(pAbdomen).includes('Abdominal rigidity')" size="xl" v-model="checker"
              val="Abdominal rigidity" label="Abdominal rigidity" disable />
            <q-checkbox v-else size="xl" v-model="cBox" val="Abdominal rigidity" label="Abdominal rigidity" disable />
          </div>
          <div class="col-md-2 q-ml-md">
            <q-checkbox v-if="Object.values(pAbdomen).includes('Abdomen tenderness')" size="xl" v-model="checker"
              val="Abdomen tenderness" label="Abdomen tenderness" disable />
            <q-checkbox v-else size="xl" v-model="cBox" val="Abdomen tenderness" label="Abdomen tenderness" disable />
          </div>
          <div class="col-md-2 q-ml-md">
            <q-checkbox v-if="Object.values(pAbdomen).includes('Hyperactive bowel sounds')" size="xl" v-model="checker"
              val="Hyperactive bowel sounds" label="Hyperactive bowel sounds" disable />
            <q-checkbox v-else size="xl" v-model="cBox" val="Hyperactive bowel sounds" label="Hyperactive bowel sounds"
              disable />
          </div>
        </div>

        <div class="row">
          <div class="col-md-2">
            <q-space class="q-mb-lg" />
            <label class="vs-label text-weight-bold"></label>
          </div>
          <div class="col-md-2 q-ml-md">
            <div class="text-caption text-uppercase">
              <q-checkbox v-if="Object.values(pAbdomen).includes('Palpable mass(es)')" size="xl" v-model="checker"
                val="Palpable mass(es)" label="Palpable mass(es)" disable />
              <q-checkbox v-else size="xl" v-model="cBox" val="Palpable mass(es)" label="Palpable mass(es)" disable />
            </div>
          </div>
          <div class="col-md-2 q-ml-md">
            <q-checkbox v-if="Object.values(pAbdomen).includes('Tympanitic/dull abdomen')" size="xl" v-model="checker"
              val="Tympanitic/dull abdomen " label="Tympanitic/dull abdomen" disable />
            <q-checkbox v-else size="xl" v-model="cBox" val="Tympanitic/dull abdomen" label="Tympanitic/dull abdomen"
              disable />
          </div>
          <div class="col-md-2 q-ml-md">
            <q-checkbox v-if="Object.values(pAbdomen).includes('Uterine contraction')" size="xl" v-model="checker"
              val="Uterine contraction " label="Uterine contraction" disable />
            <q-checkbox v-else size="xl" v-model="cBox" val="Uterine contraction" label="Uterine contraction" disable />
          </div>
        </div>

        <div class="row">
          <div class="col-md-2">
          </div>
          <div class="col-md-2 q-ml-lg">
            <div class="text-caption text-uppercase">
              <q-input v-model="cf4RFA.ABDOMEN_OTHERS" label="Others" disable />
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col-md-2">
            <q-space class="q-mb-lg" />
            <label class="vs-label text-weight-bold">GU (IE)</label>
          </div>
          <div class="col-md-2 q-ml-md">
            <div class="text-caption text-uppercase">
              <q-checkbox v-if="Object.values(pGu).includes('Essentially normal')" size="xl" v-model="checker"
                val="Essentially normal" label=" Essentially normal" disable />
              <q-checkbox v-else size="xl" v-model="cBox" val=" Essentially normal" label=" Essentially normal"
                disable />
            </div>
          </div>
          <div class="col-md-2 q-ml-md">
            <q-checkbox v-if="Object.values(pGu).includes('Blood stained in exam finger')" size="xl" v-model="checker"
              val="Blood stained in exam finger" label="Blood stained in exam finger" disable />
            <q-checkbox v-else size="xl" v-model="cBox" val="Blood stained in exam finger"
              label="Blood stained in exam finger" disable />
          </div>
          <div class="col-md-2 q-ml-md">
            <q-checkbox v-if="Object.values(pGu).includes('Cervical dilatation')" size="xl" v-model="checker"
              val="Cervical dilatation" label="Cervical dilatation" disable />
            <q-checkbox v-else size="xl" v-model="cBox" val="Cervical dilatation" label="Cervical dilatation" disable />
          </div>
          <div class="col-md-2 q-ml-md">
            <q-checkbox v-if="Object.values(pGu).includes('Presence of abnormal discharge')" size="xl" v-model="checker"
              val="Presence of abnormal discharge" label="Presence of abnormal discharge" disable />
            <q-checkbox v-else size="xl" v-model="cBox" val="Presence of abnormal discharge"
              label="Presence of abnormal discharge" disable />
          </div>
        </div>

        <div class="row">
          <div class="col-md-2">
          </div>
          <div class="col-md-2 q-ml-lg">
            <div class="text-caption text-uppercase">
              <q-input v-model="cf4RFA.GUI_OTHERS" label="Others" disable />
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col-md-2">
            <q-space class="q-mb-lg" />
            <label class="vs-label text-weight-bold">SKIN/EXTREMITIES</label>
          </div>
          <div class="col-md-2 q-ml-md">
            <div class="text-caption text-uppercase">
              <q-checkbox v-if="Object.values(pSkin).includes('Essentially normal')" size="xl" v-model="checker"
                val=" Essentially normal" label="  Essentially normal" disable />
              <q-checkbox v-else size="xl" v-model="cBox" val="  Essentially normal" label="Essentially normal"
                disable />
            </div>
          </div>
          <div class="col-md-2 q-ml-md">
            <q-checkbox v-if="Object.values(pSkin).includes('Clubbing')" size="xl" v-model="checker" val="Clubbing"
              label="Clubbing" disable />
            <q-checkbox v-else size="xl" v-model="cBox" val="Clubbing" label="Clubbing" disable />
          </div>
          <div class="col-md-2 q-ml-md">
            <q-checkbox v-if="Object.values(pSkin).includes('Cold clammy skin')" size="xl" v-model="checker"
              val="Cold clammy skin" label="Cold clammy skin" disable />
            <q-checkbox v-else size="xl" v-model="cBox" val="Cold clammy skin" label="Cold clammy skin" disable />
          </div>
          <div class="col-md-2 q-ml-md">
            <q-checkbox v-if="Object.values(pSkin).includes('Cyanosis/mottled skin')" size="xl" v-model="checker"
              val="Cyanosis/mottled skin" label="Cyanosis/mottled skin" disable />
            <q-checkbox v-else size="xl" v-model="cBox" val="Cyanosis/mottled skin" label="Cyanosis/mottled skin"
              disable />
          </div>
        </div>

        <div class="row">
          <div class="col-md-2">
            <q-space class="q-mb-lg" />
            <label class="vs-label text-weight-bold"></label>
          </div>
          <div class="col-md-2 q-ml-md">
            <div class="text-caption text-uppercase">
              <q-checkbox v-if="Object.values(pSkin).includes('Edema/swelling')" size="xl" v-model="checker"
                val="Edema/swelling" label=" Edema/swelling" disable />
              <q-checkbox v-else size="xl" v-model="cBox" val="Edema/swelling" label="Edema/swelling" disable />
            </div>
          </div>
          <div class="col-md-2 q-ml-md">
            <q-checkbox v-if="Object.values(pSkin).includes('Decreased mobility')" size="xl" v-model="checker"
              val="Decreased mobility " label="Decreased mobility" disable />
            <q-checkbox v-else size="xl" v-model="cBox" val="Decreased mobility" label="Decreased mobility" disable />
          </div>
          <div class="col-md-2 q-ml-md">
            <q-checkbox v-if="Object.values(pSkin).includes('Pale nailbeds')" size="xl" v-model="checker"
              val="Pale nailbeds " label="Pale nailbeds" disable />
            <q-checkbox v-else size="xl" v-model="cBox" val="Pale nailbeds" label="Pale nailbeds" disable />
          </div>
          <div class="col-md-2 q-ml-md">
            <q-checkbox v-if="Object.values(pSkin).includes('Poor skin turgor')" size="xl" v-model="checker"
              val="Poor skin turgor " label="Poor skin turgor" disable />
            <q-checkbox v-else size="xl" v-model="cBox" val="Poor skin turgor" label="Poor skin turgor" disable />
          </div>
        </div>

        <div class="row">
          <div class="col-md-2">
            <q-space class="q-mb-lg" />
            <label class="vs-label text-weight-bold"></label>
          </div>
          <div class="col-md-2 q-ml-md">
            <div class="text-caption text-uppercase">
              <q-checkbox v-if="Object.values(pSkin).includes('Rashes/petechiae')" size="xl" v-model="checker"
                val="Rashes/petechiae" label=" Rashes/petechiae" disable />
              <q-checkbox v-else size="xl" v-model="cBox" val="Rashes/petechiae" label="Rashes/petechiae" disable />
            </div>
          </div>
          <div class="col-md-2 q-ml-md">
            <q-checkbox v-if="Object.values(pSkin).includes('Weak pulses')" size="xl" v-model="checker"
              val="Weak pulses " label="Weak pulses" disable />
            <q-checkbox v-else size="xl" v-model="cBox" val="Weak pulses" label="Weak pulses" disable />
          </div>
        </div>

        <div class="row">
          <div class="col-md-2">
          </div>
          <div class="col-md-2 q-ml-lg">
            <div class="text-caption text-uppercase">
              <q-input v-model="cf4RFA.SKIN_OTHERS" label="Others" disable />
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col-md-2">
            <q-space class="q-mb-lg" />
            <label class="vs-label text-weight-bold">NEURO EXAM</label>
          </div>
          <div class="col-md-2 q-ml-md">
            <div class="text-caption text-uppercase">
              <q-checkbox v-if="Object.values(pNeuroExam).includes('Essentially normal')" size="xl" v-model="checker"
                val="Essentially normal" label=" Essentially normal" disable />
              <q-checkbox v-else size="xl" v-model="cBox" val=" Essentially normal" label=" Essentially normal"
                disable />
            </div>
          </div>
          <div class="col-md-2 q-ml-md">
            <q-checkbox v-if="Object.values(pNeuroExam).includes('Abnormal gait')" size="xl" v-model="checker"
              val="Abnormal gait" label="Abnormal gait" disable />
            <q-checkbox v-else size="xl" v-model="cBox" val="Abnormal gait" label="Abnormal gait" disable />
          </div>
          <div class="col-md-2 q-ml-md">
            <q-checkbox v-if="Object.values(pNeuroExam).includes('Abnormal position sense')" size="xl" v-model="checker"
              val="Abnormal position sense" label="Abnormal position sense" disable />
            <q-checkbox v-else size="xl" v-model="cBox" val="Abnormal position sense" label="Abnormal position sense"
              disable />
          </div>
          <div class="col-md-2 q-ml-md">
            <q-checkbox v-if="Object.values(pNeuroExam).includes('Abnormal/decreased sensation')" size="xl"
              v-model="checker" val="Abnormal/decreased sensation" label="Abnormal/decreased sensation" disable />
            <q-checkbox v-else size="xl" v-model="cBox" val="Abnormal/decreased sensation"
              label="Abnormal/decreased sensation" disable />
          </div>
        </div>

        <div class="row">
          <div class="col-md-2">
            <q-space class="q-mb-lg" />
            <label class="vs-label text-weight-bold"></label>
          </div>
          <div class="col-md-2 q-ml-md">
            <div class="text-caption text-uppercase">
              <q-checkbox v-if="Object.values(pNeuroExam).includes('Abnormal reflex(es)')" size="xl" v-model="checker"
                val="Abnormal reflex(es)" label="Abnormal reflex(es)" disable />
              <q-checkbox v-else size="xl" v-model="cBox" val="Abnormal reflex(es)" label="Abnormal reflex(es)"
                disable />
            </div>
          </div>
          <div class="col-md-2 q-ml-md">
            <q-checkbox v-if="Object.values(pNeuroExam).includes('Poor/altered memory')" size="xl" v-model="checker"
              val="Poor/altered memory " label="Poor/altered memory" disable />
            <q-checkbox v-else size="xl" v-model="cBox" val="Poor/altered memory" label="Poor/altered memory" disable />
          </div>
          <div class="col-md-2 q-ml-md">
            <q-checkbox v-if="Object.values(pNeuroExam).includes('Poor muscle tone/strength')" size="xl"
              v-model="checker" val="Poor muscle tone/strength " label="Poor muscle tone/strength" disable />
            <q-checkbox v-else size="xl" v-model="cBox" val="Poor muscle tone/strength"
              label="Poor muscle tone/strength" disable />
          </div>
          <div class="col-md-2 q-ml-md">
            <q-checkbox v-if="Object.values(pNeuroExam).includes('Poor coordination')" size="xl" v-model="checker"
              val="Poor coordination " label="Poor coordination" disable />
            <q-checkbox v-else size="xl" v-model="cBox" val="Poor coordination" label="Poor coordination" disable />
          </div>
        </div>

        <div class="row">
          <div class="col-md-2">
          </div>
          <div class="col-md-2 q-ml-lg">
            <div class="text-caption text-uppercase">
              <q-input v-model="cf4RFA.NEURO_EXAM_OTHERS" label="Others" disable />
            </div>
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
      cBox: ref(false)
    }
  },
  data() {
    return {
      checker: true,
      moment,
      dialogTitle: '',
      editReasonForAdmissionDialog: false,
      pPsas: {},
      pHeent: {},
      pChest: {},
      pCvs: {},
      pAbdomen: {},
      pGu: {},
      pSkin: {},
      pNeuroExam: {},
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
        aletered_sensorium_data: '',
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
      const arrayPsas = this.cf4RFA.PERTINENT_SIGNS_AND_SYMPTOMS.split(',')
      this.pPsas = arrayPsas;
      const arrayHeent = this.cf4RFA.HEENT.split(',')
      this.pHeent = arrayHeent;
      const arrayChest = this.cf4RFA.CHEST_LUNGS.split(',')
      this.pChest = arrayChest
      const arrayCvs = this.cf4RFA.CVS.split(',')
      this.pCvs = arrayCvs
      const arrayAbdomen = this.cf4RFA.ABDOMEN.split(',')
      this.pAbdomen = arrayAbdomen
      const arrayGu = this.cf4RFA.GU.split(',')
      this.pGu = arrayGu
      const arraySkin = this.cf4RFA.SKIN.split(',')
      this.pSkin = arraySkin
      const arrayNeuro = this.cf4RFA.NEURO_EXAM.split(',')
      this.pNeuroExam = arrayNeuro
    },
    reasonForAdmissionDialog(data) {
      this.dialogTitle = 'EDIT REASON FOR ADMISSION'
      this.editReasonForAdmissionDialog = true
      this.cf4ReasonForAdmission = {
        id: data.ID,
        patient_no: data.PATIENT_NO,
        case_no: data.CASE_NO,
        history_of_present_illness: data.HISTORY_OF_PRESENT_ILLNESS,
        pertinent_past_medical_history: data.PERTINENT_PAST_MEDICAL_HISTORY,
        ob_g: data.OB_G ? data.OB_G : '',
        ob_p: data.OB_P ? data.OB_P : '',
        ob_1: data.OB_1,
        ob_2: data.OB_2,
        ob_3: data.OB_3,
        ob_4: data.OB_4,
        lmp: data.LMP,
        ob_na: data.OB_NA === 'true' ? true : false,
        pertinent_signs_and_symptoms: data.PERTINENT_SIGNS_AND_SYMPTOMS,
        pain: data.PAIN,
        pain_site: data.PAIN_SITE,
        psas_other: data.PSAS_OTHER,
        psas_other_desc: data.PSAS_OTHER_DESC,
        referred_to_another_hci: data.REFERRED_TO_ANOTHER_HCI,
        rhci_yes: data.RHCI_YES === 'true' ? true : false,
        rhci_no: data.RHCI_NO === 'true' ? true : false,
        specify_reason: data.SPECIFY_REASON,
        originating_hci: data.ORIGINATING_HCI,
        general_survey: data.GENERAL_SURVEY,
        awake_and_alert: data.AWAKE_AND_ALERT === 'true' ? true : false,
        altered_sensorium: data.ALTERED_SENSORIUM === 'true' ? true : false,
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

.altered {
  margin-left: -140px;
  width: 25em;
}

.name-hci {
  margin-left: -22px;
  width: 28em;
}

.height {
  margin-left: -63px;
  width: 16em;
}

.weight {
  margin-left: -108px;
  width: 16em;
}

.s-reason {
  margin-left: -50px;
}

.vs-label {
  margin-left: 180px;
}
</style>