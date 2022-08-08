// url routes
document.addEventListener('click', (e) => {
  const { target } = e;
  console.log(e);
  if(!target.matches('nav a')) {
    return;
  }
  e.preventDefault();
  urlRoute();
})

const urlRoutes = {
  404: {
    template: '/templates/404.html',
    title: '',
    description: '',
  }
}

const  urlRoute = (event) => {
  event = event || window.event;
  console.log(event);
  event.preventDefault();
  window.history.pushState({}, '', event.target.href);
  urlLocationHandler();
}

const urlLocationHandler = async () => {

}

// hash routes