<template>
  <div>
    <div v-if="!attraction" class="main-content">
      <breadcrumb :items="[{label: $t('loading')}]" />
      <skeleton-card-list />
    </div>

    <div v-if="attraction" class="main-content">
      <breadcrumb :items="breadcrumbs" />

      <!-- Image add -->
      <div class="text-center mb-3">
        <action-button v-b-modal.add-attraction-image-form add-icon>
          {{ $t('upload_image') }}
        </action-button>

        <add-attraction-image-form :attraction-id="attraction.id" @finish="loadAttraction" />
      </div>

      <div v-if="attraction.images.length === 0">
        <no-data />
      </div>

      <b-row v-else>
        <template v-for="(image, index) in attraction.images">
          <b-col :key="index" md="6" xl="4" class="mb-3">
            <b-card no-body class="card-list">
              <b-card-img :alt="attraction.name" :src="image.middle" top class="pointer" @click="currentImage = index" />

              <template v-slot:footer>
                <!-- eslint-disable-next-line vue/no-v-html -->
                <span class="text-small text-muted" v-html="buildCopyrightNotice(image)" />

                <div v-if="canDeleteImage(image)" class="mt-3">
                  <action-button v-b-modal="`delete-attraction-image-form-${image.id}`" delete-icon>
                    {{ $t('delete') }}
                  </action-button>

                  <delete-attraction-image-form :attraction-id="attraction.id" :image-id="image.id" @finish="loadAttraction()" />
                </div>

                <div v-else class="mt-3">
                  <action-button delete-icon disabled>
                    {{ $t('delete') }}
                  </action-button>
                </div>
              </template>
            </b-card>
          </b-col>
        </template>

        <client-only>
          <CoolLightBox
            :items="attraction.images.map(item => ({thumb: item.middle, src: item.large, description: buildCopyrightNotice(item)}))"
            :index="currentImage"
            loop
            @close="currentImage = null"
          />
        </client-only>
      </b-row>
    </div>
  </div>
</template>

<script>
import CoolLightBox from 'vue-cool-lightbox'
import 'vue-cool-lightbox/dist/vue-cool-lightbox.min.css'

export default {
  components: { CoolLightBox },

  async fetch () {
    await this.loadAttraction()
  },

  data () {
    return {
      park: null,
      attraction: null,
      currentImage: null
    }
  },

  computed: {
    breadcrumbs () {
      return [
        {
          label: this.$t('home'),
          route: 'index'
        },
        {
          label: this.$t('parks'),
          route: 'parks'
        },
        {
          label: this.park.name,
          route: { name: 'parks-park', params: { park: this.park.fullSlug } }
        },
        {
          label: this.$t('attractions'),
          route: { name: 'parks-park-attractions', params: { park: this.park.fullSlug } }
        },
        {
          label: this.attraction.name,
          route: { name: 'attractions-attraction', params: { attraction: this.attraction.fullSlug } }
        },
        {
          label: this.$t('image_gallery')
        }
      ]
    }
  },

  methods: {
    async loadAttraction () {
      const me = this

      const result = await me.$graphql('1305de8c-8477-4c6f-92f4-1da804e974f9', {
        attractionSlug: me.$route.params.attraction,
        locale: me.$i18n.locale
      })

      if (!result.attraction) {
        me.$nuxt.error({ statusCode: 404 })

        return
      }

      this.park = result.attraction.park
      this.attraction = result.attraction
    },

    buildCopyrightNotice (image) {
      const profileUrl = this.$router.resolve(this.localePath({
        name: 'profile-username',
        params: { username: image.contributor.username }
      }))

      return this.$t('image_copyright', {
        year: image.date.value.substr(0, 4),
        profileUrl: image.customCopyrightUrl ?? profileUrl.resolved.fullPath,
        profileName: image.customCopyrightName ?? image.contributor.username,
        licenseUrl: image.license.url,
        licenseName: image.license.name
      })
    },

    canDeleteImage (image) {
      const me = this

      if (!me.$store.getters['account/hasToken']) {
        return false
      }

      if (me.$store.getters['account/getUsername'] === image.contributor.username) {
        return true
      }

      return me.$store.getters['account/getRoles'].includes('ROLE_MAINTAINER')
    }
  },

  head () {
    const me = this

    if (me.attraction) {
      return this.$createHead({
        title: me.attraction.name,
        description: me.attraction.shortDescription ?? me.$t('generic_attraction_description', {
          park: me.park.name,
          attraction: me.attraction.name
        }),
        image: me.attraction.images.length > 0 ? me.attraction.images[0].large : null,
        structuredData: me.attraction.images.map(function (image) {
          return {
            '@context': 'https://schema.org/',
            '@type': 'ImageObject',
            contentUrl: image.large,
            license: image.license.url,
            acquireLicensePage: me.$route.fullPath
          }
        })
      })
    }

    return {}
  }
}
</script>
