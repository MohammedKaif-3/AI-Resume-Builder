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
      <TopSection>
        <Header>
          {resumeData.profileimg && <ProfileImage src={resumeData.profileimg} alt="Profile" />}
          <div>
            <Name $heading={resumeData.theme?.heading}>
              {resumeData.firstname} {resumeData.lastname}
            </Name>
            {resumeData.jobtitle && <Title>{resumeData.jobtitle}</Title>}
          </div>
        </Header>
        <ContactLine>
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
        </ContactLine>
      </TopSection>

      <ContentGrid>
        <SectionBlock>
          {resumeData.skills?.length > 0 && (
            <Section>
              <SectionTitle $heading={resumeData.theme?.heading}>{resumeData.sectionnames?.skills}</SectionTitle>
              <TagCloud>
                {resumeData.skills.map((skill, idx) => (
                  <Tag $background={resumeData.theme?.background} key={idx}>{skill}</Tag>
                ))}
              </TagCloud>
            </Section>
          )}

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

          {resumeData.customsections?.length > 0 && resumeData.customsections.map((section, idx) => (
            section.type === "simple" && (
              <Section key={idx}>
                <SectionTitle $heading={resumeData.theme?.heading}>{section.title}</SectionTitle>
                <TagCloud>
                  {Object.entries(section.items).map(([key, val]) => <Tag $background={resumeData.theme?.background} key={key}>{val}</Tag>)}
                </TagCloud>
              </Section>
            )
          ))}
        </SectionBlock>

        <SectionBlock>
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
                        <i className="fa-solid fa-arrow-up-right-from-square"></i>
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

          {resumeData.customsections?.length > 0 && resumeData.customsections.map((section, idx) => (
            section.type === "detailed" && (
              <Section key={idx}>
                <SectionTitle $heading={resumeData.theme?.heading}>{section.title}</SectionTitle>
                {Object.entries(section.items).map(([key, item]) => (
                  <Item key={key}>
                    {item.title && <SubHeading>{item.title} {item.link && (
                      <ProjectLink href={`https://${item.link}`} target="_blank" rel="noopener noreferrer">
                        <i className="fa-solid fa-arrow-up-right-from-square"></i>
                      </ProjectLink>
                    )}</SubHeading>}
                    {item.date && <SmallText>{item.date}</SmallText>}
                    {
                      item.description && (
                        <Paragraph dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(item.description) }} />
                      )
                    }
                  </Item>
                ))}
              </Section>
            )
          ))}
        </SectionBlock>
      </ContentGrid>
    </Container>
  );
};

const Container = styled.div`
  width: 210mm;
  height: 297mm;
  box-sizing: border-box;
  padding: 28px;
  font-family: 'Poppins', sans-serif;
  line-height: ${props => props.$resumelineheight || 1.5};
  display: flex;
  flex-direction: column;
  margin: 0;
`;

const ContactItem = styled.p`
  font-size: 13px;
  margin: 0;
  a {
    color: #333;
    text-decoration: none;
  }
`;

const TopSection = styled.div`
margin: 0;
  margin-bottom: 10px;
`;

const Header = styled.header`
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  gap: 20px;
`;

const ProfileImage = styled.img`
  width: 130px;
  height: 130px;
  border-radius: 10px;
  object-fit: cover;
  border: 2px solid #aaa;
`;

const Name = styled.h1`
  font-size: 28px;
  margin: 0;
  text-transform: uppercase;
  color: ${props => props.$heading || '#000'};
`;

const Title = styled.h2`
  font-size: 14px;
  color: #555;
  margin: 0;
  margin: 6px 0 0 0;
`;

const ContactLine = styled.div`
  font-size: 11px;
  display: flex;
  margin: 0;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
`;

const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 1.2fr 2fr;
  margin: 0;
  gap: 32px;
`;

const SectionBlock = styled.div``;

const Section = styled.section`
margin: 0;
  margin-bottom: 15px;
`;

const SectionTitle = styled.h3`
  font-size: 13px;
  color: ${props => props.$heading || '#333'};
  margin: 0;
  margin-bottom: 3px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const SubHeading = styled.h4`
  font-size: 12px;
  font-weight: 600;
  margin: 0;
`;

const Paragraph = styled.div`
  font-size: 11px;
  color: #333;
  * {
    margin: 0;
  }
  ul, ol{
    padding-left: 30px;
  }
`;

const Item = styled.div`
  margin-bottom: 5px;
`;

const TagCloud = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin: 0;
  font-size: 11px;
`;

const Tag = styled.div`
  background: ${props => props.$background || '#dce3ea'};
  color: #222;
  margin: 0;
  padding: 4px 10px;
  font-weight: 500;
  border-radius: 5px;
`;

const ProjectLink = styled.a`
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

const SmallText = styled.p`
  font-size: 10px;
  color: #666;
  margin: 0;
`;

export default Template_6;
