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
      this.messageFormat = n.messageFormat || 'standard';
      this.ignoreFormatError = n.ignoreFormatError;
      this.parser = new EHTerminalG2PacketParser();
      let formatMessage = (input, output, msg) => {
        let result;
        switch (this.messageFormat) {
          case 'standard': {
            msg.payload = Object.assign(output, {
              /*jshint camelcase: false */
              'packet_timestamp': input.packet_timestamp,
              /*jshint camelcase: true */
              mac: input.mac,
              timestamp: input.timestamp,
              managerId: input.managerId,
            });
            result = [msg];
            break;
          }
          case 'chart': {
            result = Object.keys(output.data).map((k) => {
              return {
                topic: k,
                payload: output.data[k].value,
                mac: input.mac,
                timestamp: input.timestamp,
                managerId: input.managerId,
              };
            });
            break;
          }
          default: {
            result = [msg];
          }
        }
        return result;
      };
      this.on('input', (msg) => {
        try {
          let input = msg.payload || {};
          if (input.protocol === 'raw') {
            this.parser.parse(input.payload).then((output) => {
              let result = formatMessage(input, output, msg);
              result.forEach((r) => {
                this.send(r);
              });
            }).catch((err) => {
              if (this.ignoreFormatError && err.message && err.message.indexOf('[FormatError]') === 0) {
                return;
              }
              this.error(err);
            });
          } else if (!this.ignoreFormatError) {
            this.error(`[FormatError] Unsupported protocol => ${input.protocol}`);
          }
        } catch (e) {
          this.error(e);
        }
      });
    }
  }
  RED.nodes.registerType('EH-Terminal G2', EHTerminalG2Node);

}
