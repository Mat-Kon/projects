import './styles/main.scss';
import view from './view/view';
import app from './app/app';
import { checkServerAvailability } from './app/api/api-methods';

checkServerAvailability();
view();
app();
