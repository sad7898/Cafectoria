import { Row, Col } from "react-bootstrap"
import { Wrapper } from "../../components/containers"
import { Header, SubHeader } from "../../components/utilities"
import { IntroContent } from "./introContent"

import Icon from "../../images/foodIcon.svg"
import Watch from "../../images/stopwatch.svg"
import Click from "../../images/click-here.svg"

const IntroText = () => {
  return (
    <>
      <Wrapper mg="10px auto 10px auto">
        <Wrapper mg="0 0 20px 0">
          <SubHeader className="text-center" sizeMobile="1.75rem" sizeDesktop="2rem" color="var(--grey-color)">
            Explore and share recipes
          </SubHeader>
          <SubHeader className="text-center" sizeMobile="1.4rem" sizeDesktop="1.5rem" color="var(--grey-color)">
            Fry, Bake, Roast
          </SubHeader>
        </Wrapper>
        <Row>
          <Col></Col>
        </Row>
        <Row>
          <Col xs={12} md={4} className="mb-4">
            <IntroContent imgSrc={Icon}>
              <Header sizeMobile="1.25rem" sizeDesktop="1.3rem">
                Good food, good life
              </Header>
              <SubHeader sizeDesktop="1rem">Delicious food makes you brighter.</SubHeader>
            </IntroContent>
          </Col>
          <Col xs={12} md={4} className="mb-4">
            <IntroContent imgSrc={Watch}>
              <Header sizeMobile="1.25rem" sizeDesktop="1.3rem">
                Lightning Speed
              </Header>
              <SubHeader sizeDesktop="1rem">Say goodbye to standing in queue.</SubHeader>
            </IntroContent>
          </Col>
          <Col xs={12} md={4} className="mb-4">
            <IntroContent imgSrc={Click}>
              <Header sizeMobile="1.25rem" sizeDesktop="1.3rem">
                Simple
              </Header>
              <SubHeader sizeDesktop="1rem">It's made for everyone!</SubHeader>
            </IntroContent>
          </Col>
        </Row>
        <Row></Row>
      </Wrapper>
    </>
  )
}
export default IntroText
