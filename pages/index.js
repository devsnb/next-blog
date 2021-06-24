import Head from 'next/head'
import Hero from '../components/home-page/hero'
import FeaturedPosts from '../components/home-page/featured-posts'
import { getFeaturedPosts } from '../lib/posts-util'

const HomePage = (props) => {
	const { posts } = props
	return (
		<>
			<Head>
				<title>NextJS Blog</title>
				<meta
					name='description'
					content='I post about programming and web development in general'
				/>
			</Head>
			<Hero />
			<FeaturedPosts posts={posts} />
		</>
	)
}

export async function getStaticProps() {
	const featuredPosts = getFeaturedPosts()

	return {
		props: {
			posts: featuredPosts
		},
		revalidate: 60
	}
}

export default HomePage
