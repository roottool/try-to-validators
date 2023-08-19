/** @type {import('eslint').ESLint.ConfigData['env']} */
const env = {
	browser: true,
	es6: true,
}

/** @type {import('eslint').ESLint.ConfigData} */
const config = {
	env,
	root: true,
	extends: ['next/core-web-vitals'],
}

module.exports = config
