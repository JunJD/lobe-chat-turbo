import tool from '../default/tool';
import chat from './chat';
import common from './common';
import error from './error';
import market from './market';
import migration from './migration';
import pay from './pay';
import plugin from './plugin';
import setting from './setting';
import welcome from './welcome';

const resources = {
  chat,
  common,
  error,
  market,
  migration,
  pay,
  plugin,
  setting,
  tool,
  welcome,
} as const;

export default resources;
