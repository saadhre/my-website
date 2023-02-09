import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import styled from "styled-components";

import { opacityTransition } from "../../styles/transitions";

const Language = styled.span`
  color: var(--color-white) !important;
  background-color: var(--color-brand);
  padding: .1em .3em;
  text-decoration: none;
  text-transform: uppercase;
  border-radius: var(--border-radius);
  opacity: 0.4;
  ${opacityTransition};
  
  &.active {
    opacity: 1;
  }
`;

const Wrapper = styled.div`
  display: flex;
  column-gap: .4em;
  @media (min-width: 768px) {
    justify-content: flex-end;
  }
`;

export const LanguageSelector: React.FC = () => {
  const { locale: currentLocale, locales } = useRouter();

  return (
    <Wrapper>
      {locales?.map(locale => (
        <Link href="." key={`LocaleSelector-${locale}`} locale={locale} passHref>
          <Language className={locale === currentLocale ? 'active' : undefined}>
            {locale}
          </Language>
        </Link>
      ))}
    </Wrapper>
  )
};
