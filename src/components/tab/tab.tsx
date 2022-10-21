import React from "react"
import styled from "styled-components"
import { StringLiteralType } from "typescript"
import { SubHeader } from "../utilities"
export interface Crumb {
  name: string
  onSelected: (crumb: Crumb) => void
}
interface TabProps {
  crumbs: Crumb[]
  selectedCrumb: Crumb
}

const BreadCrumb = styled(SubHeader)<{ isSelected?: boolean }>`
  min-width: 10rem;
  background-color: ${(props) => (props.isSelected ? "var(--green-color)" : "transparent")};
  border-top-right-radius: 5px;
  border-top-left-radius: 5px;
  transition: 0.3s;
  margin-bottom: 0px;
`
export const Tab: React.FC<TabProps> = ({ crumbs, selectedCrumb }) => {
  return (
    <div className="d-flex flex-row border-bottom border-dark mb-3">
      {crumbs.map((crumb) => (
        <>
          <BreadCrumb isSelected={selectedCrumb.name === crumb.name} className="px-4 py-2" sizeDesktop="1rem" onClick={() => crumb.onSelected(crumb)}>
            {crumb.name}
          </BreadCrumb>
        </>
      ))}
    </div>
  )
}
