<template>
  <div class="app-footer">
    <div class="row">
      <div class="col-md-9">
        <markdown-text :text="$t('footer_license')" />
      </div>
    </div>
    <div class="footer-bottom border-top pt-3 d-flex flex-column flex-sm-row align-items-center">
      <div class="d-flex align-items-center">
        <img class="logo" src="~/assets/images/logo.png">
        <div>
          <div>
            <p class="m-0">
              &copy; {{ new Date().getFullYear() }} coaster.cloud | {{ $config.appVersion }} |
              <nuxt-link :to="localePath('activities')">
                {{ $t('activities') }}
              </nuxt-link>
            </p>
            <p class="m-0">
              <nuxt-link :to="localePath('terms')">
                {{ $t('terms') }}
              </nuxt-link> |
              <nuxt-link :to="localePath('imprint')">
                {{ $t('imprint') }}
              </nuxt-link> |
              <nuxt-link :to="localePath('privacy')">
                {{ $t('privacy') }}
              </nuxt-link>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@import "~/assets/css/ci.scss";

.app-footer {
  background: $gray-200;
  padding: 1.25rem;

  .footer-bottom {
    width: 100%;

    .logo {
      width: 3rem;
      height: auto;
      margin: 4px;
    }
  }
}
</style>
