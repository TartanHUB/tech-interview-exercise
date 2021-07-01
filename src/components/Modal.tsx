import React, { FunctionComponent } from 'react';
import ReactModal from 'react-modal';
import styled from 'styled-components';
import { FaTimes } from 'react-icons/fa';

import theme from '../styles/theme';

type ModalProps = {
  isOpen: boolean;
  toggleModal: () => void;
};

const CloseIcon = styled.span`
  position: absolute;
  top: ${(props) => props.theme.sizes.halfSpacer};
  right: ${(props) => props.theme.sizes.halfSpacer};
  cursor: pointer;
`;

const Modal: FunctionComponent<ModalProps> = (props) => {
  return (
    <ReactModal
      isOpen={props.isOpen}
      onRequestClose={props.toggleModal}
      shouldCloseOnOverlayClick
      shouldCloseOnEsc
      style={{
        content: {
          border: theme.mixins.baseBorderStyle,
          boxShadow: theme.mixins.baseShadowStyle,
          borderRadius: theme.sizes.borderRadius,
          maxWidth: theme.screenSizes.medium,
          margin: '0 auto',
          top: theme.sizes.doubleSpacer,
          right: theme.sizes.doubleSpacer,
          left: theme.sizes.doubleSpacer,
          bottom: 'initial',
          WebkitOverflowScrolling: 'touch',
          padding: theme.sizes.doubleSpacer,
        },
        overlay: {
          backgroundColor: 'rgba(0,0,0,.75)',
          position: 'fixed',
          height: '100%',
          overflow: 'auto',
          zIndex: 100,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'flex-start',
        },
      }}
    >
      <CloseIcon onClick={props.toggleModal}>
        <FaTimes size={theme.sizes.doubleSpacer} />
      </CloseIcon>

      {props.children}
    </ReactModal>
  );
};

export default Modal;
