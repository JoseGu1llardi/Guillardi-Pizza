import Modal from 'react-modal';

import { FiX } from 'react-icons/fi';

import styles from './styles.module.scss';

import { OrderItemProps } from '../../pages/dashboard';

interface ModalOrderProps {
    isOpen: boolean;
    onRequestClose: () => void;
    order: OrderItemProps[];
    handleFinishOrder: (order_id: string) => void;
}

export function ModalOrder({ isOpen, onRequestClose, order, handleFinishOrder }: ModalOrderProps) {
    const customStyle = {
        content: {
            top: '50%',
            bottom: 'auto',
            left: '50%',
            right: 'auto',
            padding: '30px',
            transform: 'translate(-50%, -50%)',
            backgroundColor: '#1D1D2E'
        }
    };

    return (
        <Modal
            isOpen
            onRequestClose={onRequestClose}
            style={customStyle}
        >
            <button
                type="button"
                onClick={onRequestClose}
                className='react-modal-close'
                style={{ background: 'transparent', border: 0 }}
            >
                <FiX size={45} color='#F34748' />
            </button>

            <div className={styles.container}>
                <h2>Order Details</h2>

                <span className={styles.table}>
                    Table: <strong>{order[0].order.table}</strong>
                </span>

                {
                    order.map(item => (
                        <section key={item.id} className={styles.containerItem}>
                            <span>{item.amount} - <strong>{item.product.name}</strong></span>
                            <span className={styles.description}>{item.product.description}</span>
                        </section>
                    ))
                }

                <button className={styles.btnOrder} onClick={() => handleFinishOrder(order[0].order_id)}>
                    Complete order
                </button>

            </div>

        </Modal>
    )
}