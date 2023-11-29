
import MapComponent from './MapComponent';

const ModalComponent = ({ isOpen, onClose, latitude, longitude }) => {
  return (
    <div className={`modal ${isOpen ? 'is-open' : ''}`}>
      <div className="modal-content">
        <span className="close-btn" onClick={onClose}>
          &times;
        </span>
        <h2>hi</h2>
        <MapComponent latitude={latitude} longitude={longitude} />
      </div>
    </div>
  );
};

export default ModalComponent;
