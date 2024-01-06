<template>
  <table class="border-collapse border border-slate-400 table-auto w-full mt-5">
    <thead>
      <tr class="">
        <th class="border border-slate-300 px-4 py-2">Category</th>
        <th class="border border-slate-300 px-4 py-2">Sub Category</th>
        <th class="border border-slate-300 px-4 py-2">Process Type</th>
        <th class="border border-slate-300 px-4 py-2">Brand</th>
        <th class="border border-slate-300 px-4 py-2">Model</th>
        <th class="border border-slate-300 px-4 py-2">Type</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td class="border border-slate-300 px-4 py-2">
          {{ item.category?.name ? item.category.name : "-" }}
          <span v-if="item.category?.id == ''">/ {{ item.userCategory }}</span>
        </td>
        <td class="border border-slate-300 px-4 py-2">
          {{ item.subCategory?.name ? item.subCategory.name : "-" }}
          <span v-if="item.subCategory?.id == ''"
            >/ {{ item.userSubCategory }}</span
          >
        </td>
        <td class="border border-slate-300 px-4 py-2">
          {{ item.processType?.name ? item.processType.name : "-" }}
          <span v-if="item.processType?.id == ''"
            >/ {{ item.userProcessType }}</span
          >
        </td>
        <td class="border border-slate-300 px-4 py-2">
          {{ item.brand?.name ? item.brand.name : "-" }}
          <span v-if="item.brand?.id == ''">/ {{ item.userBrand }}</span>
        </td>
        <td class="border border-slate-300 px-4 py-2">
          {{ item.model?.name ? item.model.name : "-" }}
          <span v-if="item.model?.id == ''">/ {{ item.userModel }}</span>
        </td>
        <td class="border border-slate-300 px-4 py-2">
          {{ item.type?.name ? item.type.name : "-" }}
          <span v-if="item.type?.id == ''">/ {{ item.userType }}</span>
        </td>
      </tr>
    </tbody>
  </table>
</template>
<script>
export default {
  props: ["item"],
};
</script>
