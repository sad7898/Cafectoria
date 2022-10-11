import React, { useState, useEffect, useRef } from "react"
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai"
import styled, { keyframes, css } from "styled-components"

interface LikeButtonProps {
  onClick: () => void
  isLiked?: boolean
}
const LikeButtonContainer = styled.div`
  cursor: pointer;
`
const gelatine = keyframes`
from, to { transform: scale(1, 1); }
25% { transform: scale(0.9, 1.1); }
50% { transform: scale(1.1, 0.9); }
75% { transform: scale(0.95, 1.05); }
`
const animation = css`
  ${gelatine} 0.5s forwards;
`
const LikeIcon = styled(AiFillHeart)<{ isAnimate: boolean }>`
  animation: ${(props) => (props.isAnimate ? animation : "")};
`
export const LikeButton: React.FC<LikeButtonProps> = ({ onClick, isLiked = false }) => {
  const [triggerBounce, setTriggerBounce] = useState(false)
  const isFirstRender = useRef(true)
  useEffect(() => {
    if (!isFirstRender.current) {
      setTriggerBounce(true)
    } else isFirstRender.current = false
  }, [isLiked])
  return (
    <LikeButtonContainer onClick={onClick}>
      <LikeIcon color={isLiked ? "red" : "white"} size={30} isAnimate={triggerBounce} onAnimationEnd={() => setTriggerBounce(false)} />
    </LikeButtonContainer>
  )
}
