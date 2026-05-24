import {TurboModule, TurboModuleRegistry} from 'react-native';

export interface Spec extends TurboModule {
  requestVideoPermission(): Promise<string>;
  checkVideoPermission(): Promise<string>;
  reselectVideos(): Promise<string>;
}

export default TurboModuleRegistry.getEnforcing<Spec>('NativeGetVideoList');