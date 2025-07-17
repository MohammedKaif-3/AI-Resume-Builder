import DOMPurify from 'dompurify';
import styled from 'styled-components';

const Template_6 = ({ resumeData }) => {
  const hasVisibleText = (html) => {
    if (!html) return false;
    const div = document.createElement("div");
    div.innerHTML = html;
    return div.textContent.trim().length > 0;
  };

  return (
    <Container $resumelineheight={resumeData.resumelineheight}>
      <Header>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          {resumeData.profileimg && <Photo src={resumeData.profileimg} alt="Profile" />}
          <FullName $heading={resumeData.theme?.heading}>
            <span>{resumeData.firstname} {resumeData.lastname}
              {resumeData.jobtitle && <JobTitle>{resumeData.jobtitle}</JobTitle>}</span>
          </FullName>
        </div>
        <ContactBlock>
          {resumeData.phone || resumeData.email || resumeData.linkedin || resumeData.github || resumeData.website && (
            <Heading $heading={resumeData.theme?.heading}>Contact</Heading>
          )}
          {resumeData.phone && (
            <ContactItem><i className="fa-solid fa-phone" style={{ fontSize: "15px" }}></i> {resumeData.phone}</ContactItem>
          )}
          {resumeData.email && (
            <ContactItem><i className="fa-solid fa-envelope" style={{ fontSize: "15px" }}></i> {resumeData.email}</ContactItem>
          )}

          {resumeData.linkedin && (() => {
            const fullUrl = resumeData.linkedin.startsWith("http")
              ? resumeData.linkedin
              : `https://${resumeData.linkedin}`;
            const displayText = fullUrl.replace(/^https?:\/\//, "");

            return (
              <ContactItem>
                <i className="fa-brands fa-linkedin" style={{ fontSize: "15px" }}></i>{" "}
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
                <i className="fa-brands fa-github" style={{ fontSize: "15px" }}></i>{" "}
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
                <i className="fa-solid fa-globe" style={{ fontSize: "15px" }}></i>{" "}
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

        {resumeData.projects?.length > 0 && (
          <Section>
            <Heading $heading={resumeData.theme?.heading}>{resumeData.sectionnames?.projects}</Heading>
            {resumeData.projects.map((proj, i) => (
              <Block key={i}>
                {proj.name && (
                  <Sub>{proj.name} {proj.github && (
                    <Link href={`https://${proj.github}`} target="_blank" rel="noopener noreferrer">
                      [Github]
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
            <SkillList>
              {resumeData.skills.map((skill, i) => <li key={i}>{skill}</li>)}
            </SkillList>
          </Section>
        )}

        {resumeData.customsections?.length > 0 && resumeData.customsections.map((section, i) => (
          <Section key={i}>
            <Heading $heading={resumeData.theme?.heading}>{section.title}</Heading>
            {section.type === "simple" && (
              <SkillList>
                {Object.entries(section.items).map(([key, val]) => <li key={key}>{val}</li>)}
              </SkillList>
            )}
            {section.type === "detailed" && Object.entries(section.items).map(([key, item]) => (
              <Block key={key}>
                <HeadingAndDate>
                  {item.title && <Sub>{item.title} {item.link && (
                    <Link href={`https://${item.link}`} target="_blank" rel="noopener noreferrer">
                      [Link]
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
  font-family: 'Inter', sans-serif;
  line-height: ${props => props.$resumelineheight || 1.5};
  color: #222;
`;

const HeadingAndDate = styled.div`
  display: flex;
  padding-right: 30px;
  margin: 0;
  justify-content: space-between;
`;

const ContactItem = styled.p`
  font-size: 13px;
  margin: 0;
  a {
    color: #888;
    text-decoration: none;
  }
`;

const Header = styled.header`
    display: flex;
    align-items: center;
    justify-content: space-between;
  margin-bottom: 15px;
`;

const Photo = styled.img`
  width: 130px;
  height: 130px;
  border-radius: 10px;
  object-fit: cover;
  margin: 0;
  border: 2px solid #aaa;
`;


const FullName = styled.h1`
  font-size: 28px;
  margin: 0;
  margin-left: 20px;
  display: flex;
  flex-direction: column;
  text-transform: uppercase;
  color: ${props => props.$heading || '#000'};
`;

const JobTitle = styled.h2`
  font-size: 13px;
  color: #666;
  margin: 0;
`;

const ContactBlock = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0;
  color: #888;
  font-size: 11px;

  span {
    display: flex;
    align-items: center;
    gap: 6px;
  }

  i {
    min-width: 14px;
  }
`;

const Main = styled.div``;

const Section = styled.section`
  margin-bottom: 5px;
`;

const Heading = styled.h3`
  font-size: 14px;
  font-weight: 400;
  text-transform: uppercase;
  border-bottom: 1px solid #ddd;
  margin: 0;
  margin-bottom: 10px;
  color: ${props => props.$heading || '#000'};
`;

const Sub = styled.h4`
  font-size: 13px;
  margin: 0;
`;

const Meta = styled.p`
  font-size: 11px;
  color: #555;
  margin: 0;
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
  margin: 0;
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

const SkillList = styled.ul`
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

export default Template_6;