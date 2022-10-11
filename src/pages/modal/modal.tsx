import * as React from "react"
import { Button } from "react-bootstrap"
import styled from "styled-components"
import { Backdrop } from "../../components/utilities"
export interface ModalProps {
  isOpen: boolean
  children?: React.ReactNode
  onClose: () => void
  onSubmit?: () => void
  submitMessage?: string
  closeOnClickBackdrop?: boolean
}
const ModalBox = styled.div.attrs({
  className: "px-4 py-3 flex-column d-flex",
})<{ in: boolean }>`
  position: relative;
  min-width: 250px;
  background-color: white;
  border-radius: 10px;
  z-index: 2000;
  margin: auto;
`
export const Modal = ({ isOpen, onClose, onSubmit, submitMessage, children, closeOnClickBackdrop = true }: ModalProps) => {
  if (!isOpen) return <span></span>
  return (
    <Backdrop in={isOpen} onClick={closeOnClickBackdrop ? onClose : () => null} style={{ left: 0, justifyContent: "center", alignItems: "center" }}>
      <ModalBox in={isOpen}>
        {children}
        <div>
          <br />
          <div className={`d-flex justify-content-${onSubmit ? "around" : "start"} pt-1`}>
            {onSubmit && <Button onClick={onSubmit}>{submitMessage || "Submit"}</Button>}
            <Button onClick={onClose} variant="danger">
              Close
            </Button>
          </div>
        </div>
      </ModalBox>
    </Backdrop>
  )
}
