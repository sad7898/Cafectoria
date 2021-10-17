import React, { useState, useEffect } from "react";
import { Wrapper } from "../../components/containers.jsx";
import { useHistory } from "react-router-dom";
import { Header, StyledTag } from "../../components/utilities.jsx";
import StyledNavLink from "../../components/nav/navLink.jsx";
import styled from "styled-components";
import AddIcon from "../../images/add.png";
const StyledWrapper = styled(Wrapper)`
  border-right: 0;
`;
function arrayIsEqual(as, bs) {
  if (as.length !== bs.length) return false;
  for (var a in as) if (!bs.includes(a)) return false;
  return true;
}
interface Filter {
  title: string;
  tags: string[];
}

const ForumHead = () => {
  const history = useHistory();
  const [filter, setFilter] = useState<Filter>({ title: "", tags: [] });
  useEffect(() => {
    setFilter((prevState) => {
      const locState: Filter = history.location.state;
      const locStateIsValid: boolean =
        !!locState && !!locState.title && !!locState.tags;
      if (locStateIsValid) {
        return {
          title: locState.title,
          tags: locState.tags,
        };
      }
      return prevState;
    });
  }, [history.location.state]);
  return (
    <Wrapper>
      <Header color="var(--black-color)" className="mb-4">
        Forum
      </Header>
      <Wrapper
        bg="#dedede"
        rborder="10px"
        pd=".3rem .25rem .3rem .25rem"
        className="d-flex flex-row justify-content-between"
      >
        <Wrapper className="d-flex flex-row" minw="250">
          <StyledWrapper width="auto">
            <StyledNavLink
              style={{ paddingBottom: "0.5rem" }}
              to="/forum/filter"
            >
              Filter
            </StyledNavLink>
            <div className="px-2">
              {filter.tags.length !== 0 || filter.title ? (
                filter.tags.map((val) => {
                  return <StyledTag key={val}>{val}</StyledTag>;
                })
              ) : (
                <StyledTag>None</StyledTag>
              )}
            </div>
          </StyledWrapper>
        </Wrapper>
        <Wrapper className="d-flex flex-column justify-content-center px-2">
          <img
            src={AddIcon}
            onClick={() => history.push("/forum/new")}
            alt="Add"
          />
        </Wrapper>
      </Wrapper>
    </Wrapper>
  );
};
export default ForumHead;
