import { GetterTree, ActionTree, MutationTree } from 'vuex';

enum RankingTypes {
  UPDATE_IS_ECHARTS_LOADED = 'UPDATE_IS_ECHARTS_LOADED',
  // affiliation
  UPDATE_IS_AFFILIATION_WORD_CLOUD_LOADED = 'UPDATE_IS_AFFILIATION_WORD_CLOUD_LOADED',
  // author
  UPDATE_IS_AUTHOR_WORD_CLOUD_LOADED = 'UPDATE_IS_AUTHOR_WORD_CLOUD_LOADED',
  // keyword
  UPDATE_IS_KEYWORD_WORD_CLOUD_LOADED = 'UPDATE_IS_KEYWORD_WORD_CLOUD_LOADED'
}

// state
export const state = () => ({
  isEchartsLoaded: false,
  // affiliation
  isAffiliationWordCloudLoaded: false,
  // author
  isAuthorWordCloudLoaded: false,
  // keyword
  isKeywordWordCloudLoaded: false
});

export type RankingState = ReturnType<typeof state>;

// getters
export const getters: GetterTree<RankingState, RankingState> = {
  isEchartsLoaded: (state) => state.isEchartsLoaded,
  // affiliation
  isAffiliationWordCloudLoaded: (state) => state.isAffiliationWordCloudLoaded,
  // author
  isAuthorWordCloudLoaded: (state) => state.isAuthorWordCloudLoaded,
  // keyword
  isKeywordWordCloudLoaded: (state) => state.isKeywordWordCloudLoaded
};

// mutations
export const mutations: MutationTree<RankingState> = {
  [RankingTypes.UPDATE_IS_ECHARTS_LOADED]: (state, loaded: boolean) =>
    (state.isEchartsLoaded = loaded),
  // affiliation
  [RankingTypes.UPDATE_IS_AFFILIATION_WORD_CLOUD_LOADED]: (
    state,
    loaded: boolean
  ) => (state.isAffiliationWordCloudLoaded = loaded),
  // author
  [RankingTypes.UPDATE_IS_AUTHOR_WORD_CLOUD_LOADED]: (state, loaded: boolean) =>
    (state.isAuthorWordCloudLoaded = loaded),
  // keyword
  [RankingTypes.UPDATE_IS_KEYWORD_WORD_CLOUD_LOADED]: (
    state,
    loaded: boolean
  ) => (state.isKeywordWordCloudLoaded = loaded)
};

// actions
export const actions: ActionTree<RankingState, RankingState> = {
  updateIsEchartsLoaded({ commit }, payload) {
    commit(RankingTypes.UPDATE_IS_ECHARTS_LOADED, payload);
  },
  // affiliation
  updateIsAffiliationWordCloudLoaded({ commit }, payload) {
    commit(RankingTypes.UPDATE_IS_AFFILIATION_WORD_CLOUD_LOADED, payload);
  },
  // author
  updateIsAuthorWordCloudLoaded({ commit }, payload) {
    commit(RankingTypes.UPDATE_IS_AUTHOR_WORD_CLOUD_LOADED, payload);
  },
  // keyword
  updateIsKeywordWordCloudLoaded({ commit }, payload) {
    commit(RankingTypes.UPDATE_IS_KEYWORD_WORD_CLOUD_LOADED, payload);
  }
};
