<template>
  <div class="table">
    <table
      class="border-collapse border border-slate-400 table-auto w-full mt-5"
    >
      <thead>
        <tr>
          <th
            v-for="(cell, index) in item"
            :key="index"
            class="border border-slate-300 px-4 py-2"
          >
            {{ cell.parent }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td
            class="border border-slate-300 px-4 py-2"
            v-for="(cell, index) in item"
            :key="index"
          >
            {{ cell.name ? cell.name : "-" }}
            <span v-if="cell.id == ''">/ {{ cell.userInput }}</span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
export default {
  props: ["item"],
  data() {
    return {};
  },
  mounted() {
    for (const key in this.item) {
      if (typeof this.item[key] == "string") {
        delete this.item[key];
      }
    }
  },
};
</script>
