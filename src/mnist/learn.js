const mnistData = require('./mnist100.json');
const networkData = require('./network.json');
const fs = require('fs');
const { Architect, Trainer, Network } = require('synaptic');

const IN = 28 * 28;
const OUT = 10;
// const mnistNetwork = new Architect.Perceptron(IN, 256, OUT);
const mnistNetwork = Network.fromJSON(networkData);
const trainer = new Trainer(mnistNetwork);
console.log('begin training...', mnistData.length);

trainer.train(mnistData, {
  rate: .1,
  iterations: 15,
  // error: .005,
  shuffle: true,
  log: 1,
  // cost: Trainer.cost.CROSS_ENTROPY
});

fs.writeFileSync('network.json', JSON.stringify(mnistNetwork.toJSON()));
console.log('saving network10 to file..');