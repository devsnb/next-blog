import { useState, useEffect } from 'react'
import styles from './contact-form.module.css'

import Notification from '../ui/notification'

const sendContactData = async (contactDetails) => {
	const response = await fetch('/api/contact', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(contactDetails)
	})

	const data = await response.json()

	if (!response.ok) {
		throw new Error(data.message || 'Something went wrong')
	}
}

const ContactForm = () => {
	const [enteredEmail, setEnteredEmail] = useState('')
	const [enteredName, setEnteredName] = useState('')
	const [enteredMessage, setEnteredMessage] = useState(' ')
	const [requestStatus, setRequestStatus] = useState()
	const [requestError, setRequestError] = useState()

	useEffect(() => {
		if (requestStatus === 'success' || requestStatus === 'error') {
			const timer = setTimeout(() => {
				setRequestStatus(null)
				setRequestError(null)
			}, 3000)

			return () => {
				clearTimeout(timer)
			}
		}
	}, [requestStatus])

	const submitFormHandler = async (event) => {
		event.preventDefault()

		setRequestStatus('pending')

		try {
			await sendContactData({
				email: enteredEmail,
				name: enteredName,
				message: enteredMessage
			})
			setRequestStatus('success')
			setEnteredEmail('')
			setEnteredName('')
			setEnteredMessage('')
		} catch (error) {
			setRequestError(error.message)
			setRequestStatus('error')
		}
	}

	let notification
	if (requestStatus === 'pending') {
		notification = {
			status: 'pending',
			title: 'Sending message',
			message: "Your message is on it's way"
		}
	}
	if (requestStatus === 'success') {
		notification = {
			status: 'success',
			title: 'Success!',
			message: 'Message sent successfully'
		}
	}
	if (requestStatus === 'error') {
		notification = {
			status: 'error',
			title: 'Error!',
			message: requestError
		}
	}

	return (
		<section className={styles.contact}>
			<h1>How can I help You?</h1>
			<form onSubmit={submitFormHandler} className={styles.form}>
				<div className={styles.controls}>
					<div className={styles.control}>
						<label htmlFor='email'>Your Email:</label>
						<input
							value={enteredEmail}
							onChange={(e) => setEnteredEmail(e.target.value)}
							type='email'
							name='email'
							id='email'
							required
						/>
					</div>
					<div className={styles.control}>
						<label htmlFor='name'>Your Name:</label>
						<input
							value={enteredName}
							onChange={(e) => setEnteredName(e.target.value)}
							type='text'
							name='name'
							id='name'
							required
						/>
					</div>
				</div>
				<div className={styles.control}>
					<label htmlFor='message'>Your Message:</label>
					<textarea
						value={enteredMessage}
						onChange={(e) => setEnteredMessage(e.target.value)}
						name='message'
						id='message'
						rows='5'
						required
					></textarea>
				</div>
				<div className={styles.actions}>
					<button type='submit'>Send Message</button>
				</div>
			</form>
			{notification && (
				<Notification
					status={notification.status}
					title={notification.title}
					message={notification.message}
				/>
			)}
		</section>
	)
}

export default ContactForm
