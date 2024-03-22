import {main as tableMain} from './templates/table/table'
import {$} from './uitls'

let $app = $('#app');

window.onload = await tableMain($app)
