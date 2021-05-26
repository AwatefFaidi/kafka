const { Kafka } = require('kafkajs')
const Chance = require('chance');

 
const kafka = new Kafka({
  clientId: 'my-producer',
  brokers: ["localhost:9092"]
})
 
const producer = kafka.producer()
const topic='animals'
// Instantiate Chance so it can be used
const chance = new Chance();
const produceMessage=async()=>
{   const value=chance.animal()
  console.log(value);
    try {
      await producer.send({
          topic,
          messages: [{ value }],
        })
    }catch(error)
    {
      console.log(error)
    }
}
const run = async () => {
  // Producing
  await producer.connect()
 /* await producer.send({
    topic: 'test-topic',
    messages: [
      { value: 'Hello KafkaJS user!' },
    ],
  })*/
 

 setInterval(produceMessage, 1000)
  
}
 
run().catch(console.error)