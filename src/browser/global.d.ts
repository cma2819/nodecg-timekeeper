import { BundleNodecgInstance, BundleNodecgConstructor } from '../nodecg/nodecg';

declare global {
  const nodecg: BundleNodecgInstance;

  const NodeCG: BundleNodecgConstructor;
}