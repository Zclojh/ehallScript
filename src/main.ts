import { createApp } from 'vue'
import './global.css'
import App from './App.vue'
import 'remixicon/fonts/remixicon.css'
const rlApp = createApp(App)
rlApp.mount(
  (() => {
    const app = document.createElement('div')
    app.classList.add('rl-container')
    const messageDiv = document.createElement('div')
    messageDiv.classList.add('rl-message')
    document.body.append(app)
    document.body.append(messageDiv)
    return app
  })()
)
