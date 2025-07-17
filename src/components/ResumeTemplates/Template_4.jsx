import DOMPurify from 'dompurify';
import styled from 'styled-components';

const Template_4 = ({ resumeData }) => {
  const hasVisibleText = (html) => {
    if (!html) return false;
    const div = document.createElement("div");
    div.innerHTML = html;
    return div.textContent.trim().length > 0;
  };

  return (
    <Container $resumelineheight={resumeData.resumelineheight}>
      <LeftColumn>
        <Header>
          <Name $heading={resumeData.theme?.heading}>
            {resumeData.firstname} {resumeData.lastname}
          </Name>
          {resumeData.jobtitle && <Title>{resumeData.jobtitle}</Title>}

          <ContactBlock>
            {resumeData.phone || resumeData.email || resumeData.linkedin || resumeData.github || resumeData.website && (
              <SectionTitle $heading={resumeData.theme?.heading}>Contact</SectionTitle>
            )}
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
          </ContactBlock>
        </Header>

        {resumeData.education?.length > 0 && (
          <Section>
            <SectionTitle $heading={resumeData.theme?.heading}>{resumeData.sectionnames?.education}</SectionTitle>
            {resumeData.education.map((edu, index) => (
              <Item key={index}>
                <SubHeading>{edu.degree}{edu.field && ` in ${edu.field}`}</SubHeading>
                <SubTitle>{edu.institution}</SubTitle>
                <SmallText>{edu.startdate} - {edu.enddate} {edu.score && `| Score: ${edu.score}`}</SmallText>
              </Item>
            ))}
          </Section>
        )}

        {resumeData.skills?.length > 0 && (
          <Section>
            <SectionTitle $heading={resumeData.theme?.heading}>{resumeData.sectionnames?.skills}</SectionTitle>
            <SkillGrid>
              {resumeData.skills.map((skill, idx) => (
                <SkillItem key={idx}>{skill}</SkillItem>
              ))}
            </SkillGrid>
          </Section>
        )}

        {resumeData.customsections?.length > 0 && resumeData.customsections.map((section, idx) => (
          section.type === "simple" && (
            <Section key={idx}>
              <SectionTitle $heading={resumeData.theme?.heading}>{section.title}</SectionTitle>
              <SkillsList>
                {Object.entries(section.items).map(([key, val]) => <li key={key}>{val}</li>)}
              </SkillsList>
            </Section>
          )
        ))}
      </LeftColumn>

      <RightColumn>
        {hasVisibleText(resumeData.profile) && (
          <Section>
            <SectionTitle $heading={resumeData.theme?.heading}>Profile</SectionTitle>
            <Paragraph dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(resumeData.profile) }} />
          </Section>
        )}

        {resumeData.experience?.length > 0 && (
          <Section>
            <SectionTitle $heading={resumeData.theme?.heading}>{resumeData.sectionnames?.experience}</SectionTitle>
            {resumeData.experience.map((exp, index) => (
              <Item key={index}>
                <SubHeading>{exp.position} - {exp.company}</SubHeading>
                <SmallText>{exp.startdate} - {exp.enddate}</SmallText>
                <Paragraph dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(exp.description) }} />
              </Item>
            ))}
          </Section>
        )}

        {resumeData.projects?.length > 0 && (
          <Section>
            <SectionTitle $heading={resumeData.theme?.heading}>{resumeData.sectionnames?.projects}</SectionTitle>
            {resumeData.projects.map((proj, index) => (
              <Item key={index}>
                {proj.name && (
                  <SubHeading>{proj.name} {proj.github && (
                    <ProjectLink href={`https://${proj.github}`} target="_blank" rel="noopener noreferrer">
                      | Link
                    </ProjectLink>
                  )}</SubHeading>
                )}
                {
                  proj.description && (
                    <Paragraph dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(proj.description) }} />
                  )
                }
                {proj.techStack?.length > 0 && <SmallText><strong>Tech Stack:</strong> {proj.techStack.join(', ')}</SmallText>}
              </Item>
            ))}
          </Section>
        )}
        {resumeData.customsections?.map((section, index) => (
          section.type !== "simple" && (
            <Section key={index}>
              <SectionTitle $heading={resumeData.theme?.heading}>{section.title}</SectionTitle>
              {section.type === "detailed" && Object.entries(section.items).map(([key, item]) => (
                <div key={key}>
                  {item.title && <SubHeading>{item.title} {item.link && (
                    <ProjectLink href={`https://${item.link}`} target="_blank" rel="noopener noreferrer">
                      | Link
                    </ProjectLink>
                  )}</SubHeading>}
                  {item.date && <SmallText>{item.date}</SmallText>}
                  {
                    item.description && (
                      <Paragraph dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(item.description) }} />
                    )
                  }
                </div>
              ))}
            </Section>
          )
        ))}
      </RightColumn>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  width: 210mm;
  height: 297mm;
  box-sizing: border-box;
  padding: 20px;
  margin: 0;
  font-family: 'Poppins', sans-serif;
  line-height: ${props => props.$resumelineheight || 1.5};
`;


const ContactItem = styled.p`
  font-size: 13px;
  margin: 0;
  a {
    color: #000;
    text-decoration: none;
  }
`;

const Meta = styled.p`
  font-size: 12px;
  color: #555;
  margin: 0;
`;

const SubTitle = styled.p`
  font-size: 13px;
  color: #666;
  margin: 0;
`;

const LeftColumn = styled.div`
  width: 35%;
  padding: 5px;
  margin: 0;
  border-right: 1px solid #ccc;
`;

const RightColumn = styled.div`
  width: 65%;
  margin: 0;
  padding: 25px;
`;

const SkillsList = styled.ul`
  margin: 0;
  list-style: square;
  padding-left: 20px;
`;

const Header = styled.header`
  margin: 0;
  margin-bottom: 12px;
`;

const Name = styled.h1`
  font-size: 24px;
  margin: 0;
  text-align: center;
  font-family: "Poppins";
  font-weight: 300;
  text-transform: uppercase;
  color: ${props => props.$heading || '#000'};
`;

const Title = styled.h2`
  font-size: 14px;
  color: #666;
  text-align: center;
  margin: 0;
  margin: 2px 0;
  margin-bottom: 15px;
`;

const ContactBlock = styled.div`
  font-size: 12px;
  margin: 0;
  margin: 10px 0;
`;

const Section = styled.section`
margin: 0;
  margin-bottom: 10px;
`;

const SectionTitle = styled.h3`
  font-size: 13px;
  color: ${props => props.$heading || '#222'};
  border-bottom: 1px solid #ddd;
  text-transform: uppercase;
  margin: 0;
`;

const SubHeading = styled.h4`
  font-size: 13px;
  font-weight: 600;
  margin: 0;
`;

const Paragraph = styled.div`
  font-size: 13px;
  color: #333;
  * {
    margin: 0;
  }
    ul, ol{
    padding-left: 30px;
  }
`;

const Item = styled.div`
margin: 0;
  margin-bottom: 8px;
`;

const SkillGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 4px 10px;
  margin: 0;
  font-size: 12px;
`;

const SkillItem = styled.div`
margin: 0;
  padding: 2px 0;
`;

const ProjectLink = styled.a`
  font-size: 11px;
  margin: 0;
  margin-left: 6px;
  text-decoration: none;
`;

const SmallText = styled.p`
  font-size: 11px;
  color: #666;
  margin: 0;
  margin: 2px 0;
`;

export default Template_4;
