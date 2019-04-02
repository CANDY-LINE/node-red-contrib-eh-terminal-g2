node-red-contrib-eh-terminal-g2
===

[![GitHub release](https://img.shields.io/github/release/CANDY-LINE/node-red-contrib-eh-terminal-g2.svg)](https://github.com/CANDY-LINE/node-red-contrib-eh-terminal-g2/releases/latest)
[![master Build Status](https://travis-ci.org/CANDY-LINE/node-red-contrib-eh-terminal-g2.svg?branch=master)](https://travis-ci.org/CANDY-LINE/node-red-contrib-eh-terminal-g2/)

Node-RED node for [m-pression EH-Terminal G2 Wireless Sensor Device](https://www.m-pression.com/solutions/boards/iot-wearables) by [Macnica](https://www.macnica.com/), which supports [Analog Devices' SmartMesh IP](https://www.analog.com/en/products/rf-microwave/wireless-sensor-networks/smartmesh-ip.html) wireless technology.

![Macnica EH-Terminal G2](images/macnica-EH-Terminal_G2_w500.png)

This device has the following sensors and emits all the sensor data every 30 seconds.

1. Illuminance (lux)
1. Temperature (degree Celsius) and Humidity (%)
1. 3-axis Accelerometer (g)
1. Battery voltage (V)

This node parse and translate the raw packets into easy-to-use JSON objects. The node supports Node-RED Dashboard [Chart node data format](https://github.com/node-red/node-red-dashboard/blob/master/Charts.md), which means you can quickly plot the device sensor data with the Chart node without any data transformation.

## Where to buy EH-Terminal G2

Let's ask [Macnica](https://www.m-pression.com/contact/inquiry)!

## Example Flow

The bundled example flow provides the following demonstrations:

 - Transform a raw protocol message from EH-Terminal G2 into live chart values to draw a chart with UI Chart node
 - Print SmartMesh notification events
 - Print OAP message if any

# Prerequisites

## Software

The following node is required to receive SmartMesh data packets. The example node relies on it as well.

* [node-red-contrib-smartmesh](https://flows.nodered.org/node/node-red-contrib-smartmesh) node

## Hardware

- DC2274A-A SmartMesh IP™ USB Manager dongle, or its equivalent device (SmartMesh Master mote) having a serialport CLI

## How to use

In order to use EH-Terminal G2 with your SmartMesh IP™ USB Manager dongle, you might need some work.

1. Change Network ID on your Manager
1. Restart the network

### Change Network ID on your Manager

Connect SmartMesh IP™ USB Manager dongle to your computer and start a terminal session to the USB serial port. Here is a linux/macOS example command using `screen`.

```
$ screen /dev/ttyUSBX 9600
```
Then login to the Manager. We assume your USB Manager configuration is identical to the factory default.

```
> login user
> set config netid 1723
```

The Network ID `1723` is the factory default Network ID stored in EH-Terminal G2.

### Restart the network

In order to take effect the change, the network should be restarted.

```
> reset system
```

Exit the `screen` terminal by hitting `Ctrl A` then `Ctrl Z`.

# How to install

## Node-RED users

Use `Manage Palette` dialog in the browser editor or run the following commands:
```
cd ~/.node-red
npm install @candy-line/node-red-contrib-eh-terminal-g2
```

Then restart Node-RED process.

### Uninstallation

```
cd ~/.node-red
sudo npm uninstall --unsafe-perm @candy-line/node-red-contrib-eh-terminal-g2
```

## CANDY RED users

Use `Manage Palette` dialog in the browser editor or run the following commands:
```
cd /opt/candy-red/.node-red
sudo npm install --unsafe-perm @candy-line/node-red-contrib-eh-terminal-g2
```

Then restart `candy-red` service.

```
sudo systemctl restart candy-red
```

### Uninstallation

`Manage Palette` dialog should work for uninstallation as well as the following commands:

```
cd /opt/candy-red/.node-red
sudo npm uninstall --unsafe-perm @candy-line/node-red-contrib-eh-terminal-g2
```

# Appendix

## How to build

```
# build
$ NODE_ENV=development npm run build
# package
$ NODE_ENV=development npm pack
```

# License

- Source Code ... ASL 2.0 ©CANDY LINE INC.
- Node Icon ... [CC BY-ND 3.0](https://creativecommons.org/licenses/by-nd/3.0/)

# Revision History

* 1.0.0
  - Initial Release
