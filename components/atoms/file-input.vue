<!--
  - This file is part of coaster.cloud.
  -
  - (c) Michel Chowanski <michel@chowanski.de>
  -
  - For the full copyright and license information, please view the LICENSE
  - file that was distributed with this source code.
  -->

<template>
  <b-form-group :label-cols-sm="labelCol" :label-for="id" :label="label" :description="description">
    <b-form-file :id="id" v-model="modelValue" :state="violations.length === 0 ? null : false" drop-placeholder="Drop file here..." />
    <b-form-invalid-feedback v-for="(violation, index) in violations" :key="index" :state="false">
      {{ violation }}
    </b-form-invalid-feedback>
  </b-form-group>
</template>

<script>
export default {
  props: {
    id: {
      type: String,
      required: true
    },

    value: {
      type: Object,
      default: () => null
    },

    label: {
      type: String,
      default: null
    },

    description: {
      type: String,
      default: null
    },

    violations: {
      type: Array,
      default: () => []
    },

    labelCol: {
      type: Number,
      default: 4
    }
  },

  computed: {
    modelValue: {
      get () {
        return this.value
      },

      set (value) {
        this.$emit('input', value)
      }
    }
  }
}
</script>
