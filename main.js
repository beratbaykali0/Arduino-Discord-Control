const { Client, GatewayIntentBits } = require('discord.js');
const { SerialPort } = require('serialport')
const readline = require('readline')
require('dotenv').config()

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

async function selectPort() {
  try {
    const ports = await SerialPort.list()
    if (ports.length === 0) {
      console.log('No serial ports found.')
      rl.close()
      process.exit(1)
    }
    console.log('\nAvailable serial ports:')
    ports.forEach((p, i) => {
      console.log(`  ${i + 1}. ${p.path}${p.manufacturer ? ` - ${p.manufacturer}` : ''}${p.friendlyName ? ` (${p.friendlyName})` : ''}`)
    })
    return new Promise((resolve) => {
      rl.question('\nSelect port number: ', (answer) => {
        const index = parseInt(answer) - 1
        if (index >= 0 && index < ports.length) {
          resolve(ports[index].path)
        } else {
          console.log('Invalid selection.')
          rl.close()
          process.exit(1)
        }
      })
    })
  } catch (err) {
    console.error('Failed to list serial ports:', err.message)
    rl.close()
    process.exit(1)
  }
}

async function main() {
  const path = await selectPort()

  const port = new SerialPort({
    path,
    baudRate: 9600,
  })

  port.on('error', (err) => {
    console.error('Serial port error:', err.message)
  })

  port.on('open', () => {
    console.log(`Serial port ${path} opened.`)
  })

  const client = new Client({
    intents: [
      GatewayIntentBits.Guilds,
      GatewayIntentBits.GuildMessages,
      GatewayIntentBits.MessageContent,
      GatewayIntentBits.GuildMembers,
    ],
  })

  client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`)
  })

  client.on('messageCreate', (msg) => {
    if (msg.author.bot) return

    if (msg.content == "Blue LED Light ON") {
      msg.reply("BLUE LED is On!")
      port.write('blueledon')
    }
    if (msg.content == "Blue LED Light OFF") {
      msg.reply("BLUE LED is Off!")
      port.write('blueledoff')
    }
    if (msg.content == "Red LED Light ON") {
      msg.reply("RED LED is On!")
      port.write('redledon')
    }
    if (msg.content == "Red LED Light OFF") {
      msg.reply("RED LED is Off!")
      port.write('redledoff')
    }
    if (msg.content == "Green LED Light ON") {
      msg.reply("GREEN LED is On!")
      port.write('greenledon')
    }
    if (msg.content == "Green LED Light OFF") {
      msg.reply("GREEN LED is Off!")
      port.write('greenledoff')
    }
    if (msg.content == "Yellow LED Light ON") {
      msg.reply("YELLOW LED is On!")
      port.write('yellowledon')
    }
    if (msg.content == "Yellow LED Light OFF") {
      msg.reply("YELLOW LED is Off!")
      port.write('yellowledoff')
    }
  })

  client.on('error', (err) => {
    console.error('Discord client error:', err.message)
  })

  client.login(process.env.TOKEN)
    .catch((err) => {
      console.error('Failed to login:', err.message)
      rl.close()
      process.exit(1)
    })
}

main()
