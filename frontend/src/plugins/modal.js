export const $modalWindow = content => {
  const open = () => {
    const $modal = document.createElement('div');
    $modal.classList.add('modal', 'visible', 'center-items');
    $modal.dataset.action = 'close';
    $modal.innerHTML += `
      <div class="content flex-column center-items padding-content">
        <div class="btn close center-items" data-action='close'>X</div>
        <div class="modal_title center-items">${content.title}</div>
        ${parseContent(content)}
      </div>
    `

    document.body.appendChild($modal);
    return $modal
  }

  const __popup__ = open()
  __popup__.addEventListener('click', e => {
    //e.preventDefault()
    const action = e.target.dataset.action

    if (action) {
      document.body.removeChild(__popup__)
    }
  })
}

const parseContent = content => content.elements.map(el => `<${el.type} class=${el.class || ''} id=${el.id || ''}>${el.innerHTML || ''}</${el.type}>`).join('')

/*

{
  title : 'DOAPW',
  elements : [
    {
      type : 'div',
      innerHtml : "mdaw",
      class : '',
      id : ""
    },
    {

    }
  ],
  buttons : [
    'ok',
    'close'
  ]
}

*/