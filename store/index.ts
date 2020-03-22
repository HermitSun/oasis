import { GetterTree, ActionTree, MutationTree } from 'vuex';

enum RootTypes {
  UPDATE_TOKEN = 'UPDATE_TOKEN'
}

// state
export const state = () => ({
  token: ''
});

export type RootState = ReturnType<typeof state>;

// getters
// 因为是在根级别的store，所以两个泛型是相同的
// 下同
export const getters: GetterTree<RootState, RootState> = {
  token: (state) => state.token
};

// mutations
export const mutations: MutationTree<RootState> = {
  [RootTypes.UPDATE_TOKEN]: (state, token: string) => (state.token = token)
};

// actions
export const actions: ActionTree<RootState, RootState> = {
  updateToken({ commit }, payload) {
    commit(RootTypes.UPDATE_TOKEN, payload);
  }
};
