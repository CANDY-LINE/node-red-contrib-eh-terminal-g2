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
import { EHTerminalG2PacketParser } from './eh-terminal-g2-common';

export default function(RED) {

  class EHTerminalG2Node {
    constructor(n) {
      RED.nodes.createNode(this, n);
      this.name = n.name;
      this.ignoreFormatError = n.ignoreFormatError;
      this.parser = new EHTerminalG2PacketParser();
      this.on('input', (msg) => {
        try {
          let payload = msg.payload || {};
          if (payload.protocol === 'raw') {
            this.parser.parse(payload.payload).then((output) => {
              msg.payload = Object.assign(output, {
                /*jshint camelcase: false */
                'packet_timestamp': payload.packet_timestamp,
                /*jshint camelcase: true */
                mac: payload.mac,
                timestamp: payload.timestamp,
                managerId: payload.managerId,
              });
              this.send(msg);
            }).catch((err) => {
              if (this.ignoreFormatError && err.message && err.message.indexOf('[FormatError]') === 0) {
                return;
              }
              this.error(err);
            });
          } else if (!this.ignoreFormatError) {
            this.error(`[FormatError] Unsupported protocol => ${payload.protocol}`);
          }
        } catch (e) {
          this.error(e);
        }
      });
    }
  }
  RED.nodes.registerType('EH-Terminal G2', EHTerminalG2Node);

}
