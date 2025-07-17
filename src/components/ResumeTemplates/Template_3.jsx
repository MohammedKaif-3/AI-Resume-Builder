import DOMPurify from 'dompurify';
import styled from 'styled-components';

const Template_3 = ({ resumeData }) => {
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
        </Header>

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
                <ItemTitle>{exp.position}</ItemTitle>
                <HeadingAndDate>
                  <SubTitle>{exp.company}</SubTitle>
                  <Meta>{exp.startdate} - {exp.enddate}</Meta>
                </HeadingAndDate>
                {exp.description && <Paragraph dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(exp.description) }} />}
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
                  <ItemTitle>{proj.name} {proj.github && (
                    <ProjectLink href={`https://${proj.github}`} target="_blank" rel="noopener noreferrer">
                      <i className="fa-solid fa-link"></i>
                    </ProjectLink>
                  )}</ItemTitle>
                )}
                {proj.description && <Paragraph dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(proj.description) }} />}
                {proj.techStack?.length > 0 && (
                  <Meta><strong>Tech Stack:</strong> {proj.techStack.join(', ')}</Meta>
                )}
              </Item>
            ))}
          </Section>
        )}

        {resumeData.customsections?.map((section, index) => (
          section.type !== "simple" && (
            <Section key={index}>
              <SectionTitle $heading={resumeData.theme?.heading}>{section.title}</SectionTitle>
              {Object.entries(section.items || {}).map(([key, item]) => (
                <Item key={key}>
                  {item.title && <ItemTitle>{item.title} {item.link && (
                    <ProjectLink href={`https://${item.link}`} target="_blank" rel="noopener noreferrer">
                      <i className="fa-solid fa-link"></i>
                    </ProjectLink>
                  )}</ItemTitle>}
                  {item.date && <Meta>{item.date}</Meta>}
                  {item.description && <Paragraph dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(item.description) }} />}
                </Item>
              ))}
            </Section>
          )
        ))}
      </LeftColumn>

      <RightColumn $background={resumeData.theme?.background}>

        {(resumeData.phone || resumeData.email || resumeData.website || resumeData.linkedin || resumeData.github) && (
          <Section>
            <SectionTitle $heading={resumeData.theme?.heading}>Contact</SectionTitle>
            {resumeData.phone && (
              <ContactItem><i className="fa-solid fa-phone" style={{ fontSize: "16px" }}></i> {resumeData.phone}</ContactItem>
            )}
            {resumeData.email && (
              <ContactItem><i className="fa-solid fa-envelope" style={{ fontSize: "16px" }}></i> {resumeData.email}</ContactItem>
            )}

            {resumeData.linkedin && (() => {
              const fullUrl = resumeData.linkedin.startsWith("http")
                ? resumeData.linkedin
                : `https://${resumeData.linkedin}`;
              const displayText = fullUrl.replace(/^https?:\/\//, "");

              return (
                <ContactItem>
                  <i className="fa-brands fa-linkedin" style={{ fontSize: "16px" }}></i>{" "}
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
                  <i className="fa-brands fa-github" style={{ fontSize: "16px" }}></i>{" "}
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
                  <i className="fa-solid fa-globe" style={{ fontSize: "16px" }}></i>{" "}
                  <a href={fullUrl} target="_blank" rel="noopener noreferrer">
                    {displayText}
                  </a>
                </ContactItem>
              );
            })()}
          </Section>
        )}

        {resumeData.education?.length > 0 && (
          <Section>
            <SectionTitle $heading={resumeData.theme?.heading}>{resumeData.sectionnames?.education}</SectionTitle>
            {resumeData.education.map((edu, index) => (
              <Item key={index}>
                <ItemTitle>{edu.degree}{edu.field && ` in ${edu.field}`}</ItemTitle>
                <SubTitle>{edu.institution}</SubTitle>
                <Meta>{edu.startdate} - {edu.enddate}</Meta>
                {edu.score && <Meta>Score: {edu.score}</Meta>}
              </Item>
            ))}
          </Section>
        )}

        {resumeData.skills?.length > 0 && (
          <Section>
            <SectionTitle $heading={resumeData.theme?.heading}>{resumeData.sectionnames?.skills}</SectionTitle>
            <SkillsList>
              {resumeData.skills.map((skill, i) => (
                <Skill key={i}>{skill}</Skill>
              ))}
            </SkillsList>
          </Section>
        )}

        {resumeData.customsections?.map((section, index) => (
          section.type === "simple" && (
            <Section key={index}>
              <SectionTitle $heading={resumeData.theme?.heading}>{section.title}</SectionTitle>
              <SkillsList>
                {Object.entries(section.items || {}).map(([key, val]) => (
                  <Skill key={key}>{val}</Skill>
                ))}
              </SkillsList>
            </Section>
          )
        ))}
      </RightColumn>
    </Container>
  );
};

// Styled Components
const Container = styled.div`
  display: flex;
  width: 210mm;
  height: 297mm;
  box-sizing: border-box;
  font-family: Arial, sans-serif;
  line-height: ${props => props.$resumelineheight || 1.5};
`;

const LeftColumn = styled.div`
  width: 65%;
  padding: 20px 30px;
`;

const RightColumn = styled.div`
  width: 35%;
  padding: 30px 20px;
  background-color: ${props => props.$background || '#f4f4f4'};
`;

const Header = styled.div`
  margin: 0;
  margin-bottom: 15px;
`;

const Name = styled.h1`
  font-size: 32px;
  text-align: center;
  font-family: calibri;
  text-transform: uppercase;
  font-weight: 600;
  color: ${props => props.$heading || '#333'};
  margin: 0;
`;

const Title = styled.h2`
  font-size: 18px;
  text-align: center;
  color: #666;
  margin: 0;
`;

const ContactItem = styled.p`
  font-size: 13px;
  margin: 8px 0;
  a {
    color: #333;
    text-decoration: none;
  }
`;

const Section = styled.section`
  margin: 0;
  margin-bottom: 5px;
`;

const SectionTitle = styled.h3`
  font-size: 15px;
  color: ${props => props.$heading || '#333'};
  border-bottom: 1px solid #ccc;
  text-transform: uppercase;
  margin: 0;
  margin-bottom: 5px;
`;

const SkillsList = styled.ul`
  margin: 0;
  list-style: disc;
  padding-left: 20px;
`;

const Skill = styled.li`
  font-size: 13px;
  margin-bottom: 1px;
`;

const Item = styled.div`
  margin-bottom: 5px;
`;

const ItemTitle = styled.h4`
  font-size: 14px;
  margin: 0;
  color: #222;
`;

const SubTitle = styled.p`
  font-size: 13px;
  color: #666;
  margin: 0;
`;

const Meta = styled.p`
  font-size: 12px;
  color: #555;
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
const HeadingAndDate = styled.div`
  display: flex;
  padding-right: 30px;
  justify-content: space-between;
`;

const ProjectLink = styled.a`
  font-size: 12px;
  color: #0262A9;
  margin-left: 5px;
  text-decoration: none;
`;

export default Template_3;
