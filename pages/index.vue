<template>
  <div class="container mx-auto">
    <Form @getformData="getData" v-if="!hideForm"/>
    <Table v-else :item="form"/>
    
  </div>
</template>
<script>
import Form from "../components/form-sec/form.vue";
import Table from "../components/table-sec/table.vue"

export default {
  components: {
    Form,
    Table
  },
  data() {
    return {
      form: {},
      hideForm : false
    };
  },
  methods: {
    getData(val) {
      this.form = val;
      this.hideForm = true
    },
  },
};
</script>
