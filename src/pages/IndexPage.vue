<template>
  <CreateCF4ConfirmDialog :cf4Modal="cf4Modal" :pInfo="patientInfo" :dTitle="dialogTitle" @close="closeCF4ConfirmDialog"
    @hide="closeCF4ConfirmDialog" />
  <div class="q-pa-lg">
    <q-form @submit="submitFilter" class="q-gutter-md" ref="form">
      <div class="q-gutter-md row q-ml-sm">
        <q-input class="text-h5 q-ml-sm" outlined v-model="search.filterPatient" ref="inputRef" :label=searchLabel
          :rules="[rule1, rule2]" :hint=searchHint>
          <template v-slot:prepend>
            <q-icon name="search" />
          </template>
          <template v-slot:append>
            <q-icon name="close" @click="search.filterPatient = ''" class="cursor-pointer" />
          </template>
        </q-input>
      </div>
      <br>
      <q-btn icon="search" class="q-mt-xs s-btn" label="Search" type="submit" color="primary" />
    </q-form>
  </div>
  <q-separator class="q-ml-md q-mr-md" />
  <div class="row container-pos" style="width: 1400px;">
    <div class="col-md-3 q-pa-lg" v-for="resultPatient in paginatePatients" :key="resultPatient">
      <q-toolbar class="bg-primary text-white shadow-2">
        <q-toolbar-title>
          <b class="text-subtitle2">{{ resultPatient.LASTNAME }} {{ resultPatient.FIRSTNAME }}, {{
          resultPatient.MIDDLENAME }}</b>
        </q-toolbar-title>
      </q-toolbar>
      <q-list bordered>
        <q-item class="q-my-sm">
          <q-item-section avatar>
            <q-avatar class="text-white avatar-margin" size="50px" color="amber-4">{{
            Array.from(resultPatient.FIRSTNAME)[0] + '' +
            Array.from(resultPatient.LASTNAME)[0]
            }}
            </q-avatar>
          </q-item-section>
          <q-item-section>
            <q-item-label class="dept-label text-uppercase text-caption">PATIENT NO: {{ resultPatient.PATIENTNO[0]
            }}
            </q-item-label>
            <q-item-label class="dept-label text-uppercase text-caption">DATE ADMITTED: {{
            resultPatient.DATEAD !== null ? resultPatient.DATEAD.substr(0, 10) : resultPatient.DATEAD
            }}
            </q-item-label>
            <q-item-label class="dept-label text-uppercase text-caption">DATE DISCHARGED: {{
            resultPatient.DATEDIS !== null ? resultPatient.DATEDIS.substr(0, 10) : resultPatient.DATEDIS
            }}
            </q-item-label>
            <q-item-label class="dept-label text-uppercase text-caption">CASE NO: {{
            resultPatient.CASENO !== null ? resultPatient.CASENO : resultPatient.CASENO.substr(0, 10)
            }}
            </q-item-label>
            <q-item-label class="text-caption">
              <q-btn unelevated v-if="resultPatient.CF4_STATUS" color="green" size="sm" label="UPDATE CF4"
                @click="getPatientDetails(resultPatient.PATIENTNO[0])" />
              <q-btn unelevated v-else color="red" size="sm" label="CREATE CF4"
                @click="createCF4Confirm(resultPatient)" />
            </q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </div>
  </div>
  <q-inner-loading :showing="visible" class="q-mr-xl">
    <q-spinner color="primary" size="8em" /> {{ loadingLabel }}
  </q-inner-loading>
  <div v-if="filterMessage" class="q-ml-lg q-pr-md">
    <q-banner inline-actions rounded class="bg-red text-white">
      {{ filterMessage }}
      <template v-slot:action>
      </template>
    </q-banner>
  </div>
  <div v-if="pageStatus" class="q-ml-lg q-pr-md">
    <q-banner inline-actions rounded class="bg-red text-white">
      {{ pageStatus }}
      <template v-slot:action>
      </template>
    </q-banner>
  </div>
  <div v-if="resultPatients.length >= 5" class="q-pa-lg flex flex-center">
    <q-pagination v-model="page" :min="currentPage" :max="Math.ceil(resultPatients.length / totalPages)" :input="true"
      input-class="text-orange-10" size="2em" />
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue'
import { mapGetters } from 'vuex'
import CONSTANTS from '../constants'
import CreateCF4ConfirmDialog from '../components/CreateCF4ConfirmDialog.vue'

export default defineComponent({
  name: "IndexPage",
  components: {
    CreateCF4ConfirmDialog
  },
  setup() {
    const inputRef = ref(null);
    return {
      filter: ref(""),
      inputRef,
      visible: ref(false),
      rule1(val) {
        return new Promise((resolve, reject) => {
          resolve(!!val || "* Required");
        });
      },
      rule2(val) {
        return new Promise((resolve, reject) => {
          resolve(val.length > 1 || CONSTANTS.INPUT_RULE);
        });
      },
    };
  },
  data() {
    return {
      search: {
        filterPatient: ""
      },
      cf4Modal: false,
      dialogTitle: "",
      pDetails: {},
      patientInfo: {},
      page: 1,
      currentPage: 1,
      nextPage: null,
      totalPages: 8,
      pageStatus: "",
      filterMessage: "",
      resultPatients: [],
      searchHint: CONSTANTS.SEARCH_HINT,
      searchLabel: CONSTANTS.SEARCH_LABEL,
      btnCf4Label: CONSTANTS.BUTTON_CF4_LABEL,
      loadingLabel: CONSTANTS.LOADING_LABEL
    };
  },
  computed: {
    ...mapGetters({
      employees: "patientsCf4/patients",
      searchStatus: "patientsCf4/searchStatus",
      patientDetails: "patientsCf4/patientDetails",
      searchedPatients: "patientsCf4/searchedPatients",
    }),
    paginatePatients() {
      return this.resultPatients.slice((this.page - 1) * this.totalPages, (this.page - 1) * this.totalPages + this.totalPages);
    }
  },
  methods: {
    async submitFilter() {
      this.resultPatients = "";
      this.filterMessage = "";
      let data = {
        filterData: this.search.filterPatient,
      };
      if (data.filterData.length >= 2) {
        this.visible = true;
        const result = await this.$store.dispatch("patientsCf4/searchPatients", data);
        result.status === 200 ?
          setTimeout(() => {
            this.resultPatients = this.searchedPatients;
            result.data.length <= 0 ? this.filterMessage = CONSTANTS.FILTER_ERROR : "";
            this.visible = false;
          }, 1000)
          : this.pageStatus = CONSTANTS.API_ERROR;
      }
    },
    async getPatientDetails(patientNo) {
      await this.$router.push({ path: "patient_cf4", query: { pNo: patientNo } });
    },
    createCF4Confirm(data) {
      this.cf4Modal = true
      this.dialogTitle = "CREATE PATIENT CF4";
      this.patientInfo = data
    },
    closeCF4ConfirmDialog(data) {
      this.cf4Modal = false
    }
  }
})
</script>
<style scoped>
.q-input {
  width: 80em
}

.container-pos {
  margin-left: auto;
  margin-right: auto;
  width: 50%;
}

.avatar-margin {
  margin-top: -40px;
}
</style>
