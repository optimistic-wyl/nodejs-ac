import blowup from './blowup'

const install = function(Vue) {
  Vue.directive('blowup', blowup)
}

if (window.Vue) {
  window.blowup = blowup
    Vue.use(install); // eslint-disable-line
}

blowup.install = install
export default blowup
