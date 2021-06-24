import { MongoClient } from 'mongodb'

const handler = async (req, res) => {
	if (req.method === 'POST') {
		const { email, name, message } = req.body

		if (
			!email ||
			!email.trim().includes('@') ||
			!name ||
			name.trim() === '' ||
			!message ||
			message.trim() === ''
		) {
			return res.status(422).json({ message: 'Invalid input' })
		}

		const newMessage = {
			email,
			name,
			message
		}

		const dbURL = `mongodb+srv://${process.env.mongodb_username}:${process.env.mongodb_password}@${process.env.mongodb_clustername}.m7ekl.mongodb.net/${process.env.mongodb_database}?retryWrites=true`

		let client

		try {
			client = await MongoClient.connect(dbURL, {
				useUnifiedTopology: true,
				useNewUrlParser: true
			})
		} catch (error) {
			res.status(500).json({ message: 'Could not connect to database' })
			return
		}

		const db = client.db()

		try {
			const result = await db.collection('messages').insertOne(newMessage)
			newMessage.id = result.insertedId
		} catch (error) {
			client.close()
			return res.status(500).json({ message: 'Storing message failed' })
		}
		client.close()

		return res
			.status(201)
			.json({ message: 'Successfully stored message', newMessage })
	}
}

export default handler
