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
import { EHTerminalG2PacketParser } from '../dist/eh-terminal-g2-common';

describe('EHTerminalG2PacketParser', () => {
	let sandbox;
	let parser;
	beforeEach(() => {
		sandbox = sinon.sandbox.create();
		parser = new EHTerminalG2PacketParser();
	});
	afterEach(() => {
		sandbox = sandbox.restore();
	});
  describe('#parse()', () => {
    it('should parse the data packet from EH-Terminal G2 successfully', (done) => {
			let message = require('./data-packet-01.json');
			parser.parse(message.payload).then((output) => {
				assert.equal(13, Object.keys(output.data).length);
				done();
			}).catch((err) => {
				done(err);
			});
    });
		it('should skip to parse the data packet where its payload is missing', (done) => {
			let message = require('./data-packet-02.json');
			parser.parse(message.payload).then(() => {
				done('Unexpected success!');
			}).catch((err) => {
				assert.equal('[FormatError] The passed data buffer must be either int array or Buffer.', err.message);
				done();
			}).catch((err) => {
				done(err);
			});
    });
		it('should parse the Buffer object data from EH-Terminal G2 successfully', (done) => {
			let message = require('./data-packet-03.json');
			parser.parse(message.payload).then((output) => {
				assert.equal(13, Object.keys(output.data).length);
				done();
			}).catch((err) => {
				done(err);
			});
    });
		it('should skip to parse the data packet where its preample is unknown', (done) => {
			let message = require('./data-packet-04.json');
			parser.parse(message.payload).then(() => {
				done('Unexpected success!');
			}).catch((err) => {
				assert.equal('[FormatError] Cannot parse the given data. Unsupported format.', err.message);
				done();
			}).catch((err) => {
				done(err);
			});
    });
  });
});
