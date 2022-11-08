import { createApp } from 'vue'
import './global.css'
import App from './App.vue'
import Toast from './components/message/index'
const rlApp = createApp(App)
rlApp.use(Toast)
rlApp.mount(
  (() => {
    const app = document.createElement('div')
    app.classList.add('rl-container')
    document.body.append(app)
    return app
  })()
)
