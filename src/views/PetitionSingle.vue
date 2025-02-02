<template>
  <div>
    <div v-if="loading"></div>
    <div v-else class="petition-single">
      <section class="hero is-light">
        <div class="hero-body">
          <div class="container">
            <img class="container__image" :src="getImageUrl(petition)" />
            <div class="container__text">
              <p class="title">{{ petition.title }}</p>
              <p class="subtitle is-6">{{ petition.authorName }} started this petition</p>
              <div class="tag is-medium" :style="labelStyle(petition)">{{ petition.category }}</div>
              <p class="info is-size-8">
                <br />
                <strong>Created date:</strong>
                {{ petition.createdDate | moment }}
                <br />
                <strong>Closing date:</strong>
                {{ petition.closingDate | moment }}
                <br />
                <strong>Signatures:</strong>
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
              <div class="signatures">
                <h4>
                  <strong>Signatories:</strong>
                </h4>
                <div v-for="signature in signatures" :key="signature.signatoryId" class="signatures">
                  <SignatoryCard :signatory="signature" />
                  <br />
                </div>
              </div>
            </div>
          </div>

          <div class="column is-one-third">
            <button
              v-if="
                this.user &&
                  closingDateIsValid(petition) &&
                  !isAuthor(petition) &&
                  !hasSigned(signatures)
              "
              class="button is-danger is-medium is-light is-fullwidth"
              @click="signPetition(petition)"
            >Sign this petition</button>
            <button
              v-if="
                this.user &&
                  closingDateIsValid(petition) &&
                  !isAuthor(petition) &&
                  hasSigned(signatures)
              "
              class="button is-link is-medium is-light is-fullwidth"
              @click="removeSignature(petition)"
            >Remove signature</button>
            <router-link
              v-if="
                this.user && closingDateIsValid(petition) && isAuthor(petition)
              "
              :to="{
                name: 'edit-petition',
                params: { petitionId: petition.petitionId }
              }"
            >
              <button class="button is-info is-medium is-light is-fullwidth">Edit petition</button>
            </router-link>
            <button
              v-if="
                this.user && isAuthor(petition)
              "
              class="button is-warning is-medium is-light is-fullwidth"
              @click="deletePetition(petition)"
            >Delete petition</button>
            <router-link v-if="!this.user && closingDateIsValid(petition)" :to="{ name: 'login' }">
              <button class="button is-danger is-medium is-light is-fullwidth">Sign this petition</button>
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
              <div class="tag is-medium is-link">
                <font-awesome-icon style="margin-right:20px" :icon="['fab', network.icon]" />
                <span>{{ network.name }}</span>
              </div>
            </ShareNetwork>
            <br />
            <div v-if="signatures && signatures.length > 0">
              <div id="author">
                <h4>
                  <br />
                  <strong>Author:</strong>
                </h4>
                <div v-for="signature in signatures" :key="signature.signatoryId" class="author">
                  <div v-if="petition.authorName == signature.name">
                    <SignatoryCard :signatory="signature" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
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
        url: "http://www.parliament.nz/en/pb/petitions/",
        hashtags: "vuejs,seng365,petition,makeachange",
        twitterUser: "meganspetitionsite"
      },
      networks: [
        {
          network: "facebook",
          name: "Facebook",
          icon: "facebook-square"
        },
        {
          network: "linkedin",
          name: "LinkedIn",
          icon: "linkedin"
        },
        {
          network: "twitter",
          name: "Twitter",
          icon: "twitter-square"
        }
      ],
      loading: true
    };
  },
  async mounted() {
    this.loading = true;
    await this.loadUser();
    await this.loadPetition(this.petitionId);
    await this.loadSignatures(this.petitionId);
    this.loading = false;
  },
  methods: {
    ...mapActions(["loadUser", "loadPetition", "loadSignatures"]),
    getImageUrl(p) {
      return api.endpoint(`petitions/${p.petitionId}/photo`);
    },
    closingDateIsValid(p) {
      // May have no closing date
      if (p.closingDate == null) {
        return true;
      }
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
    async deletePetition(p) {
      const answer = confirm(
        "Are you sure you want to delete this petition? If you confirm it will be permanently deleted"
      );
      if (answer) {
        await api.delete(`petitions/${p.petitionId}`);
        this.$router.push("/petitions");
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
      await this.loadPetition(this.petitionId);
    },
    async removeSignature(p) {
      await api.delete(`petitions/${p.petitionId}/signatures`, {});
      await this.loadSignatures(this.petitionId);
      await this.loadPetition(this.petitionId);
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
.button {
  margin-bottom: 20px;
}
.tag {
  border-radius: 5px;
  width: 180px;
  margin-top: 10px;
  margin-bottom: 10px;
  margin-right: 10px;
}
.petition-single {
  margin-top: 30px;
  margin-left: 40px;
  margin-right: 40px;
}
.hero {
  margin-bottom: 70px;
  border-radius: 5px;
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
  padding-right: 120px;
}
.signatures {
  padding-right: 120px;
}
.card {
  margin-top: 5px;
  gap: 10px;
}
</style>
