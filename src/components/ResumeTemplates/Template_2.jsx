import DOMPurify from 'dompurify';
import styled from 'styled-components';

const Template_2 = ({ resumeData }) => {

  const hasVisibleText = (html) => {
    if (!html) return false;
    const div = document.createElement("div");
    div.innerHTML = html;
    return div.textContent.trim().length > 0;
  };

  return (
    <Container $resumelineheight={resumeData.resumelineheight}>
      <Sidebar $background={resumeData.theme?.background}>

        {resumeData.profileimg && (
          <ProfileImage src={resumeData.profileimg} alt="Profile" />
        )}

        {(resumeData.phone || resumeData.email || resumeData.website || resumeData.linkedin || resumeData.github) && (
          <ContactInfo>
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
          </ContactInfo>
        )}

        {Array.isArray(resumeData.skills) && resumeData.skills.filter(skill => skill && skill.trim() !== '').length > 0 && (
          <>
            <SectionTitle $heading={resumeData.theme?.heading}>{resumeData.sectionnames?.skills}</SectionTitle>
            <SkillsList $style="square">
              {resumeData.skills
                .filter(skill => skill && skill.trim() !== '')
                .map((skill, index) => (
                  <Skill key={index}>{skill}</Skill>
                ))}
            </SkillsList>
          </>
        )}

        {resumeData.customsections?.length > 0 && resumeData.customsections.map((section, index) => (
          <Section key={index}>
            {section.type === "simple" && section.items && typeof section.items === 'object' && (
              <>
                <SectionTitle $heading={resumeData.theme?.heading}>{section.title}</SectionTitle>
                {/* Simple type (list of strings) */}
                {section.type === "simple" && section.items && typeof section.items === 'object' && (
                  <SkillsList $style="disc">
                    {Object.entries(section.items).map(([key, item]) => (
                      <Skill key={key}>{item}</Skill>
                    ))}
                  </SkillsList>

                )}
              </>
            )}

          </Section>
        ))}


      </Sidebar>

      <MainContent>
        <Header>
          <Name $heading={resumeData.theme?.heading}>
            <span>{resumeData.firstname}</span>
            <span>{resumeData.lastname}</span>
          </Name>
          {resumeData.jobtitle && (<Title>{resumeData.jobtitle}</Title>)}
        </Header>

        {hasVisibleText(resumeData.profile) && (
          <Section>
            <SectionTitle $heading={resumeData.theme?.heading}>Profile</SectionTitle>
            <Paragraph
              dangerouslySetInnerHTML={{ __html: resumeData.profile }}></Paragraph>
          </Section>
        )}


        {resumeData.experience?.length > 0 && (
          <Section>
            <SectionTitle $heading={resumeData.theme?.heading}>{resumeData.sectionnames?.experience}</SectionTitle>
            {resumeData.experience.map((exp, index) => (
              <ExperienceItem key={index}>
                <Position>{exp.position}</Position>
                <HeadingAndDate>

                  <Company>{exp.company}</Company>
                  <Score>{exp.startdate ? exp.startdate + " - " + exp.enddate : ""}</Score>
                </HeadingAndDate>
                {exp.description && (
                  <Paragraph
                    dangerouslySetInnerHTML={{ __html: exp.description }}></Paragraph>
                )}
              </ExperienceItem>
            ))}
          </Section>
        )}

        {resumeData.education?.length > 0 && (
          <Section>
            <SectionTitle $heading={resumeData.theme?.heading}>{resumeData.sectionnames?.education}</SectionTitle>
            {resumeData.education.map((edu, index) => (
              <EducationItem key={index}>
                <Degree>{edu.degree} {edu.field ? " in " + edu.field : ""}  </Degree>
                <School>{edu.institution}</School>
                <HeadingAndDate>
                  {edu.startdate && (
                    <>
                      <Score>
                        {edu.startdate}
                        {edu.enddate ? " - " + edu.enddate : ""}
                      </Score>
                    </>
                  )}
                  {edu.score && (
                    <Score>{edu.score}</Score>
                  )}
                </HeadingAndDate>

              </EducationItem>
            ))}
          </Section>
        )}



        {resumeData.projects?.length > 0 && (
          <Section>
            <SectionTitle $heading={resumeData.theme?.heading}>{resumeData.sectionnames?.projects}</SectionTitle>
            {resumeData.projects.map((project, index) => (
              <ProjectItem key={index}>
                {project.name && (
                  <ProjectName>{project.name} {project.github && (
                    <ProjectLink href={`https://${project.github}`} target="_blank" rel="noopener noreferrer">
                      <i className="fa-solid fa-arrow-up-right-from-square"></i>
                    </ProjectLink>
                  )}</ProjectName>
                )}

                {project.description && (
                  <Paragraph
                    dangerouslySetInnerHTML={{ __html: project.description }}></Paragraph>
                )}

                {project.techStack?.length > 0 && (
                  <TechStack>
                    <strong>Tech Stack:</strong> {project.techStack.join(', ')}
                  </TechStack>
                )}

              </ProjectItem>
            ))}
          </Section>
        )}

        {resumeData.customsections?.length > 0 && resumeData.customsections.map((section, index) => (
          <Section key={index}>

            {section.type !== "simple" && section.items && typeof section.items === 'object' && (
              <>
                <SectionTitle $heading={resumeData.theme?.heading}>{section.title}</SectionTitle>
                {/* Detailed type (object with fields) */}
              </>
            )}

            {section.type !== "simple" && section.items && typeof section.items === 'object' && Object.entries(section.items).map(([key, item]) => (
              <div key={key} style={{ marginBottom: '5px' }}>
                <HeadingAndDate>
                  {item.title && <ProjectName>{item.title} {item.link && (
                    <ProjectLink href={`https://${item.link}`} target="_blank" rel="noopener noreferrer">
                      <i className="fa-solid fa-arrow-up-right-from-square"></i>
                    </ProjectLink>
                  )}</ProjectName>}
                  {item.date && <p style={{ fontSize: '12px', margin: 0, padding: 0, color: '#666' }}>{item.date}</p>}
                </HeadingAndDate>

                {item.description && (
                  <Paragraph
                    dangerouslySetInnerHTML={{ __html: item.description }}></Paragraph>
                )}

              </div>
            ))}
          </Section>
        ))}

      </MainContent>
    </Container>
  );
};

// Styled Components
const Container = styled.div`
  display: flex;
  width: 210mm; // A4 width
  height: 297mm; // A4 height
  line-height:  ${props => props.$resumelineheight || '1.6'};
  box-sizing: border-box;
  margin: 0;
  font-family: 'Poppins', sans-serif;
`;

const Score = styled.div`
  font-size: 12px;
  font-style: italic;
  color: #666;
  margin: 0;
`;

const Sidebar = styled.div`
  width: 40%;
  margin: 0;
  background-color: ${props => props.$background || '#f4f4f4'};
  padding: 20px;
`;

const ProfileImage = styled.img`
  width: 100%;
  height: auto;
  margin: 0;
  margin-bottom: 20px;
`;

const ContactInfo = styled.div`
  margin-bottom: 15px;
`;

const ContactItem = styled.p`
  font-size: 13px;
  margin: 5px 0;
  a {
    color: #000;
    text-decoration: none;
  }
`;

const SectionTitle = styled.h2`
  font-size: 15px;
  color: ${props => props.$heading || '#333'};
  border-bottom: 1px solid #ddd;
  margin: 0;
  margin-bottom: 3px;
  text-transform: uppercase;
`;

const HeadingAndDate = styled.div`
  display: flex;
  padding-right: 30px;
  margin: 0;
  justify-content: space-between;
`;

const SkillsList = styled.ul`
  margin: 0;
  padding-left: 20px;
  list-style: ${props => props.$style};;
`;

const Skill = styled.li`
  font-size: 13px;
  margin: 0;
  margin-bottom: 3px;
`;

const MainContent = styled.div`
  width: 65%;
  padding: 5px 30px;
  margin: 0;
`;

const Header = styled.header`
  text-align: center;
  margin: 0;
  margin-bottom: 10px;
`;

const Name = styled.h1`
  font-size: 35px;
  text-transform: uppercase;
  font-weight: 400;
  margin: 0;
  margin-top: 20px;
  display: flex;
  color: ${props => props.$heading || '#00000'};
  font-family: "Poppins";
  flex-direction: column; // Ensures first name and last name appear on separate lines
  line-height: 1.1; // Adjust spacing between first and last name

  span {
    display: block;
  }
`;

const Title = styled.h2`
  font-size: 18px;
  margin: 0;
  margin-top: 10px;
  color: #666;
`;

const Section = styled.section`
margin: 0;
  margin-bottom: 5px;
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

const ExperienceItem = styled.div`
margin: 0;
`;

const Position = styled.h3`
  font-size: 13px;
  color: #333;
  margin: 0px;
`;

const Company = styled.p`
  font-size: 13px;
  color: #666;
  margin: 0;
`;

const EducationItem = styled.div`
  margin: 0;
`;

const Degree = styled.h3`
  font-size: 13px;
  color: #333;
  margin: 0;
`;

const School = styled.p`
  font-size: 13px;
  color: #666;
  margin: 0;
`;

const ProjectItem = styled.div`
  margin: 0;
`;

const ProjectName = styled.h3`
  font-size: 13px;
  color: #333;
  margin: 0;
`;

const TechStack = styled.p`
  font-size: 13px;
  color: #666;
  margin: 0;
`;

const ProjectLink = styled.a`
  font-size: 11px;
  margin: 0;
  margin-left: 6px;
  text-decoration: none;
`;

export default Template_2;
