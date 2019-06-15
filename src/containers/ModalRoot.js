import React from 'react';
import { connect } from 'react-redux';

/** Modal Components */
//import LoginModal from './components/LoginModal';
import EditFishModal from './EditFishModal';

/** Modal Type Constants */
import { EDIT_FISH_MODEL } from './modaltypes'; 

const MODAL_COMPONENTS = {
  EDIT_FISH_MODAL: EditFishModal,
};

const ModalContainer = (props) => {
  if (!props.modalType) {
    return null;
  }

  const SpecificModal = MODAL_COMPONENTS[props.modalType];

  return <SpecificModal />;
};

const mapStateToProps = state => {
  return {
    modalType: state.modal.modalType
  };
};

export default connect(mapStateToProps)(ModalContainer);
