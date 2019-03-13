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

/*jslint bitwise: true */
'use strict';

import 'source-map-support/register';

export class EHTerminalG2PacketParser {
  static get PREAMPLE() { return 0x4d; }

  constructor() {
  }

  parse(dataBuf) {
    if (!Array.isArray(dataBuf) && !(dataBuf instanceof Buffer)) {
      if (dataBuf && dataBuf.type === 'Buffer' && Array.isArray(dataBuf.data)) {
        dataBuf = Buffer.from(dataBuf.data);
      } else {
        return Promise.reject(new Error(`[FormatError] The passed data buffer must be either int array or Buffer.`));
      }
    }
    if (Array.isArray(dataBuf)) {
      dataBuf = Buffer.from(dataBuf);
    }
    // Process header
    if (dataBuf[0] !== EHTerminalG2PacketParser.PREAMPLE) {
      return Promise.reject(new Error(`[FormatError] Cannot parse the given data. Unsupported format.`));
    }
    try {
      let output = {
        messageId: dataBuf[1],
        eventType: null,
        data: {},
      };
      switch (dataBuf[2]) {
        case 0x02: {
          output.eventType = 'response';
          break;
        }
        case 0x04: {
          output.eventType = 'data';
          break;
        }
        default: {
          output.eventType = 'unknown';
        }
      }

      // Process body
      let i = 7; // => first sensor ID index
      while (i >= 0) {
        let sensorId = dataBuf[i] + (dataBuf[i + 1] << 8); // LE
        i = this.parseSensorDataBody(sensorId, i, dataBuf, output.data);
      }
      return Promise.resolve(output);
    } catch (err) {
      return Promise.reject(err);
    }
  }

  parseSensorDataBody(sensorId, sensorIdIndex, dataBuf, data) {
    let i = sensorIdIndex + 3; // skip sensorId and dataCount
    switch (sensorId) {
      case 0x0000: {
        // TI OPT3001DNP Ambient Light Sensor (ALS)
        data.illuminance = {
          sensorId: sensorId,
          value: dataBuf.readFloatLE(i), // LE Float (4bytes),
          unit: 'lux',
        };
        i += 4;
        break;
      }
      case 0x000E: {
        // SENSIRION SHT31-DIS-F2.5KS Temperature and Humidity Sensor
        data.temperature = {
          sensorId: sensorId,
          value: dataBuf.readFloatLE(i), // LE Float (4bytes),
          unit: 'C',
        };
        i += 4;
        data.humidity = {
          sensorId: sensorId,
          value: dataBuf.readFloatLE(i), // LE Float (4bytes),
          unit: '%',
        };
        i += 4;
        break;
      }
      case 0x0012: {
        // SENSIRION SGPC3 Gas Sensor (TVOC, Ethanol)
        data.eco2 = { // Environmental CO2 ** NOT YET SUPPROTED **
          sensorId: sensorId,
          value: dataBuf.readFloatLE(i), // LE Float (4bytes),
          unit: 'ppm',
        };
        i += 4;
        data.tvoc = { // Total Volatile Organic Compounds
          sensorId: sensorId,
          value: dataBuf.readFloatLE(i), // LE Float (4bytes),
          unit: 'ppm',
        };
        i += 4;
        data.ethanol = { // Ethanol ** DEBUG USE **
          sensorId: sensorId,
          value: dataBuf.readFloatLE(i), // LE Float (4bytes),
          unit: 'ppm',
        };
        i += 4;
        data.h2 = { // H2 ** NOT YET SUPPROTED **
          sensorId: sensorId,
          value: dataBuf.readFloatLE(i), // LE Float (4bytes),
          unit: 'ppm',
        };
        i += 4;
        break;
      }
      case 0x0013: {
        // ADI ADXL362 Accelerometer
        data.x = {
          sensorId: sensorId,
          value: dataBuf.readFloatLE(i), // LE Float (4bytes),
          unit: 'g',
        };
        i += 4;
        data.y = {
          sensorId: sensorId,
          value: dataBuf.readFloatLE(i), // LE Float (4bytes),
          unit: 'g',
        };
        i += 4;
        data.z = {
          sensorId: sensorId,
          value: dataBuf.readFloatLE(i), // LE Float (4bytes),
          unit: 'g',
        };
        i += 4;
        break;
      }
      case 0xFFFD: {
        // PMIC SYS Voltage prior to sensing
        data.pmicSysVoltBef = { // ** NOT YET SUPPROTED **
          sensorId: sensorId,
          value: dataBuf.readFloatLE(i), // LE Float (4bytes),
          unit: 'V',
        };
        i += 4;
        break;
      }
      case 0xFFFE: {
        // PMIC SYS Voltage after sensing
        data.pmicSysVoltAft = { // ** NOT YET SUPPROTED **
          sensorId: sensorId,
          value: dataBuf.readFloatLE(i), // LE Float (4bytes),
          unit: 'V',
        };
        i += 4;
        break;
      }
      case 0xFFFF: {
        // Battery Voltage
        data.battery = {
          sensorId: sensorId,
          value: dataBuf.readFloatLE(i), // LE Float (4bytes),
          unit: 'V',
        };
        i += 4;
        break;
      }
    }
    if (dataBuf[i] === undefined) {
      i = -1;
    }
    return i;
  }
}
