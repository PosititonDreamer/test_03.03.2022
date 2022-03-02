<template>
  <div class="people__element">
    <reused-form @click="formUpdatePeople" >
      <div class="form__element">
        <reused-input
            :type="'text'"
            :placeholder="'firstName'"
            v-model="formData.firstName"
            :readonly="update"
            :class="['form__input', {'form__input-active': !update}]"
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
            :readonly="update"
            :class="['form__input', {'form__input-active': !update}]"
        />
        <error
            :text="'Поле secondName должно быть заполнено'"
            :class="{'error_display': secondName_check}"
        />
      </div>
      <div class="form__element">
        <reused-submit
            v-if="!update"
            :type="'submit'"
            :buttonText="'Сохранить'"
            :class="'button__update button__update-active'"
        />

      </div>
    </reused-form>
    <reused-form  @click="update = !update" >
      <reused-submit
          v-if="update"
          :type="'submit'"
          :buttonText="'Изменить'"
          :class="'button__update'"
      />
    </reused-form>
    <reused-form  @click="formDeletePeople" >
      <reused-submit
          :type="'submit'"
          :buttonText="'Удалить'"
          :class="'button__delete'"
      />
    </reused-form>
  </div>
</template>
<script>
import {mapActions} from "vuex";
import ReusedInput from "@/components/reused/reusedInput";
import ReusedSubmit from "@/components/reused/reusedSubmit";
import Error from "@/components/reused/error";
import ReusedForm from "@/components/reused/reusedForm";

export default {
  components: {ReusedForm, Error, ReusedSubmit, ReusedInput},
  props: {
    uuid: String,
    firstName: String,
    secondName: String
  },
  data: () => ({
    update: true,
    firstName_check: false,
    secondName_check: false,
    formData: {
      uuid: '',
      firstName: '',
      secondName: ''
    }
  }),
  mounted() {
    this.formData.uuid = this.uuid
    this.formData.firstName = this.firstName
    this.formData.secondName = this.secondName
  },
  methods: {
    ...mapActions(['updatePeople', 'deletePeople']),
    formUpdatePeople() {
      if (this.formData.secondName.trim() != '' && this.formData.firstName.trim() != '') {
        let data = {...this.formData}
        this.updatePeople(data)
        .then(result=> {
          if(result) {
            this.secondName_check = this.firstName_check = false
            this.update = true
          }
          else {
            alert('Ошибка в отправке данных')
          }
        })
      } else {
        if (this.formData.secondName.trim() == '') this.secondName_check = true
        else this.secondName_check = false

        if (this.formData.firstName.trim() == '') this.firstName_check = true
        else this.firstName_check = false
      }
    },
    formDeletePeople() {
      this.deletePeople(this.formData.uuid)
    }
  }
}
</script>