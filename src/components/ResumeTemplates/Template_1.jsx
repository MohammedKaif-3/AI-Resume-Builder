import DOMPurify from 'dompurify';
import styled from 'styled-components';

const Template_1 = ({ resumeData }) => {
  const hasVisibleText = (html) => {
    if (!html) return false;
    const div = document.createElement("div");
    div.innerHTML = html;
    return div.textContent.trim().length > 0;
  };

  return (
    <Container $resumelineheight={resumeData.resumelineheight}>
      <Header>
        <Name $heading={resumeData.theme?.heading}>
          {resumeData.firstname} {resumeData.lastname}
        </Name>
        {resumeData.jobtitle && <Title>{resumeData.jobtitle}</Title>}

        <ContactLine>
          {resumeData.phone && (
            <ContactItem>{resumeData.phone}</ContactItem>
          )}
          {resumeData.email && (
            <ContactItem>{resumeData.email}</ContactItem>
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

        </ContactLine>
      </Header>

      {hasVisibleText(resumeData.profile) && (
        <Section>
          <SectionTitle $heading={resumeData.theme?.heading}>Profile Summary</SectionTitle>
          <Paragraph dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(resumeData.profile) }} />
        </Section>
      )}

      {resumeData.experience?.length > 0 && (
        <Section>
          <SectionTitle $heading={resumeData.theme?.heading}>{resumeData.sectionnames?.experience}</SectionTitle>
          {resumeData.experience.map((exp, index) => (
            <Item key={index}>
              <HeadingAndDate>
                <SubHeading>{exp.position} - {exp.company}</SubHeading>
                <Date>{exp.startdate} - {exp.enddate}</Date>
              </HeadingAndDate>
              <Paragraph dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(exp.description) }} />
            </Item>
          ))}
        </Section>
      )}

      {resumeData.education?.length > 0 && (
        <Section>
          <SectionTitle $heading={resumeData.theme?.heading}>{resumeData.sectionnames?.education}</SectionTitle>
          {resumeData.education.map((edu, index) => (
            <Item key={index}>
              <SubHeading>{edu.degree}{edu.field ? ` in ${edu.field}` : ''} </SubHeading>
              <HeadingAndDate>
                <SubHeading style={{ fontSize: '12px', color: '#888' }}>{edu.institution} </SubHeading>
                <Date>{edu.startdate} - {edu.enddate}</Date>
              </HeadingAndDate>
              <Date>{edu.score && `Score: ${edu.score}`}</Date>
            </Item>
          ))}
        </Section>
      )}

      {resumeData.skills?.length > 0 && (
        <Section>
          <SectionTitle $heading={resumeData.theme?.heading}>{resumeData.sectionnames?.skills}</SectionTitle>
          <SkillList $background={resumeData.theme?.background}>
            {resumeData.skills.map((skill, idx) => (
              <Skill key={idx}>{skill}</Skill>
            ))}
          </SkillList>
        </Section>
      )}

      {resumeData.projects?.length > 0 && (
        <Section>
          <SectionTitle $heading={resumeData.theme?.heading}>{resumeData.sectionnames?.projects}</SectionTitle>
          {resumeData.projects.map((proj, index) => (
            <Item key={index}>
              <SubHeading>
                {proj.name && (
                  <ProjectName>{proj.name} {proj.github && (
                    <ProjectLink href={`https://${proj.github}`} target="_blank" rel="noopener noreferrer">
                      [Link]
                    </ProjectLink>
                  )}</ProjectName>
                )}
              </SubHeading>
              {
                proj.description && (
                  <Paragraph dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(proj.description) }} />
                )
              }
              <TechStack>{proj.techStack?.length > 0 && <small><strong>Tech Stack:</strong> {proj.techStack.join(', ')}</small>}</TechStack>
            </Item>
          ))}
        </Section>
      )}

      {resumeData.customsections?.length > 0 && resumeData.customsections.map((section, idx) => (
        <Section key={idx}>
          <SectionTitle $heading={resumeData.theme?.heading}>{section.title}</SectionTitle>

          {section.type === "simple" && (
            <SkillList $background={resumeData.theme?.background}>
              {Object.entries(section.items).map(([key, val]) => <li key={key}>{val}</li>)}
            </SkillList>
          )}

          {section.type === "detailed" && (
            Object.entries(section.items).map(([key, item]) => (
              <Item key={key}>
                <HeadingAndDate>
                  {item.title && <SubHeading>{item.title} {item.link && (
                    <ProjectLink href={`https://${item.link}`} target="_blank" rel="noopener noreferrer">
                      [Link]
                    </ProjectLink>
                  )}</SubHeading>}
                  <Date>{item.date}</Date>
                </HeadingAndDate>
                <Paragraph dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(item.description) }} />
              </Item>
            ))
          )}
        </Section>
      ))}

    </Container>
  );
};

const Container = styled.div`
  width: 210mm;
  height: 297mm; 
  padding: 25px;
  font-family: 'Poppins', sans-serif;
  line-height: ${props => props.$resumelineheight || 1.5};
  box-sizing: border-box;
  margin: 0;
`;

const Skill = styled.li`
  font-size: 13px;
  margin: 0;
  padding: 5px 10px;
`;

const ProjectName = styled.p`
  font-size: 13px;
  font-weight: 600;
  color: #333;
  margin: 0;
`;

const Header = styled.header`
  text-align: center;
  margin: 0;
  margin-bottom: 10px;
`;

const HeadingAndDate = styled.div`
  display: flex;
  padding-right: 30px;
  margin: 0;
  justify-content: space-between;
`;

const Name = styled.h1`
  font-size: 32px;
  text-transform: uppercase;
  margin: 0;
  color: ${props => props.$heading || '#222'};
`;

const Title = styled.h2`
  font-size: 18px;
  color: #666;
  margin: 0;
`;

const ContactLine = styled.div`
  font-size: 13px;
  color: #444;
  margin: 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const Section = styled.section`
margin: 0;
  margin-bottom: 5px;
`;

const SectionTitle = styled.h2`
  font-size: 18px;
  color: ${props => props.$heading || '#333'};
  border-bottom: 1px solid #ddd;
  margin: 0;
  margin-bottom: 3px;
  text-transform: uppercase;
`;

const ContactItem = styled.p`
  font-size: 13px;
  margin: 0;
  margin-right: 10px;
  a {
    color: #333;
    text-decoration: none;
  }
`;

const SubHeading = styled.h4`
  font-size: 14px;
  font-weight: 500;
  color: #222;
  margin: 0;
`;

const Date = styled.p`
  font-size: 12px;
  margin: 0;
  color: #777;
`;

const TechStack = styled.p`
  font-size: 13px;
  color: #666;
  margin: 0;
`;

const Paragraph = styled.div`
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

const SkillList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  list-style: none;
  padding-left: 0;
  margin: 0;
  gap: 10px;

  li {
    background: ${props => props.$background || '#f0f0f0'};
    padding: 5px 10px;
    border-radius: 3px;
    font-weight: 500;
    font-size: 12px;
  }
`;


const Item = styled.div`
margin: 0; 
  margin-bottom: 5px;
`;

const ProjectLink = styled.a`
  font-size: 13px;
  margin: 0;
  margin-left: 8px;
  text-decoration: none;
  color: #0262A9;
`;

export default Template_1;
