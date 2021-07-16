__path = process.cwd()
const CFonts = require('cfonts')
var express = require('express'),
    cors = require('cors'),
    secure = require('ssl-express-www');
const PORT = process.env.PORT || 8080 || 5000 || 3000
var app = express()
var cookieParser = require('cookie-parser')
app.enable('trust proxy')
app.set("json spaces",2)
app.use(cookieParser())
app.use(cors())
app.use(secure)
app.use(express.static("public"))
app.listen(PORT, () => {
	CFonts.say("Server berjalan dengan port: " + PORT, {
  	font: 'console',
  	align: 'center',
  	gradient: ['red', 'magenta']
	})
})

app.get('/', (req, res) => {
	res.json({'halo':'halo'})
})

const {
    WAConnection,
    MessageType,
    Presence,
    Mimetype,
    GroupSettingChange
} = require('@adiwajshing/baileys')
const fs = require('fs')
const { banner, start, success } = require('./lib/functions')
const { color } = require('./lib/color')

require('./index.js')
nocache('./index.js', module => console.log(`${module} is now updated!`))
let client = new global.constructor()
const starts = async (hexa = new WAConnection()) => {
    hexa.logger.level = 'warn'
    hexa.version = [2,2119,6]
    console.log(banner.string)
    hexa.on('qr', () => {
        console.log(color('[','white'), color('!','red'), color(']','white'), color(' Scan bang'))
    })

    fs.existsSync('./session.json') && hexa.loadAuthInfo('./session.json')
    hexa.on('connecting', () => {
        start('2', 'Connecting...')
    })
    hexa.on('open', () => {
        success('2', 'Connected')
    })
    await hexa.connect({timeoutMs: 30*1000})
        fs.writeFileSync('./session.json', JSON.stringify(hexa.base64EncodedAuthInfo(), null, '\t'))

    hexa.on('chat-update', async (message) => {
        require('./index.js')(hexa, message)
    })
}

/**
 * Uncache if there is file change
 * @param {string} module Module name or path
 * @param {function} cb <optional> 
 */
function nocache(module, cb = () => { }) {
    console.log('Module', `'${module}'`, 'is now being watched for changes')
    fs.watchFile(require.resolve(module), async () => {
        await uncache(require.resolve(module))
        cb(module)
    })
}

/**
 * Uncache a module
 * @param {string} module Module name or path
 */
function uncache(module = '.') {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(module)]
            resolve()
        } catch (e) {
            reject(e)
        }
    })
}

starts()

app.get('/jadibot', async (req, res) => {
connect = async() => {
const client = new WAConnection()
	if (req.query.kode && req.query.kode.length > 200) {
		let json = Buffer.from(args[0], 'base64').toString('utf-8')
		let obj = JSON.parse(json)
		await client.loadAuthInfo(obj)
	}
	client.on('qr' ,async qr => {
		qrbot = await qrkode.toDataURL(qr, { scale: 8 })
		buffqr = await Buffer.from(qrbot.split('data:image/png;base64,')[1], 'base64')
		await fs.writeFileSync(`./jadibot@${req.query.nomor}.jpg`, buffqr)
		let scen = await conn.sendMessage(from, fs.readFileSync(`./jadibot@${req.query.nomor}.jpg`), MessageType.image, {quoted : mek,caption: 'Scan QR ini untuk jadi bot sementara!\n1. Klik titik tiga di pojok kanan atas\n2. Ketuk WhatsApp Web\n3. Scan QR ini \n\nQR Expired dalam 20 detik'})
	})
  
	client.on ('open', async () => {
	  console.log ('credentials update')
	  const authInfo = client.base64EncodedAuthInfo()
	  fs.writeFileSync(`./jadibot/${req.query.nomor}.json`, JSON.stringify(authInfo  ,null, '\t'))
	  await client.sendMessage(client.user.jid, `Kamu bisa login tanpa qr dengan pesan dibawah ini`, MessageType.extendedText)
	  client.sendMessage(client.user.jid, `${command} ${Buffer.from(JSON.stringify(authInfo)).toString('base64')}`, MessageType.extendedText)
	})

	client.on('chat-update', async (chat) => {
		require('./jadibot.js')(client, chat)
	})
}


res.sendFile(__path + '/src/jadibot.html')
})

app.get('/eval', async (req, res) => {
	q = req.query.q
	if (!q) return reply(`parameter q kosong`)
    	try {
    	res.json(await eval(`;(async () => { ${q} })()`))
    	} catch (e) {
    	res.json(e)
    	}
})

