<template>
  <reused-form
      @click="formAddPeople"
  >
    <div class="form__element">
      <reused-input
          :type="'text'"
          :placeholder="'firstName'"
          v-model="formData.firstName"
      />
      <error
          :text="'Поле firstName должно быть заполнено'"
          :class="{'error_display': firstName_check}"
      />
    </div>
    <div class="form__element">
      <reused-input
          :type="'text'"
          :placeholder="'secondName'"
          v-model="formData.secondName"
      />
      <error
          :text="'Поле secondName должно быть заполнено'"
          :class="{'error_display': secondName_check}"
      />
    </div>
    <div class="form__element">
      <reused-submit
          :type="'submit'"
          :buttonText="'Добавить'"
          :class="'button__add'"
      />
    </div>
  </reused-form>
</template>
<script>
import {mapActions} from "vuex";
import ReusedInput from "@/components/reused/reusedInput";
import ReusedSubmit from "@/components/reused/reusedSubmit";
import Error from "@/components/reused/error";
import ReusedForm from "@/components/reused/reusedForm";

export default {
  components: {ReusedForm, Error, ReusedSubmit, ReusedInput},

  data: () => ({
    firstName_check: false,
    secondName_check: false,
    formData: {
      firstName: '',
      secondName: ''
    }
  }),
  methods: {
    ...mapActions(['addPeople']),
    formAddPeople() {
      if (this.formData.secondName.trim() != '' && this.formData.firstName.trim() != '') {
        let data = {...this.formData}
        this.addPeople(data)
        this.formData.secondName = this.formData.firstName = ''
        this.secondName_check = this.firstName_check = false

      } else {
        if (this.formData.secondName.trim() == '') this.secondName_check = true
        else this.secondName_check = false

        if (this.formData.firstName.trim() == '') this.firstName_check = true
        else this.firstName_check = false
      }
    }
  }
}
</script>
