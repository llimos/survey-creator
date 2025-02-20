import * as ko from "knockout";
import { PageNavigatorViewModel, PagesController } from "@survey/creator";
import {
  PageModel,
  IAction,
  Action,
  SurveyModel,
} from "survey-core";
import { ImplementorBase } from "survey-knockout-ui";

const template = require("./page-navigator.html");
// import template from "./page-navigator.html";

export class PageNavigatorView extends PageNavigatorViewModel<SurveyModel> {
  constructor(private pagesController: PagesController) {
    super(pagesController);
  }
  protected createActionBarCore(item: IAction): Action {
    var res = super.createActionBarCore(item);
    new ImplementorBase(res);
    return res;
  }
}

ko.components.register("svc-page-navigator", {
  viewModel: {
    createViewModel: (params: any, componentInfo: any) => {
      const model = new PageNavigatorView(params.creator.pagesController);
      new ImplementorBase(model);
      const scrollableViewPort = componentInfo.element.parentElement.parentElement;
      scrollableViewPort.onscroll = function (this: GlobalEventHandlers, ev: Event) {
        return model.onContainerScroll(ev.currentTarget as HTMLDivElement);
      };
      ko.utils.domNodeDisposal.addDisposeCallback(componentInfo.element, () => {
        scrollableViewPort.onscroll = undefined;
        model.dispose();
      });
      return model;
    },
  },
  template: template,
});
