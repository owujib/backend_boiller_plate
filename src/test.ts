import path from 'path'
import { Kernel } from './kernel'

new Kernel({
  controllersPath: path.join(__dirname, 'controllers'),
  routesPath: path.join(__dirname, 'routes'),
}).app.listen(3000, () => {
  console.log('lol')
})