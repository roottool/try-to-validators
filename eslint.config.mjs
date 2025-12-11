import eslint from '@eslint/js'
import { defineConfig } from 'eslint/config'
import nextVitals from 'eslint-config-next/core-web-vitals'

export default defineConfig(
	{
		ignores: ['pnpm-lock.yaml', 'public'],
	},
	eslint.configs.recommended,
	...nextVitals,
)
