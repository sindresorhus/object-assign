import { uglify } from 'rollup-plugin-uglify';

const banner = `/*
object-assign
(c) Sindre Sorhus
@license MIT
*/`;

export default [{
	input: 'src/index.js',
	output: {
		file: 'index.min.js',
		format: 'umd',
		name: 'objectAssign',
		banner: banner
	},
	plugins: [
		uglify({
			output: {
				comments: 'some'
			}
		})
	]
}];
