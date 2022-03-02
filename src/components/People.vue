<template>
  <div class="table">
    <div class="table__element" v-for="item in returnData" :key="item.uuid">
      <people-element
        :uuid = item.uuid
        :firstName = item.firstName
        :secondName = item.secondName
      />
    </div>
    <div class="table__element table__element-add">
      <add-people />
    </div>
  </div>

</template>
<script>
import {mapGetters} from 'vuex'
import AddPeople from "@/components/addPeople";
import PeopleElement from "@/components/peopleElement";

export default {
  components: {PeopleElement, AddPeople},
  computed: {
    ...mapGetters(['returnData'])
  }
}
</script>
<style lang="css" src="../assets/style/style.css" />
