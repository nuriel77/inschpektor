<template>
  <div v-if="neighbors">
    <article
      class="message"
      :class="[issues(neighbors).length === 0 ? 'is-success' : 'is-warning']"
    >
      <div class="message-header black-text" @click="showContent = !showContent">
        <p>Summary - Neighbors: {{ neighbors.length }}</p>

        <a
          v-if="showContent"
          class="button black-text"
          :class="[
            issues(neighbors).length === 0 ? 'is-success' : 'is-warning'
          ]"
          :key="1"
        >
          <font-awesome-icon icon="window-minimize"/>
        </a>

        <a
          v-else
          class="button black-text"
          :class="[
            issues(neighbors).length === 0 ? 'is-success' : 'is-warning'
          ]"
          :key="0"
        >
          <font-awesome-icon icon="window-maximize"/>
        </a>
      </div>
      <div class="message-body" v-if="showContent">
        <p v-if="issues(neighbors).length === 0">Everything is fine! :)</p>
        <p v-for="issue in issues(neighbors)">• {{ issue }}</p>
      </div>
    </article>
  </div>
</template>

<script>
export default {
  name: 'Summary',
  props: ['neighbors'],
  data() {
    return {
      showContent: true
    };
  },
  methods: {
    issues: neighbors => {
      const issueMsgs = [];

      const addIssueMessage = (neighbor, msg) => {
        issueMsgs.push(`Neighbor ${neighbor.address} ${msg}`);
      };
      neighbors.forEach(n => {
        if (!n.isFriendlyNode)
          addIssueMessage(n, 'has a lot of invalid transactions.');
        if (n.isSynced === false)
          addIssueMessage(n, 'does not seem to be in sync.');
        if (n.isActive === false || n.isActive === -1)
          addIssueMessage(n, 'does not seem to be active anymore.');
      });

      return issueMsgs;
    }
  }
};
</script>

<style scoped>
div {
  padding-bottom: 10px;
}

.black-text {
  color: #4a4a4a !important;
}
</style>
