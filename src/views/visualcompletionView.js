class VisualcompletionView {
  _parentElement = document.querySelector('.visualcompletion')

  addHandlerLoadingBarEnter() {
    this._parentElement.classList.remove('hidden');
    setTimeout(() => {
      this._parentElement.style.transform = 'scaleX(1)';
    }, 10);
  }

  addHandlerLoadingDone() {
    this._parentElement.classList.add('hidden');
    this._parentElement.style.transform = 'scaleX(0)';
  }
}

export default new VisualcompletionView();