import { GetterTree, ActionTree, MutationTree } from 'vuex';

enum ManageTypes {
  UPDATE_CRAWL_TASK_REQ_NUM = 'UPDATE_CRAWL_TASK_REQ_NUM'
}

// state
export const state = () => ({
  crawlTaskReqNum: 0
});

export type ManageState = ReturnType<typeof state>;

// getters
export const getters: GetterTree<ManageState, ManageState> = {
  crawlTaskReqNum: (state) => state.crawlTaskReqNum
};

// mutations
export const mutations: MutationTree<ManageState> = {
  [ManageTypes.UPDATE_CRAWL_TASK_REQ_NUM]: (state, num: number) => {
    state.crawlTaskReqNum = num;
  }
};

// actions
export const actions: ActionTree<ManageState, ManageState> = {
  updateCrawlTaskReqNum({ commit }, payload) {
    commit(ManageTypes.UPDATE_CRAWL_TASK_REQ_NUM, payload);
  }
};
