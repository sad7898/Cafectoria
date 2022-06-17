import * as React from "react"
import { Button } from "react-bootstrap"
import styled from "styled-components"
import { Backdrop } from "../../components/utilities"
export interface ModalProps {
  title: string
  message: string
  isOpen: boolean
  onClose: () => void
  onSubmit?: () => void
  submitMessage?: string
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
export const Modal = ({ message,title, isOpen, onClose, onSubmit, submitMessage }: ModalProps) => {
  if (!isOpen) return <span></span>
  return (
      <Backdrop in={isOpen} onClick={onClose} style={{ left: 0,justifyContent: "center",alignItems:"center" }}>
      <ModalBox in={isOpen}>
        <div className="fs-4 font-weight-bold">
          {title}
        </div>
        <div>
        <p className="pb-1 fs-3">{message}</p>
        <br />
        <div className={`d-flex justify-content-${onSubmit ? 'around' : 'start'} pt-1`}>
          {onSubmit && <Button onClick={onSubmit}>{submitMessage || "Submit"}</Button>}
          <Button onClick={onClose} variant="danger" >Close</Button>
        </div>
        </div>
      </ModalBox>
        </Backdrop>
  )
}
