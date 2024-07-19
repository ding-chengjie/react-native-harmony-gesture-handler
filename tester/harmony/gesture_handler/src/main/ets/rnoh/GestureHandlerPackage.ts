import {RNPackage, UITurboModuleFactory} from "@rnoh/react-native-openharmony/ts";
import type {UITurboModule, UITurboModuleContext} from "@rnoh/react-native-openharmony/ts";
import {RNGestureHandlerModule} from './RNGestureHandlerModule';

class GestureHandlerTurboModuleFactory extends UITurboModuleFactory {
  createTurboModule(name: string): UITurboModule | null {
    if (name === RNGestureHandlerModule.NAME) {
      return new RNGestureHandlerModule(this.ctx);
    }
    return null;
  }

  hasTurboModule(name: string): boolean {
    return name === RNGestureHandlerModule.NAME;
  }
}

export class GestureHandlerPackage extends RNPackage {
  createUITurboModuleFactory(ctx: UITurboModuleContext): UITurboModuleFactory {
    return new GestureHandlerTurboModuleFactory(ctx);
  }
}
