import DOMPurify from 'dompurify';
import styled from 'styled-components';

const Template_7 = ({ resumeData }) => {
  const hasVisibleText = (html) => {
    if (!html) return false;
    const div = document.createElement("div");
    div.innerHTML = html;
    return div.textContent.trim().length > 0;
  };

  return (
    <Container $resumelineheight={resumeData.resumelineheight}>
      <Header>
        <FullName $heading={resumeData.theme?.heading}>{resumeData.firstname} {resumeData.lastname}</FullName>
        {resumeData.jobtitle && <JobTitle>{resumeData.jobtitle}</JobTitle>}
        <ContactBlock>
          {resumeData.phone && (
            <ContactItem> {resumeData.phone}</ContactItem>
          )}
          {resumeData.email && (
            <ContactItem> {resumeData.email}</ContactItem>
          )}

          {resumeData.linkedin && (() => {
            const fullUrl = resumeData.linkedin.startsWith("http")
              ? resumeData.linkedin
              : `https://${resumeData.linkedin}`;
            const displayText = fullUrl.replace(/^https?:\/\//, "");

            return (
              <ContactItem>
                <a href={fullUrl} target="_blank" rel="noopener noreferrer">
                  {displayText}
                </a>
              </ContactItem>
            );
          })()}

          {resumeData.github && (() => {
            const fullUrl = resumeData.github.startsWith("http")
              ? resumeData.github
              : `https://${resumeData.github}`;
            const displayText = fullUrl.replace(/^https?:\/\//, "");

            return (
              <ContactItem>
                <a href={fullUrl} target="_blank" rel="noopener noreferrer">
                  {displayText}
                </a>
              </ContactItem>
            );
          })()}

          {resumeData.website && (() => {
            const fullUrl = resumeData.website.startsWith("http")
              ? resumeData.website
              : `https://${resumeData.website}`;
            const displayText = fullUrl.replace(/^https?:\/\//, "");

            return (
              <ContactItem>
                <a href={fullUrl} target="_blank" rel="noopener noreferrer">
                  {displayText}
                </a>
              </ContactItem>
            );
          })()}
        </ContactBlock>
      </Header>

      <Main>
        {hasVisibleText(resumeData.profile) && (
          <Section>
            <Heading $heading={resumeData.theme?.heading}>Profile</Heading>
            <Text dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(resumeData.profile) }} />
          </Section>
        )}

        {resumeData.experience?.length > 0 && (
          <Section>
            <Heading $heading={resumeData.theme?.heading}>{resumeData.sectionnames?.experience}</Heading>
            {resumeData.experience.map((exp, i) => (
              <Block key={i}>
                <HeadingAndDate>
                  <Sub>{exp.position} - {exp.company}</Sub>
                  <Meta>{exp.startdate} - {exp.enddate}</Meta>
                </HeadingAndDate>
                <Text dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(exp.description) }} />
              </Block>
            ))}
          </Section>
        )}

        {resumeData.education?.length > 0 && (
          <Section>
            <Heading $heading={resumeData.theme?.heading}>{resumeData.sectionnames?.education}</Heading>
            {resumeData.education.map((edu, i) => (
              <Block key={i}>
                <Sub>{edu.degree}{edu.field && ` in ${edu.field}`}</Sub>
                <HeadingAndDate>
                  {edu.institution && (<SubTitle>{edu.institution}</SubTitle>)}
                  <Meta>{edu.startdate} - {edu.enddate} {edu.score && `| Score: ${edu.score}`}</Meta>
                </HeadingAndDate>
              </Block>
            ))}
          </Section>
        )}

        {resumeData.skills?.length > 0 && (
          <Section>
            <Heading $heading={resumeData.theme?.heading}>{resumeData.sectionnames?.skills}</Heading>
            <InlineList $background={resumeData.theme?.background}>
              {resumeData.skills.map((skill, i) => <li key={i}>{skill}</li>)}
            </InlineList>
          </Section>
        )}

        {resumeData.projects?.length > 0 && (
          <Section>
            <Heading $heading={resumeData.theme?.heading}>{resumeData.sectionnames?.projects}</Heading>
            {resumeData.projects.map((proj, i) => (
              <Block key={i}>
                {proj.name && (
                  <Sub>{proj.name} {proj.github && (
                    <Link href={`https://${proj.github}`} target="_blank" rel="noopener noreferrer">
                      [ Link ]
                    </Link>
                  )}</Sub>
                )}
                {
                  proj.description && (
                    <Text dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(proj.description) }} />
                  )
                }
                {proj.techStack?.length > 0 && <Meta><strong>Tech Stack:</strong> {proj.techStack.join(', ')}</Meta>}
              </Block>
            ))}
          </Section>
        )}

        {resumeData.customsections?.length > 0 && resumeData.customsections.map((section, i) => (
          <Section key={i}>
            <Heading $heading={resumeData.theme?.heading}>{section.title}</Heading>
            {section.type === "simple" && (
              <InlineList $background={resumeData.theme?.background}>
                {Object.entries(section.items).map(([key, val]) => <li key={key}>{val}</li>)}
              </InlineList>
            )}
            {section.type === "detailed" && Object.entries(section.items).map(([key, item]) => (
              <Block key={key}>
                <HeadingAndDate>
                  {item.title && <Sub>{item.title} {item.link && (
                    <Link href={`https://${item.link}`} target="_blank" rel="noopener noreferrer">
                      [ Link ]
                    </Link>
                  )}</Sub>}
                  <Meta>{item.date}</Meta>
                </HeadingAndDate>
                <Text dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(item.description) }} />
              </Block>
            ))}
          </Section>
        ))}
      </Main>
    </Container>
  );
};

const Container = styled.div`
  width: 210mm;
  height: 297mm;
  padding: 30px;
  box-sizing: border-box;
  font-family: Arial, sans-serif;
  font-size: 11px;
  line-height: ${props => props.$resumelineheight || 1.4};
  color: #000;
`;

const ContactItem = styled.p`
  font-size: 13px;
  margin: 0;
  a {
    color: #000;
    text-decoration: none;
  }
`;

const Link = styled.a`
  color: #1d4ed8;
  font-size: 11px;
  margin: 0;
  margin-left: 6px;
  text-decoration: none;
`;

const SubTitle = styled.p`
  font-size: 13px;
  color: #666;
  margin: 0;
`;

const Header = styled.header`
  text-align: left;
  margin-bottom: 16px;
`;

const FullName = styled.h1`
  font-size: 22px;
  margin: 0;
  color: ${props => props.$heading || '#333'};
  font-family: 'Raleway';
  text-transform: uppercase;
`;

const JobTitle = styled.h2`
  font-size: 13px;
  margin: 0 0 10px;
  color: #333;
`;

const ContactBlock = styled.div`
  font-size: 11px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const Main = styled.div``;

const Section = styled.section`
  margin-bottom: 14px;
`;

const Heading = styled.h3`
  font-size: 12px;
  font-weight: bold;
  color: ${props => props.$heading || '#333'};
  text-transform: uppercase;
  border-bottom: 1px solid #000;
  margin-bottom: 4px;
`;

const Sub = styled.h4`
  font-size: 11.5px;
  font-weight: bold;
  margin: 2px 0;
`;

const Meta = styled.p`
  font-size: 10.5px;
  color: #555;
  font-style: italic;
  margin: 2px 0;
`;

const HeadingAndDate = styled.div`
  display: flex;
  padding-right: 30px;
  justify-content: space-between;
`;

const Text = styled.div`
  font-size: 13px;
  color: #333;
  margin: 0;
  
  * {
    margin: 0;
  }
  
  ul, ol{
    padding-left: 30px;
  }
`;

const Block = styled.div`
  margin-bottom: 6px;
`;

const InlineList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  list-style: none;
  padding-left: 0;
  margin: 0;
  gap: 5px;
  
  li {
    border: 2px solid ${props => props.$background || '#f0f0f0'};
    padding: 3px 5px;
    border-radius: 3px;
    font-weight: 500;
    font-size: 12px;
  }
`;

export default Template_7;
