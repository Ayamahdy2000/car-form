<template>
  <form class="form p-5 mt-5">
    <div class="form__group" v-for="(item, index) in form" :key="index">
      <div>
        <label
          class="form__label"
          :class="item.required ? 'form__label--required' : ''"
          >{{ item.label }}</label
        >
        <multiselect
          trackBy="id"
          v-model="state.form[item.id]"
          label="name"
          :options="
            item.level == 'first' ? options[item.options] : item.options
          "
          :searchable="true"
          :show-labels="false"
          @select="select($event, item.level, index, item.label)"
          @close="item.required ? v$.form[item.id].$touch : ''"
        >
        </multiselect>
        <div class="form-error" v-if="item.required && v$.form[item.id].$error">
          {{ item.label }} is required
        </div>
        <input
          v-if="state.form[item.id]?.id == ''"
          class="form__contorl"
          type="text"
          placeholder="From user"
          @input="userInput(item.id, item.userId)"
          v-model="state.form[item.userId]"
        />
      </div>
    </div>
    <img
      src="../../assets/images/spinner.gif"
      v-if="isLoading"
      class="h-30 w-30 flex mx-auto"
      alt="loading"
    />
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
      form: [...data],
      secondForm: [],
      isLoading: false,
      options: {
        categories: [],
        subCategories: [],
      },
    };
  },
  methods: {
    getCategories() {
      this.isLoading = true;
      getAllCategories()
        .then((res) => {
          this.options.categories = [
            ...res.data.data.categories,
            ...this.options.categories,
          ];
          this.isLoading = false;
        })
        .catch(() => {
          this.isLoading = false;
        });
    },
    getProps(id) {
      this.isLoading = true;
      this.form = [...data];
      getAllProps(id)
        .then((res) => {
          let arr = res.data.data;
          arr.forEach((el) => {
            el.options = [
              {
                id: "",
                name: "Other",
              },
              ...el.options,
            ];
            let obj = {
              label: el.name,
              id: el.name.replaceAll(" ", ""),
              userId: el.name.replaceAll(" ", "") + "User",
              options: el.options,
              required: false,
              level: "second",
            };
            this.form.push(obj);
            this.isLoading = false;
          });
          this.secondForm = [...this.form];
        })

        .catch(() => {
          this.isLoading = false;
        });
    },
    getOptions(id, index) {
      this.isLoading = true;

      getAllOptions(id)
        .then((res) => {
          let arr = res.data.data;
          let options = [];
          this.form = [...this.secondForm];
          arr.forEach((el) => {
            el.options = [
              {
                id: "",
                name: "Other",
              },
              ...el.options,
            ];

            let obj = {
              label: el.name,
              id: el.name.replaceAll(" ", ""),
              userId: el.name.replaceAll(" ", "") + "User",
              options: el.options,
              required: false,
              level: "third",
              num: el.id,
            };
            options.push(obj);
            this.isLoading = false;
          });
          this.form = [
            ...this.form.slice(0, index + 1),
            ...options,
            ...this.form.slice(index + 1),
          ];
          this.isLoading = false;
        })
        .catch(() => {
          this.isLoading = false;
        });
    },
    submitData() {
      this.v$.$validate();
      if (!this.v$.$error) {
        this.$emit("getformData", this.state.form);
      }
    },
    select(e, level, index, name) {
      e.parent = name;
      if (e.id != "") {
        if (level == "second") {
          this.getOptions(e.id, index);
        }
      } else {
        if (level == "second") {
          this.form = [...this.secondForm];
        } 
      }
    },
    userInput(id, userId) {
     
      this.state.form[id].userInput = this.state.form[userId]
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
  },
  setup() {
    const state = reactive({
      form: {
        category: null,
        subCategory: null,
      },
    });
    const rules = {
      form: {
        category: { required },
        subCategory: {
          required,
        },
      },
    };

    const v$ = useVuelidate(rules, state);

    return { state, v$ };
  },
  watch: {
    getCategory(newVal) {
      if (newVal) {
        this.options.subCategories = [...newVal.children];
      } else {
        this.options.subCategories = [];
        this.state.form.subCategory = null;
      }
    },
    getSubCategory(newVal) {
      if (newVal) {
        this.getProps(newVal.id);
      }
    },
  },
};
</script>
