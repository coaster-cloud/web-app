<!--
  - This file is part of coaster.cloud.
  -
  - (c) Michel Chowanski <michel@chowanski.de>
  -
  - For the full copyright and license information, please view the LICENSE
  - file that was distributed with this source code.
  -->

<template>
  <div>
    <template v-if="images.length > 0">
      <template v-if="isClient">
        <b-carousel v-model="slide" :interval="4000" controls img-width="512" img-height="288">
          <template v-for="(image, index) in images">
            <nuxt-link :key="index" :to="localePath(galleryRoute)">
              <b-carousel-slide :img-src="image.middle" :img-alt="alt" />
            </nuxt-link>
          </template>
        </b-carousel>
      </template>

      <template v-else>
        <nuxt-link :to="localePath(galleryRoute)">
          <img :src="images[0].middle" class="img-fluid">
        </nuxt-link>
      </template>
    </template>

    <!-- Fallback image -->
    <template v-else>
      <router-link :to="localePath(galleryRoute)">
        <img src="~/assets/images/placeholder.middle.jpg" class="img-fluid">
      </router-link>
    </template>
  </div>
</template>

<script>
export default {
  props: {
    images: {
      type: Array,
      default: () => []
    },

    galleryRoute: {
      type: Object,
      required: true
    },

    alt: {
      type: String,
      default: null
    }
  },

  data () {
    return {
      slide: 0,
      isClient: false
    }
  },

  mounted () {
    this.isClient = true
  }
}
</script>
