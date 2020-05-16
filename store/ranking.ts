import { GetterTree, ActionTree, MutationTree } from 'vuex';

enum RankingTypes {
  // affiliation
  UPDATE_IS_AFFILIATION_PAGE_LOADED = 'UPDATE_IS_AFFILIATION_PAGE_LOADED',
  UPDATE_IS_AFFILIATION_WORD_CLOUD_LOADED = 'UPDATE_IS_AFFILIATION_WORD_CLOUD_LOADED',
  // author
  UPDATE_IS_AUTHOR_PAGE_LOADED = 'UPDATE_IS_AUTHOR_PAGE_LOADED',
  UPDATE_IS_AUTHOR_WORD_CLOUD_LOADED = 'UPDATE_IS_AUTHOR_WORD_CLOUD_LOADED',
  // keyword
  UPDATE_IS_KEYWORD_PAGE_LOADED = 'UPDATE_IS_KEYWORD_PAGE_LOADED',
  UPDATE_IS_KEYWORD_WORD_CLOUD_LOADED = 'UPDATE_IS_KEYWORD_WORD_CLOUD_LOADED'
}

// state
export const state = () => ({
  // affiliation
  isAffiliationPageLoaded: false,
  isAffiliationWordCloudLoaded: false,
  // author
  isAuthorPageLoaded: false,
  isAuthorWordCloudLoaded: false,
  // keyword
  isKeywordPageLoaded: false,
  isKeywordWordCloudLoaded: false
});

export type RankingState = ReturnType<typeof state>;

// getters
export const getters: GetterTree<RankingState, RankingState> = {
  // affiliation
  isAffiliationPageLoaded: (state) => state.isAffiliationPageLoaded,
  isAffiliationWordCloudLoaded: (state) => state.isAffiliationWordCloudLoaded,
  // author
  isAuthorPageLoaded: (state) => state.isAuthorPageLoaded,
  isAuthorWordCloudLoaded: (state) => state.isAuthorWordCloudLoaded,
  // keyword
  isKeywordPageLoaded: (state) => state.isKeywordPageLoaded,
  isKeywordWordCloudLoaded: (state) => state.isKeywordWordCloudLoaded
};

// mutations
export const mutations: MutationTree<RankingState> = {
  // affiliation
  [RankingTypes.UPDATE_IS_AFFILIATION_PAGE_LOADED]: (state, loaded: boolean) =>
    (state.isAffiliationPageLoaded = loaded),
  [RankingTypes.UPDATE_IS_AFFILIATION_WORD_CLOUD_LOADED]: (
    state,
    loaded: boolean
  ) => (state.isAffiliationWordCloudLoaded = loaded),
  // author
  [RankingTypes.UPDATE_IS_AUTHOR_PAGE_LOADED]: (state, loaded: boolean) =>
    (state.isAuthorPageLoaded = loaded),
  [RankingTypes.UPDATE_IS_AUTHOR_WORD_CLOUD_LOADED]: (state, loaded: boolean) =>
    (state.isAuthorWordCloudLoaded = loaded),
  // keyword
  [RankingTypes.UPDATE_IS_KEYWORD_PAGE_LOADED]: (state, loaded: boolean) =>
    (state.isKeywordPageLoaded = loaded),
  [RankingTypes.UPDATE_IS_KEYWORD_WORD_CLOUD_LOADED]: (
    state,
    loaded: boolean
  ) => (state.isKeywordWordCloudLoaded = loaded)
};

// actions
export const actions: ActionTree<RankingState, RankingState> = {
  // affiliation
  updateIsAffiliationPageLoaded({ commit }, payload) {
    commit(RankingTypes.UPDATE_IS_AFFILIATION_PAGE_LOADED, payload);
  },
  updateIsAffiliationWordCloudLoaded({ commit }, payload) {
    commit(RankingTypes.UPDATE_IS_AFFILIATION_WORD_CLOUD_LOADED, payload);
  },
  // author
  updateIsAuthorPageLoaded({ commit }, payload) {
    commit(RankingTypes.UPDATE_IS_AUTHOR_PAGE_LOADED, payload);
  },
  updateIsAuthorWordCloudLoaded({ commit }, payload) {
    commit(RankingTypes.UPDATE_IS_AUTHOR_WORD_CLOUD_LOADED, payload);
  },
  // keyword
  updateIsKeywordPageLoaded({ commit }, payload) {
    commit(RankingTypes.UPDATE_IS_KEYWORD_PAGE_LOADED, payload);
  },
  updateIsKeywordWordCloudLoaded({ commit }, payload) {
    commit(RankingTypes.UPDATE_IS_KEYWORD_WORD_CLOUD_LOADED, payload);
  }
};
