import Vue from 'vue';
import { AuthorInfo } from '~/interfaces/responses/search/SearchResponse';

const link = Vue.extend({
  methods: {
    // 跳转到学者画像
    linkToAuthor(author: AuthorInfo) {
      this.$router.push({
        path: '/portrait/author',
        query: { authorId: author.id, sortKey: 'recent', page: '1' }
      });
    }
  }
});

export default link;
