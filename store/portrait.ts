import { GetterTree, ActionTree, MutationTree } from 'vuex';

enum PortraitTypes {
  UPDATE_IS_ECHARTS_LOADED = 'UPDATE_IS_ECHARTS_LOADED',
  UPDATE_IS_AFFILIATION_WORD_CLOUD_LOADED = 'UPDATE_IS_AFFILIATION_WORD_CLOUD_LOADED',
  UPDATE_IS_KEYWORD_WORD_CLOUD_LOADED = 'UPDATE_IS_KEYWORD_WORD_CLOUD_LOADED'
}

// state
export const state = () => ({
  isEchartsLoaded: false,
  isAffiliationWordCloudLoaded: false,
  isKeywordWordCloudLoaded: false
});

export type PortraitState = ReturnType<typeof state>;

// getters
export const getters: GetterTree<PortraitState, PortraitState> = {
  isEchartsLoaded: (state) => state.isEchartsLoaded,
  isAffiliationWordCloudLoaded: (state) => state.isAffiliationWordCloudLoaded,
  isKeywordWordCloudLoaded: (state) => state.isKeywordWordCloudLoaded
};

// mutations
export const mutations: MutationTree<PortraitState> = {
  [PortraitTypes.UPDATE_IS_ECHARTS_LOADED]: (state, loaded: boolean) =>
    (state.isEchartsLoaded = loaded),
  [PortraitTypes.UPDATE_IS_AFFILIATION_WORD_CLOUD_LOADED]: (
    state,
    loaded: boolean
  ) => (state.isAffiliationWordCloudLoaded = loaded),
  [PortraitTypes.UPDATE_IS_KEYWORD_WORD_CLOUD_LOADED]: (
    state,
    loaded: boolean
  ) => (state.isKeywordWordCloudLoaded = loaded)
};

// actions
export const actions: ActionTree<PortraitState, PortraitState> = {
  updateIsEchartsLoaded({ commit }, payload) {
    commit(PortraitTypes.UPDATE_IS_ECHARTS_LOADED, payload);
  },
  updateIsAffiliationWordCloudLoaded({ commit }, payload) {
    commit(PortraitTypes.UPDATE_IS_AFFILIATION_WORD_CLOUD_LOADED, payload);
  },
  updateIsKeywordWordCloudLoaded({ commit }, payload) {
    commit(PortraitTypes.UPDATE_IS_KEYWORD_WORD_CLOUD_LOADED, payload);
  }
};
