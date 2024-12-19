import typography from '@tailwindcss/typography';

/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		extend: {
			colors: {
				// base : https://coolors.co/ffbe0b-fb5607-ff006e-8338ec-3a86ff
				amber: {
					DEFAULT: '#ffbe0b',
					100: '#352700',
					200: '#6a4e00',
					300: '#9f7500',
					400: '#d49c00',
					500: '#ffbe0b',
					600: '#ffcb3b',
					700: '#ffd86c',
					800: '#ffe59d',
					900: '#fff2ce'
				},
				orange: {
					DEFAULT: '#fb5607',
					100: '#331101',
					200: '#662202',
					300: '#9a3202',
					400: '#cd4303',
					500: '#fb5607',
					600: '#fc773a',
					700: '#fd996b',
					800: '#febb9d',
					900: '#feddce'
				},
				rose: {
					DEFAULT: '#ff006e',
					100: '#330016',
					200: '#66002c',
					300: '#990042',
					400: '#cc0058',
					500: '#ff006e',
					600: '#ff338b',
					700: '#ff66a8',
					800: '#ff99c5',
					900: '#ffcce2'
				},
				blue_violet: {
					DEFAULT: '#8338ec',
					100: '#190535',
					200: '#320a6a',
					300: '#4b0fa0',
					400: '#6414d5',
					500: '#8338ec',
					600: '#9b5ef0',
					700: '#b487f4',
					800: '#cdaff8',
					900: '#e6d7fb'
				},
				azure: {
					DEFAULT: '#3a86ff',
					100: '#00183e',
					200: '#00307c',
					300: '#0048bb',
					400: '#005ff9',
					500: '#3a86ff',
					600: '#609dff',
					700: '#88b5ff',
					800: '#afceff',
					900: '#d7e6ff'
				},
				emerald: {
					DEFAULT: '#06d6a0',
					100: '#012b20',
					200: '#02563f',
					300: '#03805f',
					400: '#04ab7f',
					500: '#06d6a0',
					600: '#1cf9be',
					700: '#55fbce',
					800: '#8efcdf',
					900: '#c6feef'
				},
				red: {
					DEFAULT: '#f72c25',
					100: '#370402',
					200: '#6e0804',
					300: '#a50b06',
					400: '#dc0f08',
					500: '#f72c25',
					600: '#f95752',
					700: '#fa817d',
					800: '#fcaba8',
					900: '#fdd5d4'
				},
				sgbus_green: {
					DEFAULT: '#07dd05',
					100: '#022c01',
					200: '#035802',
					300: '#058403',
					400: '#06b004',
					500: '#07dd05',
					600: '#23fa1f',
					700: '#5afc57',
					800: '#91fd8f',
					900: '#c8fec7'
				},
				forest_green: {
					DEFAULT: '#248232',
					100: '#071a0a',
					200: '#0e3514',
					300: '#164f1e',
					400: '#1d6a28',
					500: '#248232',
					600: '#33ba47',
					700: '#5ed370',
					800: '#94e29f',
					900: '#c9f0cf'
				}
			}
		}
	},

	plugins: [typography]
};
