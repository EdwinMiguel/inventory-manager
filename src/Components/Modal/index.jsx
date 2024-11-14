import ReactDOM from 'react-dom'

const Modal = ({children}) => {
  return ReactDOM.createPortal(
    <div className="Modal">
      {children}
    </div>,
    document.getElementById('modal')
  )
}

export default Modal