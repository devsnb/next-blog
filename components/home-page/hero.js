import Image from 'next/image'

import styles from './hero.module.css'

const Hero = () => {
	return (
		<section className={styles.hero}>
			<div className={styles.image}>
				<Image
					src='/images/site/person.jpg'
					alt='An image showing Max'
					width={400}
					height={400}
				/>
			</div>
			<h1>Hi I'm Snehangshu</h1>
			<p>
				I blog about web development - especially frontend framework like React
				and Vue
			</p>
		</section>
	)
}

export default Hero
