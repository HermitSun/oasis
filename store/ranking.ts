import { GetterTree, ActionTree, MutationTree } from 'vuex';

enum RankingTypes {
  UPDATE_IS_AFFILIATION_WORD_CLOUD_LOADED = 'UPDATE_IS_AFFILIATION_WORD_CLOUD_LOADED',
  UPDATE_IS_AUTHOR_WORD_CLOUD_LOADED = 'UPDATE_IS_AUTHOR_WORD_CLOUD_LOADED'
}

// state
export const state = () => ({
  isAffiliationWordCloudLoaded: false,
  isAuthorWordCloudLoaded: false
});

export type RankingState = ReturnType<typeof state>;

// getters
export const getters: GetterTree<RankingState, RankingState> = {
  isAffiliationWordCloudLoaded: (state) => state.isAffiliationWordCloudLoaded,
  isAuthorWordCloudLoaded: (state) => state.isAuthorWordCloudLoaded
};

// mutations
export const mutations: MutationTree<RankingState> = {
  [RankingTypes.UPDATE_IS_AFFILIATION_WORD_CLOUD_LOADED]: (
    state,
    loaded: boolean
  ) => (state.isAffiliationWordCloudLoaded = loaded),
  [RankingTypes.UPDATE_IS_AUTHOR_WORD_CLOUD_LOADED]: (state, loaded: boolean) =>
    (state.isAuthorWordCloudLoaded = loaded)
};

// actions
export const actions: ActionTree<RankingState, RankingState> = {
  updateIsAffiliationWordCloudLoaded({ commit }, payload) {
    commit(RankingTypes.UPDATE_IS_AFFILIATION_WORD_CLOUD_LOADED, payload);
  },
  updateIsAuthorWordCloudLoaded({ commit }, payload) {
    commit(RankingTypes.UPDATE_IS_AUTHOR_WORD_CLOUD_LOADED, payload);
  }
};
