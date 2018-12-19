//  Styles
import './sass/main.sass'
//  js
import React from 'react'
import ReactDOM from 'react-dom'
import AppRouter from './js/Router'
//  Assets
require('./favicon.ico')
//  Welcome
console.log(
	'\nWelcome :) \nPlease feel free to poke around.  \n%cPackage manager: NPM \nBuild tool: Webpack \nJS: React \nStyles: SASS/StyledComponents ',
	'color: #3EE6B2',
	'\nPlease dont hesitate to ask me any questions you might have. \n-kruyerl\n '
)
//  Inject App into Root
const el = document.getElementById('Root')
ReactDOM.render(<AppRouter />, el)
