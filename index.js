var ipfsAPI = require('ipfs-api');
var ipfs = ipfsAPI('localhost', '5001', {protocol: 'http'});
const topic = 'general';

const Blinkt = require('blinktjs');
const blinkt = new Blinkt();

const receiveMsg = (msg) => {
        console.log(msg.data.toString());

        if(msg.data.toString() == "on") {
                blinkt.setAll(0, 0, 255);
                blinkt.draw();
                console.log('blue');
        }

        else if (msg.data.toString() == "off") {
                blinkt.setAll(0, 0, 0);
                blinkt.draw();
                console.log('off');
        }
}

ipfs.pubsub.subscribe(topic, receiveMsg);

}
