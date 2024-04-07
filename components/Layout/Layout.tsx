import Head from "next/head";
import type { PropsWithChildren } from "react";
import { renderMetaTags } from "react-datocms";
import styled from "styled-components";

import type { Tag } from "../../graphql/generated";
import { PreviewModeIndicator } from "../PreviewModeIndicator";

export const Wrapper = styled.div`
  padding: 15px 15px;
  display: flex;
  flex-direction: column;
  gap: 2em;
  max-width: 1200px;
  margin: 0 auto;
`;

interface LayoutProps {
  isPreview?: boolean
  seo?: Tag[],
}
export const Layout = ({ seo = [], isPreview = false, children }: PropsWithChildren<LayoutProps>) => {
  return (
    <>
      <Head>
        {seo && renderMetaTags(seo)}
      </Head>
      <Wrapper>
        {children}
        {isPreview && <PreviewModeIndicator />}
      </Wrapper>
    </>
  );
}
