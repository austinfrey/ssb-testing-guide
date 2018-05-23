const flumeView = require('flumeview-reduce')

const NAME = 'channel'
const VERSION = 1

module.exports = {
  name: NAME,
  version: VERSION,
  manifest: {
    all: 'async'
  },
  init: function (server, config) {
    const view = server._flumeUse(
      NAME,
      flumeView(VERSION, reduce, map, null, initialState())
    )

    return {
      all: view.get
    }
  }
}

function map (msg) {
  var content = msg.value.content
  return content.channel
}

// if map returns null or undefined, reduce is skipped
function reduce (accumulator, channel) {
  accumulator[channel] = (accumulator[channel] || 0) + 1
  return accumulator
}

function initialState () {
  return {}
}
