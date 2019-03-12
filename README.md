node-red-contrib-eh-terminal-g2
===

[![GitHub release](https://img.shields.io/github/release/CANDY-LINE/node-red-contrib-eh-terminal-g2.svg)](https://github.com/CANDY-LINE/node-red-contrib-eh-terminal-g2/releases/latest)
[![master Build Status](https://travis-ci.org/CANDY-LINE/node-red-contrib-eh-terminal-g2.svg?branch=master)](https://travis-ci.org/CANDY-LINE/node-red-contrib-eh-terminal-g2/)

Node-RED nodes for [m-pression EH-Terminal G2 Wireless Sensor Device](https://www.m-pression.com/solutions/boards/iot-wearables) by [Macnica](https://www.macnica.com/), which supports [Analog Devices' SmartMesh IP](https://www.analog.com/en/products/rf-microwave/wireless-sensor-networks/smartmesh-ip.html) wireless technology.

## Example Flow

The bundled example flow provides the following demonstrations:

TBW

# Prerequisites

## Hardware

TBW

## How to use

TBW

# How to install

## Node-RED users

Use `Manage Palette` dialog in the browser editor or run the following commands:
```
cd ~/.node-red
npm install node-red-contrib-eh-terminal-g2
```

Then restart Node-RED process.

### Uninstallation

The following command uninstalls SmartMesh SDK python executables/libraries as well as this node package.

```
cd ~/.node-red
sudo npm uninstall --unsafe-perm node-red-contrib-eh-terminal-g2
```

## CANDY RED users

Use `Manage Palette` dialog in the browser editor or run the following commands:
```
cd /opt/candy-red/.node-red
sudo npm install --unsafe-perm node-red-contrib-eh-terminal-g2
```

Then restart `candy-red` service.

```
sudo systemctl restart candy-red
```

### Uninstallation

`Manage Palette` dialog should work for uninstallation as well as the following commands:

```
cd /opt/candy-red/.node-red
sudo npm uninstall --unsafe-perm node-red-contrib-eh-terminal-g2
```

The above command uninstalls SmartMesh SDK python executables/libraries as well as this node package.

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
