import DOMPurify from 'dompurify';
import styled from 'styled-components';

const Template_9 = ({ resumeData }) => {
  const hasVisibleText = (html) => {
    if (!html) return false;
    const div = document.createElement("div");
    div.innerHTML = html;
    return div.textContent.trim().length > 0;
  };

  return (
    <Container $resumelineheight={resumeData.resumelineheight}>
      <Header $background={resumeData.theme?.background}>
        <NameArea>
          <FullName $heading={resumeData.theme?.heading}>{resumeData.firstname} {resumeData.lastname}</FullName>
          {resumeData.jobtitle && <JobTitle>{resumeData.jobtitle}</JobTitle>}
        </NameArea>
        <Contact>
          {resumeData.phone && (
            <ContactItem><strong>Phone: </strong> {resumeData.phone}</ContactItem>
          )}
          {resumeData.email && (
            <ContactItem><strong>Email: </strong> {resumeData.email}</ContactItem>
          )}
          {resumeData.linkedin && (() => {
            const fullUrl = resumeData.linkedin.startsWith("http")
              ? resumeData.linkedin
              : `https://${resumeData.linkedin}`;
            const displayText = fullUrl.replace(/^https?:\/\//, "");

            return (
              <ContactItem>
                <strong>LinkedIn: </strong>
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
                <strong>Github: </strong>
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
                <strong>Website: </strong>
                <a href={fullUrl} target="_blank" rel="noopener noreferrer">
                  {displayText}
                </a>
              </ContactItem>
            );
          })()}
        </Contact>
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

        {resumeData.projects?.length > 0 && (
          <Section>
            <Heading $heading={resumeData.theme?.heading}>{resumeData.sectionnames?.projects}</Heading>
            {resumeData.projects.map((proj, i) => (
              <Block key={i}>
                {proj.name && (
                  <Sub>{proj.name} {proj.github && (
                    <Link href={`https://${proj.github}`} target="_blank" rel="noopener noreferrer">
                      | LINK
                    </Link>
                  )}</Sub>
                )}
                <Text dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(proj.description) }} />
                {proj.techStack?.length > 0 && <Meta>Tech Stack: {proj.techStack.join(', ')}</Meta>}
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
                  <SubTitle>{edu.institution}</SubTitle>
                  <Meta>{edu.startdate} - {edu.enddate} {edu.score && `| Score: ${edu.score}`}</Meta>
                </HeadingAndDate>
              </Block>
            ))}
          </Section>
        )}

        {resumeData.skills?.length > 0 && (
          <Section>
            <Heading $heading={resumeData.theme?.heading}>{resumeData.sectionnames?.skills}</Heading>
            <SkillFlex>
              {resumeData.skills.map((skill, i) => <SkillPill key={i}>{skill}</SkillPill>)}
            </SkillFlex>
          </Section>
        )}

        {resumeData.customsections?.length > 0 && resumeData.customsections.map((section, i) => (
          <Section key={i}>
            <Heading $heading={resumeData.theme?.heading}>{section.title}</Heading>
            {section.type === "simple" && (
              <SkillFlex>
                {Object.entries(section.items).map(([key, val]) => <SkillPill key={key}>{val}</SkillPill>)}
              </SkillFlex>
            )}
            {section.type === "detailed" && Object.entries(section.items).map(([key, item]) => (
              <Block key={key}>
                <HeadingAndDate>
                  {item.title && <Sub>{item.title} {item.link && (
                    <Link href={`https://${item.link}`} target="_blank" rel="noopener noreferrer">
                      | LINK
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
  line-height:  ${props => props.$resumelineheight || '1.6'};
  padding: 28px;
  font-family: 'Roboto', sans-serif;
  font-size: 11.5px;
  color: #222;
  margin: 0;
  box-sizing: border-box;
`;

const ContactItem = styled.p`
  font-size: 13px;
  margin: 0;
  a {
    color: #333;
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

const Header = styled.header`
  margin-bottom: 24px;
  background-color: ${props => props.$background || '#ddd'};;
  border-radius: 10px;
  text-align: center;
  padding: 20px;
  padding-bottom: 8px;
`;

const SubTitle = styled.p`
  font-size: 13px;
  color: #666;
  margin: 0;
`;

const NameArea = styled.div`
  display: flex;
  flex-direction: column;
`;

const FullName = styled.h1`
  font-size: 24px;
  margin: 0;
  color: ${props => props.$heading || '#222'};
  font-weight: 700;
  text-transform: uppercase;
`;

const JobTitle = styled.h2`
  font-size: 13px;
  font-weight: 500;
`;

const Contact = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px 14px;
  font-size: 11px;
  margin: 0;
  margin-top: 12px;

  span {
    display: flex;
    align-items: center;
    gap: 6px;
  }
`;

const Main = styled.div``;

const Section = styled.section`
margin: 0;
  margin-bottom: 15px;
`;

const Heading = styled.h3`
  font-size: 13px;
  font-weight: 600;
  color: ${props => props.$heading || '#222'};
  border-left: 5px solid ${props => props.$heading || '#222'};
  padding-left: 8px;
  margin: 0;
  margin-bottom: 8px;
  text-transform: uppercase;
`;

const Sub = styled.h4`
  font-size: 12px;
  font-weight: 600;
  margin: 0;
`;

const Meta = styled.p`
  font-size: 10.5px;
  color: #555;
  font-style: italic;
  margin: 1px 0 3px;
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

const HeadingAndDate = styled.div`
  display: flex;
  padding-right: 30px;
  margin: 0;
  justify-content: space-between;
`;

const Block = styled.div`
margin: 0;
  margin-bottom: 10px;
`;

const SkillFlex = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px 10px;
  margin: 0;
  margin-top: 6px;
`;

const SkillPill = styled.span`
  display: flex;
  flex-wrap: wrap;
  list-style: none;
  padding-left: 0;
  margin: 0;
  gap: 10px;

  li {
    background: ${props => props.$background || '#4a148c'};
    padding: 5px 10px;
    border-radius: 3px;
    font-weight: 500;
    font-size: 12px;
  }
`;

export default Template_9;
