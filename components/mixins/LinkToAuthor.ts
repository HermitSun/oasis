import Vue from 'vue';
import { AuthorInfo } from '~/interfaces/responses/search/SearchResponse';

const link = Vue.extend({
  methods: {
    // 跳转到学者画像
    linkToAuthor(author: AuthorInfo) {
      // 可能存在没有ID的情况，但这不是逻辑上的问题，而是数据的问题
      if (author.id) {
        this.$router.push({
          path: '/portrait/author',
          query: { authorId: author.id, sortKey: 'recent', page: '1' }
        });
      } else {
        this.$message.error('找不到该作者的信息🤷🏻');
      }
    }
  }
});

export default link;
