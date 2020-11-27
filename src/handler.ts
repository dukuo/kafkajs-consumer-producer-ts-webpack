import { Kafka } from 'kafkajs'

const kafka = new Kafka({
    clientId: 'my-app',
    brokers: ['192.168.64.6:31090', '192.168.64.6:31091', '192.168.64.6:31092']
  })
  
  const producer = kafka.producer()
  const consumer = kafka.consumer({ groupId: 'test-group' })
  
  const run = async () => {
    // Producing
    await producer.connect()
    await producer.send({
      topic: 'rooms',
      messages: [
        { value: 'Hello KafkaJS user!' },
      ],
    })
  
    // Consuming
    await consumer.connect()
    await consumer.subscribe({ topic: 'test-topic', fromBeginning: true })
  
    await consumer.run({
      eachMessage: async ({ partition, message }) => {
        console.log({
          partition,
          offset: message.offset,
          value: message.value.toString(),
        })
      },
    })
  }
  
  run().catch(console.error)