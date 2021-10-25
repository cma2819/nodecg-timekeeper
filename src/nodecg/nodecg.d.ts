import { CreateNodecgConstructor, CreateNodecgInstance } from 'ts-nodecg/browser';
import { Configschema } from './generated/configschema';
import { MessageMap } from './messages';
import { ReplicantMap } from './replicants';

export type BundleNodecgInstance = CreateNodecgInstance<
  'nodecg-timekeeper',
  Configschema,
  ReplicantMap,
  MessageMap
>;

export type BundleNodecgConstructor = CreateNodecgConstructor<
  'nodecg-timekeeper',
  Configschema,
  ReplicantMap,
  MessageMap
>;