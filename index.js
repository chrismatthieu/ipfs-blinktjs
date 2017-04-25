'use strict'

const Blinkt = require('blinktjs');
const blinkt = new Blinkt();

const os = require('os')
const path = require('path')
const series = require('async/series')
const IPFS = require('ipfs')
const topic = "octo:general"

const node = new IPFS({
  repo: path.join(os.tmpdir() + '/' + new Date().toString()),
  init: {
    emptyRepo: true,
    bits: 2048
  },
  start: true,
  EXPERIMENTAL: {
    pubsub: true
  }
})

node.on('ready', () => {
  console.log("IPFS Ready...")
  node.pubsub.subscribe(topic, receiveMsg)
})

const receiveMsg = (msg) => {
    console.log(msg.data.toString());

    if(msg.data.toString() == "on") {
      // setTimeout(function(){
        blinkt.setAll(0, 0, 255);
        blinkt.draw();
        console.log('blue');
      // }, 5000)
    }

    else if (msg.data.toString() == "off") {
      blinkt.setAll(0, 0, 0);
      blinkt.draw();
      console.log('off');
    }
}
