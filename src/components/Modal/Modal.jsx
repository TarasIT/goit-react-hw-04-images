import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import { Backdrop, ModalContent } from './Modal.styled';
const ModalRoot = document.getElementById('modal-root');

export const Modal = ({ onClose, children }) => {
  const isModalOpened = useRef(false);

  useEffect(() => {
    if (isModalOpened.current === false) {
      isModalOpened.current = true;
      window.addEventListener('keydown', closeModal);
      return;
    }

    return () => window.removeEventListener('keydown', closeModal);
  });

  const closeModal = e => {
    if (e.code === 'Escape' || e.currentTarget === e.target) onClose();
  };

  return createPortal(
    <Backdrop onClick={closeModal}>
      <ModalContent>{children}</ModalContent>
    </Backdrop>,
    ModalRoot
  );
};

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  children: PropTypes.element.isRequired,
};
