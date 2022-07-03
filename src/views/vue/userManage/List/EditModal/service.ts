import { createUser, editUser } from "../api";
import { defaultData, Model } from "./model";

export default class Service {
  private model: Model;

  constructor(model: Model) {
    this.model = model;
  }

  init(data: Model["data"]) {
    this.model.data = (data && JSON.parse(JSON.stringify(data))) || defaultData; //需要深拷贝
    if (data && data.tags) {
      this.model.tagOptions.value = data.tags.map(s => {
        return {
          label: s,
          value: s
        };
      });
    } else {
      this.model.tagOptions.value = [];
    }
  }

  changeForm(name: string, value: any) {
    (this.model.data as any)[name] = value;
  }

  async createUser() {
    this.model.loading.value = true;
    await createUser({
      name: this.model.data!.name,
      age: this.model.data!.age,
      mobile: this.model.data!.mobile,
      tags: this.model.data?.tags,
      address: this.model.data?.address
    }).finally(() => {
      this.model.loading.value = false;
    });
  }

  async editUser() {
    this.model.loading.value = true;
    await editUser({
      name: this.model.data!.name,
      age: this.model.data!.age,
      mobile: this.model.data!.mobile,
      tags: this.model.data?.tags,
      address: this.model.data?.address,
      id: this.model.data!.id
    }).finally(() => {
      this.model.loading.value = false;
    });
  }
}
