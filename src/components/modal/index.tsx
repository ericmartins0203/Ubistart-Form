import styles from './modal.module.css'

interface ModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  children: React.ReactNode
}

export default function Modal ({isOpen, setIsOpen, children}: ModalProps) {


  const handleModal = () => {
    setIsOpen(!isOpen);
  }

  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={handleModal}>
      <div onClick={(e) => e.stopPropagation()}>{children}</div>
    </div>
  );
}