import { reactive, ref } from "vue";
import { IFetchUserListResult } from "../api";

export const defaultData = {
  name: "",
  address: "",
  tags: [],
  mobile: "",
  id: -1,
  age: undefined
};

export const useModel = () => {
  const data = reactive<IFetchUserListResult["result"]["rows"][0]>(
    defaultData as any
  );

  const tagOptions = ref<{ label: string; value: string }[]>([]);

  const loading = ref(false);

  return {
    data,
    tagOptions,
    loading
  };
};

export type Model = ReturnType<typeof useModel>;
