import { watch, getCurrentInstance } from "vue";
import { message } from "ant-design-vue";
import { Props } from ".";
import { useModel } from "./model";
import Service from "./service";

const usePresenter = (props: Props) => {
  const model = useModel();
  const service = new Service(model);
  const instance = getCurrentInstance();
  watch(
    () => props.visible,
    () => {
      if (props.visible) {
        service.init(props.data!);
      }
    }
  );

  const handleFormChange = (name: string, value: any) => {
    service.changeForm(name, value);
  };

  const handleSubmit = () => {
    if (props.title === "创建") {
      service.createUser().then(() => {
        message.success("提交成功");
        console.log(props);
        if (props.onOk) {
          console.log(12);
          props.onOk();
        }
      });
    } else {
      service.editUser().then(() => {
        message.success("提交成功");
        instance?.proxy.$emit("ok");
      });
    }
  };

  return {
    model,
    service,
    handleFormChange,
    handleSubmit
  };
};

export default usePresenter;
