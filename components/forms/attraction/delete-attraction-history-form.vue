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
    :id="`delete-attraction-history-form-${historyId}`"
    size="sm"
    :title="$t('please_confirm')"
    no-stacking
    scrollable
  >
    <p>{{ $t('confirm_delete') }}</p>

    <template v-slot:modal-footer="{ ok }">
      <b-button variant="secondary" @click="ok">
        {{ $t('close') }}
      </b-button>

      <b-button variant="danger ml-auto" @click="save(ok)">
        {{ $t('delete') }}
      </b-button>
    </template>
  </b-modal>
</template>

<script>
import AttractionUpdateForm from '~/components/mixins/attraction-update-form'

export default {
  mixins: [AttractionUpdateForm],

  props: {
    attractionId: {
      type: String,
      required: true
    },

    historyId: {
      type: String,
      required: true
    }
  },

  data () {
    return {
      name: null
    }
  },

  methods: {
    async save (ok) {
      await this.updateAttraction(this.attractionId, { deleteAttractionHistories: [this.historyId] }, ok)
    }
  }
}
</script>
