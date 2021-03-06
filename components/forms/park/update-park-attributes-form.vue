<!--
  - This file is part of coaster.cloud.
  -
  - (c) Michel Chowanski <michel@chowanski.de>
  -
  - For the full copyright and license information, please view the LICENSE
  - file that was distributed with this source code.
  -->

<template>
  <b-modal
    id="update-park-attributes-form"
    size="xs"
    :title="$t('modify.additional_information')"
    no-stacking
    scrollable
    @show="load"
  >
    <template v-for="(attribute, index) in parkAttributes">
      <template v-if="attribute.type === 'choice'">
        <select-input
          :id="`update-park-attributes-form-${attribute.key}`"
          :key="index"
          v-model="attribute.value"
          :label="attribute.label"
          :description="attribute.description"
          :violations="violations.filter(v => v.field === `[setAttributes][${index}][value]`).map(v => v.message)"
          :options="attribute.choices.map(i => ({value: i.key, text: i.label}))"
        />
      </template>

      <template v-else-if="attribute.type === 'boolean'">
        <select-input
          :id="`update-park-attributes-form-${attribute.key}`"
          :key="index"
          v-model="attribute.value"
          :label="attribute.label"
          :description="attribute.description"
          :violations="violations.filter(v => v.field === `[setAttributes][${index}][value]`).map(v => v.message)"
          :options="[{value: true, text: $t('yes')}, {value: false, text: $t('no')}]"
        />
      </template>

      <template v-else>
        <text-input
          :id="`update-park-attributes-form-${attribute.key}`"
          :key="index"
          v-model="attribute.value"
          :label="attribute.label"
          :description="attribute.description"
          :type="attribute.type === 'number' ? 'number' : 'text'"
          :step="attribute.scale === 0 ? 1 : 'any'"
          :violations="violations.filter(v => v.field === `[setAttributes][${index}][value]`).map(v => v.message)"
        />
      </template>
    </template>

    <template v-slot:modal-footer="{ ok }">
      <b-button variant="primary ml-auto" @click="save(ok)">
        {{ $t('save') }}
      </b-button>
    </template>
  </b-modal>
</template>

<script>
import ParkUpdateForm from '~/components/mixins/park-update-form'

export default {
  mixins: [ParkUpdateForm],

  props: {
    parkId: {
      type: String,
      required: true
    }
  },

  data () {
    return {
      parkAttributes: []
    }
  },

  methods: {
    async load () {
      const me = this

      const result = await me.$graphql('f8dc2ca8-dd04-49a6-a1f5-bb3ed7eff39c', {
        locale: me.$i18n.locale,
        parkId: me.parkId
      })

      if (result) {
        const values = {}

        result.park.attributes.forEach(function (item) {
          values[item.type.key] = item.value
        })

        me.parkAttributes = result.parkAttributeTypes.map(function (type) {
          return {
            ...type,
            ...{
              value: values[type.key] ?? null,
              description: type.unit ? me.$t(`input_hint.${type.unit.key}`) : null
            }
          }
        })
      }
    },

    async save (ok) {
      const attributes = []

      this.parkAttributes.forEach(function (item) {
        let value = item.value

        if (item.type === 'number' && item.scale > 0) {
          value = parseFloat(value)
        }

        if (item.type === 'number' && item.scale === 0) {
          value = parseInt(value)
        }

        if (item.type === 'boolean' && value !== null) {
          value = value === true ? 'yes' : 'no'
        }

        attributes.push({
          key: item.key,
          value
        })
      })

      await this.updatePark(this.parkId, { setAttributes: attributes }, ok)
    }
  }
}
</script>
