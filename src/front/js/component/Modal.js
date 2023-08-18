import React, { useContext } from 'react';
import { Context } from '../store/appContext';

const Modal = () => {
    const { store, actions } = useContext(Context);

    // prevents modal from showing on load
    if (!store.showModal) return null;

    const handleClose = () => {
        actions.closeModal();
    };

    return (
        <div className="modal" tabIndex="-1" role="dialog" style={{ display: "block" }}>
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Error</h5>
                        <button type="button" className="btn-close" data-dismiss="modal" aria-label="Close" onClick={handleClose}>
                        </button>
                    </div>
                    <div className="modal-body">
                        <p>You must fill in all the fields</p>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-danger" data-dismiss="modal" onClick={handleClose}>
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Modal;