import { NodeCG } from './nodecg';
import { timekeeper } from './timekeeper';

export = (nodecg: NodeCG): void => {
  timekeeper(nodecg);
}