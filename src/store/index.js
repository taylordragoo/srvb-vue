import { defineStore } from 'pinia';

export const useParamStore = defineStore('paramStore', {
  state: () => ({
    // Define your state structure here, similar to the initialState in React
    params: {},
  }),
  actions: {
    requestParamValueUpdate(paramId, value) {
      if (typeof globalThis.__postNativeMessage__ === 'function') {
        globalThis.__postNativeMessage__("setParameterValue", {
          paramId,
          value,
        });
      }
      // Update the local state as necessary
      this.params[paramId] = value;
    },
    // Add other actions as necessary
  },
});