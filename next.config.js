const { PHASE_DEVELOPMENT_SERVER } = require('next/constants')

module.exports = (phase) => {
	if (phase === PHASE_DEVELOPMENT_SERVER) {
		return {
			env: {
				mongodb_username: 'devsnb',
				mongodb_password: 'cDvJPvU2URYM8oF2',
				mongodb_clustername: 'cluster0',
				mongodb_database: 'my-blog-dev'
			}
		}
	}

	return {
		env: {
			mongodb_username: 'devsnb',
			mongodb_password: 'cDvJPvU2URYM8oF2',
			mongodb_clustername: 'cluster0',
			mongodb_database: 'my-blog'
		}
	}
}
