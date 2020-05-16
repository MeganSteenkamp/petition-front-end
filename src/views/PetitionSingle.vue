<template>
  <div class="petition-single">
    <section class="hero is-light">
      <div class="hero-body">
        <div class="container">
          <img class="container__image" :src="getImageUrl(petition)" />
          <div class="container__text">
            <h1 class="title">{{ petition.title }}</h1>
            <h2 class="title is-6">
              {{ petition.authorName }} started this petition
              <br />
              <div class="tag is-medium" :style="labelStyle(petition)">{{ petition.category }}</div>
              <br />
              <br />
            </h2>
            <p class="is-size-8">
              Start date:
              {{ petition.createdDate | moment }}
            </p>
            <p class="is-size-8">
              Closing date:
              {{ petition.closingDate | moment}}
            </p>
            <p class="is-size-8">
              Signatures:
              {{ petition.signatureCount }}
            </p>
          </div>
        </div>
      </div>
    </section>
    <section class="petition-content">
      <div class="columns">
        <div class="column is-two-thirds">
          <p class="description">{{ petition.description }}</p>
          <div v-if="signatures && signatures.length > 0">
            <div id="signatures">
              <h4>
                <strong>Signatories:</strong>
              </h4>
              <a v-for="signature in signatures" :key="signature.signatoryId" class="signatures">
                <SignatoryCard :signatory="signature" />
                <br />
              </a>
            </div>
          </div>
        </div>

        <div class="column is-one-third">
          <button
            v-if="this.user && closingDateIsValid(petition) &&!isAuthor(petition) && !hasSigned(signatures)"
            class="button is-danger is-rounded is-medium is-fullwidth"
            @click="signPetition(petition)"
          >Sign this petition</button>
          <button
            v-if="this.user && closingDateIsValid(petition) &&!isAuthor(petition) && hasSigned(signatures)"
            class="button is-dark is-rounded is-medium is-fullwidth"
            @click="removeSignature(petition)"
          >Remove signature</button>
          <router-link v-if="!this.user && closingDateIsValid(petition)" :to="{ name: 'login' }">
            <button
              class="button is-danger is-rounded is-medium is-fullwidth"
            >Sign in to sign this petition</button>
          </router-link>
          <br />
          <h4>
            <strong>Share via social media:</strong>
          </h4>
          <ShareNetwork
            v-for="network in networks"
            :network="network.network"
            :key="network.key"
            :url="sharing.url"
            :title="petition.title"
            :description="petition.description"
            :quote="petition.description"
            :hashtags="sharing.hashtags"
            :twitterUser="sharing.twitterUser"
          >
            <div class="tag is-medium is-link">{{ network.name }}</div>
          </ShareNetwork>
          <br />
          <div v-if="signatures && signatures.length > 0">
            <div id="author">
              <h4>
                <br />
                <strong>Author:</strong>
              </h4>
              <a v-for="signature in signatures" :key="signature.signatoryId" class="author">
                <div v-if="petition.authorName == signature.name">
                  <SignatoryCard :signatory="signature" />
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import Vue from "vue";
import { mapGetters, mapActions } from "vuex";
import Moment from "moment";
import api from "./../api";
import SignatoryCard from "./../components/SignatoryCard";
import VueSocialSharing from "vue-social-sharing";

Vue.use(VueSocialSharing);

export default {
  components: {
    SignatoryCard
  },
  data() {
    return {
      sharing: {
        url: "https://www.parliament.nz/en/pb/petitions/",
        hashtags: "vuejs,seng365,petition,makeachange",
        twitterUser: "meganspetitionsite"
      },
      networks: [
        {
          network: "facebook",
          name: "Facebook"
        },
        {
          network: "linkedin",
          name: "LinkedIn"
        },
        {
          network: "twitter",
          name: "Twitter"
        }
      ]
    };
  },
  mounted: function() {
    this.loadUser();
    this.loadPetition(this.petitionId);
    this.loadSignatures(this.petitionId);
  },
  methods: {
    ...mapActions(["loadUser", "loadPetition", "loadSignatures"]),
    getImageUrl(p) {
      return api.endpoint(`petitions/${p.petitionId}/photo`);
    },
    closingDateIsValid(p) {
      const today = Moment();
      const closingDate = Moment(p.closingDate);
      if (closingDate > today) {
        return true;
      }
    },
    hasSigned(s) {
      for (const signature of s) {
        if (signature.name == this.user.name) {
          return true;
        }
      }
    },
    isAuthor(p) {
      if (p.authorName === this.user.name) {
        return true;
      }
    },
    labelStyle(p) {
      const categoryColorMap = {
        Entertainment: "#fff6a3",
        Immigration: "#daffa3",
        Animals: "#ffc8a3",
        Environment: "#c8a3ff",
        "Human rights": "#a3acff"
      };
      return {
        backgroundColor: categoryColorMap[p.category] || "grey"
      };
    },
    async signPetition(p) {
      await api.post(`petitions/${p.petitionId}/signatures`, {});
      await this.loadSignatures(this.petitionId);
    },
    async removeSignature(p) {
      await api.delete(`petitions/${p.petitionId}/signatures`, {});
      await this.loadSignatures(this.petitionId);
    }
  },
  filters: {
    moment(date) {
      if (date) {
        return Moment(date).format("LL");
      }
      return "No closing date set";
    }
  },
  computed: {
    ...mapGetters(["petition", "signatures", "user"]),
    petitionId() {
      return this.$route && this.$route.params.petitionId;
    }
  }
};
</script>

<style lang="scss" scoped>
.tag {
  width: 120px;
  margin-right: 10px;
}
.petition-single {
  margin-top: 30px;
}
.hero {
  margin-bottom: 70px;
  border-radius: 25px;
}
.title {
  line-height: 40px;
}
.container {
  &__image {
    max-height: 300px;
    max-width: 500px;
    float: right;
  }
  &__text {
    display: inline;
  }
}
.image {
  margin-top: 50px;
}
.description {
  min-height: 70px;
  margin-bottom: 30px;
  padding-left: 30px;
  padding-right: 60px;
}
.card {
  gap: 20px;
}
</style>