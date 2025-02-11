type ImportType = 'complete' | 'cubism2' | 'cubism4';
type EventType = 'ready' | 'load';
type LoadType = 'manual' | 'auto';
type TipsType = 'welcomeTips' | 'idleTips' | 'copyTips';

type ControlID = 'SwitchModel' | 'Setting' | 'About';
type ControlName = 'icon-a-userswitch-fill' | 'icon-setting-fill' | 'icon-info-circle-fill';

interface ElConfig {
  id: string;
  className?: string;
  tagName: string;
  childrens?: ElConfig[];
  innerHtml?: string;
}

interface Controls {
  id: ControlID;
  name: ControlName;
  title: string;
}

interface ElementList {
  stageEl: HTMLDivElement;
  canvasEl: HTMLCanvasElement;
  controlsEl: HTMLDivElement;
  levitatedBtnEl: HTMLDivElement;
  tipsEl: HTMLDivElement;
}

interface Elements {
  canvasEl: ElConfig;
  stageEl: ElConfig;
  tipsEl: ElConfig;
  levitatedBtnEl: ElConfig;
  controlsEl: ElConfig;
}

interface OmlConfig {
  globalStyle: string;
  elements: Elements;
  controls: Controls[];
}

interface Model {
  /**
   * 来源地中具体的模型json配置文件路径
   */
  path?: string;
  /**
   * 模型的缩放比例
   */
  scale?: number | [x: number, y: number];
  /**
   * 模型在舞台中X轴方向的位置
   */
  x?: number;
  /**
   * 模型在舞台中Y轴方向的位置
   */
  y?: number;

  /**
   * 舞台样式
   */
  stageStyle?: {
    /**
     * 舞台的背景颜色
     */
    backgroundColor?: string;
    /**
     * 舞台的宽度
     */
    width?: number | 'auto';
    /**
     * 舞台的高度
     */
    height?: number | 'auto';
  };
}

interface Options<T = Model | [Model, ...Model[]]> {
  /**
   * 是否在移动端显示，默认为false
   */
  mobileShow?: boolean;
  /**
   * 模型来源，固定的远程或本地路径
   */
  source?: string;
  /**
   * 是否在初始化阶段打印项目信息
   */
  sayHello?: boolean;
  /**
   * 模型入场和离开的过渡动画时长
   */
  transitionTime?: number;
  /**
   * 定义一个或一组模型
   */
  models?: T;
  /**
   * 定义提示框
   */
  tips?: Tips | false;
  /**
   * 指定挂载元素，不指定则挂载到body
   */
  mountTarget?: HTMLElement;
}

type DeepRequired<T> = T extends Function ? T : T extends object ? { [P in keyof T]-?: DeepRequired<T[P]> } : T;
type DefaultModel = DeepRequired<Model>;
type DefaultOptions = DeepRequired<Options<DefaultModel | [DefaultModel, ...DefaultModel[]]>>;

interface WrapperContentEls {
  canvasEl?: HTMLCanvasElement;
  tooltipEl?: HTMLDivElement;
  sideMenuEl?: HTMLDivElement;
}

interface IdleTips extends CopyTips {
  /**
   * 闲置状态循环播放消息的间隔时间
   */
  interval?: number;

  /**
   * 提供异步加载提示方法
   * @param arg
   * @returns
   */
  remote?: (() => Promise<{ text: string }>) | false;
}

interface WelcomeTips {
  /**
   * 播放的消息内容
   */
  message?: {
    /**
     * 早晨5-7点提示信息内容
     */
    daybreak?: string;
    /**
     * 早上8-11点提示信息内容
     */
    morning?: string;
    /**
     * 中午12-13点提示信息内容
     */
    noon?: string;
    /**
     * 下午14-17点提示信息内容
     */
    afternoon?: string;
    /**
     * 傍晚18-19点提示信息内容
     */
    dusk?: string;
    /**
     * 晚上20-21点提示信息内容
     */
    night?: string;
    /**
     * 深夜22-23点提示信息内容
     */
    lateNight?: string;
    /**
     * 凌晨0-4点提示信息内容
     */
    weeHours?: string;
  };
  /**
   * 提示框持续时间
   */
  persistTime?: number;
  /**
   * 优先级
   */
  priority?: number;
}

interface CopyTips {
  /**
   * 播放的消息内容
   */
  message?: string | string[];
  /**
   * 提示框持续时间
   */
  persistTime?: number;
  /**
   * 优先级
   */
  priority?: number;
}

interface Tips {
  /**
   * 调整提示框样式
   */
  style?: {
    /**
     * 提示框宽度
     */
    width?: number;
    /**
     * 提示框高度
     */
    height?: number;
    /**
     * 调整提示框位于画布中的x轴方向偏移量
     */
    offsetX?: number;
    /**
     * 调整提示框位于画布中的y轴方向偏移量
     */
    offsetY?: number;
  };

  /**
   * 闲置状态下的提示
   */
  idleTips?: IdleTips;
  /**
   * 模型入场后的欢迎提示
   */
  welcomeTips?: WelcomeTips;
  /**
   * 复制事件被触发时的提示
   */
  copyTips?: CopyTips;
}

interface OhMyLive2D {
  /**
   * 模型在完全显示之后的回调
   */
  onAfterDisplay: (callback: () => void) => void;
}

interface Events {
  afterDisplay?: () => void;
}

export type {
  TipsType,
  OhMyLive2D,
  Options,
  ImportType,
  WrapperContentEls,
  EventType,
  Events,
  LoadType,
  Tips,
  IdleTips,
  WelcomeTips,
  DefaultOptions,
  DeepRequired,
  Model,
  DefaultModel,
  ElementList,
  OmlConfig,
  Elements,
  ElConfig,
  Controls,
  ControlID
};
