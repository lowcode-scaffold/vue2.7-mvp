import { observer as observerV2 } from "./observerInVue2";
import collectData from "./collectData";
import { IObserverOptions } from "../types";

export function observer<C>(baseComponent: C, options?: IObserverOptions): C {
  return observerV2(baseComponent, options);
}

export { collectData };
