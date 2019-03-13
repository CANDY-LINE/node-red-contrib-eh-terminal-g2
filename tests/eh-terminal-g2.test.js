/**
 * @license
 * Copyright (c) 2019 CANDY LINE INC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

import 'source-map-support/register';
import * as sinon from 'sinon';
import { assert } from 'chai';
import ehTerminalG2Module from '../dist/eh-terminal-g2';
import EventEmitter from 'events';

const RED = {};

describe('EH-Terminal G2 node', () => {
  RED.debug = true;
	let sandbox;
	beforeEach(() => {
		sandbox = sinon.sandbox.create();
    RED._ = sinon.spy();
    RED.events = sandbox.stub(new EventEmitter());
    RED.nodes = sandbox.stub({
      registerType: () => {}
    });
    RED.log = sandbox.stub({
      debug: () => {},
      info: () => {},
      warn: () => {},
      error: () => {}
    });
	});
	afterEach(() => {
		sandbox = sandbox.restore();
	});
  describe('EH-Terminal G2 module', () => {
    it('should have valid Node-RED plugin classes', () => {
      assert.isNotNull(RED);
      ehTerminalG2Module(RED);
      assert.isTrue(RED.nodes.registerType.withArgs('EH-Terminal G2', sinon.match.any).calledOnce);
    });
  });
});
