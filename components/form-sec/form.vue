<template>
  <form class="form p-5 mt-5">
    <div class="form__group" v-for="(item, index) in form" :key="index">
      <label
        class="form__label"
        :class="item.required ? 'form__label--required' : ''"
        >{{ item.label }}</label
      >
      <multiselect
        trackBy="id"
        v-model="state.form[item.id]"
        label="name"
        :options="options[item.options]"
        :searchable="true"
        :show-labels="false"
        @close="v$.form[item.id].$touch"
      >
      </multiselect>
      <div class="form-error" v-if="v$.form[item.id].$error">
        {{ item.label }} is required
      </div>
      <input
        v-if="state.form[item.id]?.id == ''"
        class="form__contorl"
        type="text"
        placeholder="From user"
        v-model="state.form[item.userId]"
        @blur="v$.form[item.userId].$touch"
      />
      <div class="form-error" v-if="v$.form[item.userId].$error">
        Field is required
      </div>
    </div>
    <button
      class="bg-cyan-500 p-3 px-5 w-full sm:w-60"
      @click.prevent="submitData()"
    >
      Submit
    </button>
  </form>
</template>
<script>
import Multiselect from "vue-multiselect";
import { getAllCategories, getAllProps, getAllOptions } from "./services";
import { useVuelidate } from "@vuelidate/core";
import { required, requiredIf } from "@vuelidate/validators";
import { reactive } from "vue";
import data from "../../data/data.json";
export default {
  components: {
    Multiselect,
  },
  data() {
    return {
      form: data,
      options: {
        categories: [
          {
            id: "",
            name: "Other",
          },
        ],
        subCategories: [],
        processTypes: [],
        brands: [],
        models: [],
        types: [],
      },
    };
  },
  methods: {
    getCategories() {
      getAllCategories()
        .then((res) => {
          this.options.categories = [
            ...res.data.data.categories,
            ...this.options.categories,
          ];
        })
        .catch(() => {});
    },
    getProps(id) {
      getAllProps(id)
        .then((res) => {
          this.options.processTypes = [
            ...res.data.data,
            {
              id: "",
              name: "Other",
            },
          ];
        })
        .catch(() => {});
    },
    getOptions(id) {
      getAllOptions(id)
        .then((res) => {
          this.options.models = [
            ...res.data.data,
            {
              id: "",
              name: "Other",
            },
          ];
        })
        .catch(() => {});
    },
    submitData() {
      this.v$.$validate();
      if (!this.v$.$error) {
        this.$emit("getformData", this.state.form);
      }
    },
  },
  mounted() {
    this.getCategories();
  },
  computed: {
    getCategory() {
      return this.state.form.category;
    },
    getSubCategory() {
      return this.state.form.subCategory;
    },
    getProcessType() {
      return this.state.form.processType;
    },
    getBrands() {
      return this.state.form.brand;
    },
    getModel() {
      return this.state.form.model;
    },
  },
  setup() {
    const state = reactive({
      form: {
        category: null,
        userCategory: null,
        subCategory: null,
        processType: null,
        userProcessType: null,
        brand: null,
        model: null,
        userModel: null,
        type: null,
        userType: null,
      },
    });
    const rules = {
      form: {
        category: { required },
        subCategory: {
          requiredIf: requiredIf(function () {
            return this.state.form.category?.id != "";
          }),
        },
        processType: {},
        brand: {},
        userBrand: {
          requiredIf: requiredIf(function () {
            return this.state.form.brand?.id == "";
          }),
        },
        model: {},
        userModel: {
          requiredIf: requiredIf(function () {
            return this.state.form.model?.id == "";
          }),
        },
        type: {},
        userType: {
          requiredIf: requiredIf(function () {
            return this.state.form.type?.id == "";
          }),
        },
        userCategory: {
          requiredIf: requiredIf(function () {
            return this.state.form.category?.id == "";
          }),
        },
        userSubCategory: {
          requiredIf: requiredIf(function () {
            return this.state.form.subCategory?.id == "";
          }),
        },
        userProcessType: {
          requiredIf: requiredIf(function () {
            return this.state.form.processType?.id == "";
          }),
        },
      },
    };

    const v$ = useVuelidate(rules, state);

    return { state, v$ };
  },
  watch: {
    getCategory(newVal) {
      if (newVal && newVal && newVal.id != "") {
        this.options.subCategories = [
          ...newVal.children,
          {
            id: "",
            name: "Other",
          },
        ];
      }
      else{
        this.options.subCategories = []
        this.state.form.subCategory = null
      }
    },
    getSubCategory(newVal) {
      if (newVal && newVal.id != "") {
        this.getProps(newVal.id);
      }else{
        this.options.processTypes = []
        this.state.form.processType = null

      }
    },
    getProcessType(newVal) {
      if (newVal && newVal.id != "") {
        this.options.brands = [
          ...newVal.options,
          {
            id: "",
            name: "Other",
          },
        ];
      }
      else{
        this.options.brands = []
        this.state.form.brand = null

      }
    },
    getBrands(newVal) {
      if (newVal && newVal.id != "") {
        this.getOptions(newVal.id);
      }else{
        this.options.models = []
        this.state.form.model = null

      }
    },
    getModel(newVal) {
      if (newVal && newVal.id != "") {
        this.options.types = [
          ...newVal.options,
          {
            id: "",
            name: "Other",
          },
        ];
      }else{
        this.options.types = []
        this.state.form.t = null

      }
    },
  },
};
</script>
