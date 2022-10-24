<template>
  <CreateCF4ConfirmDialog :cf4Modal="cf4Modal" :pInfo="patientInfo" :dTitle="dialogTitle" @close="closeCF4ConfirmDialog"
    @hide="closeCF4ConfirmDialog" />
  <div class="q-pa-lg">
    <q-form @submit="submitFilter" class="q-gutter-md" ref="form">
      <div class="q-gutter-md row q-ml-sm">
        <q-input v-if="fByLastNameCaseNo" class="q-ml-sm q-f-caseno" outlined v-model="search.filterPatient"
          ref="inputRef" :label=searchLabel :rules="[rule1, rule2]" :hint=searchByLastNameCaseNo>
          <template v-slot:prepend>
            <q-icon name="search" />
          </template>
          <template v-slot:append>
            <q-icon name="close" @click="search.filterPatient = ''" class="cursor-pointer" />
          </template>
        </q-input>
      </div>
      <q-btn v-if="lastNameFilterBtn" outline icon="calendar_month" class="q-mt-xs s-btn" size="sm"
        label="Filter By Lastname / Case No." @click="lastNameCaseNoFilter" color="amber-8" />
      <q-space class="q-mb-sm" />
      <q-btn icon="search" class="q-mt-xs s-btn" label="Search" type="submit" color="primary" />
    </q-form>
  </div>
  <q-separator class="q-ml-md q-mr-md" />
  <div clas="row q-pa-xl">
    <div class="col-md-3">
      <q-toggle v-if="showToggle" size="xl" v-model="tableView" icon="table_view" label="View in Table" />
    </div>
  </div>
  <div v-if="withResult" class="row q-pa-lg">
    <div class="col-md-12">
      <q-table v-if="withResult" title="Patients" :rows="searchedPatients" :columns="columns" :filter="filter"
        :loading="loading" row-key="title">
        <template v-slot:body-cell-actions="props">
          <q-td :props="props">
            <q-btn v-if="props.row.CF4_STATUS" label="UPDATE CF4" size="sm" color="green"
              @click="getPatientDetails(props.row.DATA_NO)" class="q-mr-sm" />
            <q-btn unelevated v-else color="red" size="sm" label="CREATE CF4" @click="createCF4Confirm(props.row)" />
          </q-td>
        </template>
        <template #loading>
          <q-inner-loading showing color="primary" size="90px" />
        </template>
      </q-table>
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
      loading,
      columns,
      blueModel: ref(true),
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
        filterPatient: "",
        filterDate: "",
      },
      withResult: false,
      lastNameFilterBtn: false,
      dateAdFilterBtn: true,
      fByLastNameCaseNo: true,
      filterByDateAd: false,
      showToggle: false,
      tableView: false,
      cf4Modal: false,
      dialogTitle: "",
      pDetails: {},
      patientInfo: {},
      page: 1,
      currentPage: 1,
      nextPage: null,
      totalPages: 12,
      pageStatus: "",
      filterMessage: "",
      resultPatients: [],
      searchByLastNameCaseNo: CONSTANTS.SEARCH_BY_LASTNAME_CASENO,
      searchByDate: CONSTANTS.SEARCH_BY_DATE,
      searchLabel: CONSTANTS.SEARCH_LABEL,
      btnCf4Label: CONSTANTS.BUTTON_CF4_LABEL,
      loadingLabel: CONSTANTS.LOADING_LABEL
    };
  },
  computed: {
    ...mapGetters({
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
        lastNameCaseNo: this.search.filterPatient,
        dateAdAndDis: this.search.filterDate,
      };
      if (data.lastNameCaseNo.length >= 2) {
        this.visible = true;
        const result = await this.$store.dispatch("patientsCf4/searchPatientsByLastNameCaseNo", data);
        result.status === 200 ?
          setTimeout(() => {
            this.resultPatients = this.searchedPatients;
            result.data.length <= 0 ? this.filterMessage = CONSTANTS.FILTER_ERROR : "";
            this.visible = false
            this.loading = false
            this.withResult = true
          }, 1000)
          : this.pageStatus = CONSTANTS.API_ERROR;
      } else {
        this.visible = true;
        const result = await this.$store.dispatch("patientsCf4/searchPatientsByDate", data);
        result.status === 200 ?
          setTimeout(() => {
            this.resultPatients = this.searchedPatients;
            result.data.length <= 0 ? this.filterMessage = CONSTANTS.FILTER_ERROR : "";
            this.visible = false
            this.loading = false
          }, 1000)
          : this.pageStatus = CONSTANTS.API_ERROR;
      }
    },
    async getPatientDetails(dataNo) {
      await this.$router.push({ path: "patient_cf4", query: { pNo: dataNo } });
    },
    createCF4Confirm(data) {
      this.cf4Modal = true
      this.dialogTitle = "CREATE PATIENT CF4";
      this.patientInfo = data
    },
    dateAdFilter() {
      this.filterByDateAd = true
      this.fByLastNameCaseNo = false
      this.dateAdFilterBtn = false
      this.lastNameFilterBtn = true
    },
    lastNameCaseNoFilter() {
      this.filterByDateAd = false
      this.fByLastNameCaseNo = true
      this.dateAdFilterBtn = true
      this.lastNameFilterBtn = false
    },
    closeCF4ConfirmDialog(data) {
      this.cf4Modal = false
    }
  }
})

const columns = [
  {
    name: 'PATIENT NO',
    required: true,
    label: 'PATIENT NO',
    align: 'left',
    field: row => row.PATIENTNO[0],
    format: val => `${val}`,
    sortable: true
  },
  {
    name: 'CASE NO',
    align: 'left',
    label: 'CASE NO',
    field: 'CASENO',
    sortable: true
  },
  {
    name: 'LAST NAME',
    align: 'left',
    label: 'LAST NAME',
    field: 'LASTNAME',
    sortable: true
  },
  {
    name: 'FIRST NAME',
    align: 'left',
    label: 'FIRST NAME',
    field: 'FIRSTNAME',
    sortable: true
  },
  {
    name: 'DATE ADMITTED',
    align: 'left',
    label: 'DATE ADMITTED',
    field: 'DATEAD',
    sortable: true
  },
  {
    name: 'DATE DISCHARGED',
    align: 'left',
    label: 'DATE DISCHARGED',
    field: 'DATEDIS',
    sortable: true
  },
  {
    name: 'actions',
    align: 'center',
    label: 'ACTION',
    field: 'actions',
    sortable: false
  }
]
const loading = ref(true)
</script>
<style scoped>
.q-f-caseno {
  width: 150em
}

.q-f-dateAd {
  width: 25em
}

.q-f-dateDis {
  width: 25em
}

.container-pos {
  margin-left: auto;
  margin-right: auto;
  width: 50%;
}

.page-pos {
  margin-left: auto;
  margin-right: auto;
  width: 20%;
}

.avatar-margin {
  margin-top: -40px;
}
</style>
