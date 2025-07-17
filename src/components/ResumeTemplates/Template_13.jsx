import DOMPurify from 'dompurify';
import styled from 'styled-components';

const Template_13 = ({ resumeData }) => {
  return (
    <StyledPage $resumelineheight={resumeData.resumelineheight}>
      <AccentBar $accent={resumeData.theme?.background} />
      <Header $accent={resumeData.theme?.background}>
        <FullName $accent={resumeData.theme?.heading}>{resumeData.firstname} {resumeData.lastname}</FullName>
        <h2>{resumeData.jobtitle}</h2>
      </Header>

      <GridBody>
        <Sidebar>
          <Section>
            {resumeData.phone || resumeData.email || resumeData.linkedin || resumeData.github || resumeData.website && (
              <SectionTitle $heading={resumeData.theme?.heading}>Contact</SectionTitle>
            )}
            <ContactList>
              {resumeData.phone && <li>{resumeData.phone}</li>}
              {resumeData.email && <li>{resumeData.email}</li>}
              {resumeData.linkedin && <li><a href={`https://${resumeData.linkedin}`}>{resumeData.linkedin.replace(/^https?:\/\//, '')}</a></li>}
              {resumeData.github && <li><a href={`https://${resumeData.github}`}>{resumeData.github.replace(/^https?:\/\//, '')}</a></li>}
              {resumeData.website && <li><a href={`https://${resumeData.website}`}>{resumeData.website.replace(/^https?:\/\//, '')}</a></li>}
            </ContactList>
          </Section>

          {resumeData.profile && (
            <Section>
              <SectionTitle $heading={resumeData.theme?.heading}>Profile</SectionTitle>
              <Text dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(resumeData.profile) }} />
            </Section>
          )}

          {resumeData.skills?.length > 0 && (
            <Section>
              <SectionTitle $heading={resumeData.theme?.heading}>{resumeData.sectionnames?.skills || 'Skills'}</SectionTitle>
              <SkillWrap>
                {resumeData.skills.map((skill, i) => (
                  <FancySkill key={i}>{skill}</FancySkill>
                ))}
              </SkillWrap>
            </Section>
          )}

          {resumeData.customsections?.length > 0 && resumeData.customsections.map((section, idx) => (
            section.type === "simple" && (
              <Section key={idx}>
                <SectionTitle $heading={resumeData.theme?.heading}>{section.title}</SectionTitle>
                <SkillWrap>
                  {Object.entries(section.items).map(([key, val]) => (
                    <FancySkill key={key}>{val}</FancySkill>
                  ))}
                </SkillWrap>
              </Section>
            )
          ))}
        </Sidebar>

        <Timeline>
          {resumeData.experience?.length > 0 && (
            <TimelineSection>
              <TimelineTitle $heading={resumeData.theme?.heading}>{resumeData.sectionnames?.experience || 'Experience'}</TimelineTitle>
              {resumeData.experience.map((exp, i) => (
                <TimelineItem key={i}>
                  <Dot $accent={resumeData.theme?.heading} />
                  <ContentBox>
                    <h4>{exp.position}</h4>
                    <HeadingAndDate>
                      <i>{exp.company}</i>
                      <span>{exp.startdate} - {exp.enddate}</span>
                    </HeadingAndDate>
                    <Text dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(exp.description) }} />
                  </ContentBox>
                </TimelineItem>
              ))}
            </TimelineSection>
          )}

          {resumeData.education?.length > 0 && (
            <TimelineSection>
              <TimelineTitle $heading={resumeData.theme?.heading}>{resumeData.sectionnames?.education || 'Education'}</TimelineTitle>
              {resumeData.education.map((edu, i) => (
                <TimelineItem key={i}>
                  <Dot $accent={resumeData.theme?.heading} />
                  <ContentBox>
                    <h4>{edu.degree}{edu.field && ` in ${edu.field}`}</h4>
                    <i>{edu.institution}</i>
                    <HeadingAndDate>
                      <span>{edu.startdate} - {edu.enddate}</span>
                      {edu.score && <small>Score: {edu.score}</small>}
                    </HeadingAndDate>
                  </ContentBox>
                </TimelineItem>
              ))}
            </TimelineSection>
          )}

          {resumeData.projects?.length > 0 && (
            <TimelineSection>
              <TimelineTitle $heading={resumeData.theme?.heading}>{resumeData.sectionnames?.projects || 'Projects'}</TimelineTitle>
              {resumeData.projects.map((proj, i) => (
                <TimelineItem key={i}>
                  <Dot $accent={resumeData.theme?.heading} />
                  <ContentBox>
                    <HeadingAndDate>
                      <h4>{proj.name}</h4>
                      {proj.github && <a href={`https://${proj.github}`} target="_blank" rel="noopener noreferrer"><i className="fa-solid fa-square-arrow-up-right"></i></a>}
                    </HeadingAndDate>
                    <Text dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(proj.description) }} />
                    {proj.techStack?.length > 0 && <small>Tech: {proj.techStack.join(', ')}</small>}
                  </ContentBox>
                </TimelineItem>
              ))}
            </TimelineSection>
          )}

          {resumeData.customsections?.length > 0 && resumeData.customsections.map((section, idx) => (
            section.type === "detailed" && (
              <TimelineSection key={idx}>
                <TimelineTitle $heading={resumeData.theme?.heading}>{section.title}</TimelineTitle>
                {Object.entries(section.items).map(([key, item]) => (
                  <TimelineItem key={key}>
                    <Dot $accent={resumeData.theme?.heading} />
                    <ContentBox>
                      <HeadingAndDate>
                        {item.title && <h4>{item.title}</h4>}
                        {item.link && (
                          <a href={`https://${item.link}`} target="_blank" rel="noopener noreferrer"><i className="fa-solid fa-square-arrow-up-right"></i></a>
                        )}
                      </HeadingAndDate>
                      {item.date && <i>{item.date}</i>}
                      {item.description && <Text dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(item.description) }} />}
                    </ContentBox>
                  </TimelineItem>
                ))}
              </TimelineSection>
            )
          ))}
        </Timeline>
      </GridBody>
    </StyledPage>
  );
};

export default Template_13;

const StyledPage = styled.div`
  width: 210mm;
  height: 297mm;
  background: #fdfdfd;
  color: #1a1a1a;
  font-family: 'Raleway', sans-serif;
  padding: 40px;
  line-height: ${props => props.$resumelineheight || '1.6'};
  position: relative;
`;

const HeadingAndDate = styled.div`
  display: flex;
  padding-right: 30px;
  margin: 0;
  justify-content: space-between;
`;

const FullName = styled.h1`
  font-size: 28px;
  margin: 0;
  font-family: 'Lato';
  display: flex;
  flex-direction: column;
  text-transform: uppercase;
  color: ${props => props.$accent || '#000'};
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


const AccentBar = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: 8px;
  height: 100%;
  background: ${props => props.$accent || '#000'};
`;

const Header = styled.header`
  padding-left: 20px;
  margin-bottom: 40px;

  h2 {
    font-size: 16px;
    font-weight: 500;
    color: #555;
    margin-top: 4px;
  }
`;

const GridBody = styled.div`
  display: grid;
  grid-template-columns: 220px 1fr;
  gap: 30px;
`;

const Sidebar = styled.div`
  display: flex;
  flex-direction: column;
  gap: 25px;
`;

const Section = styled.div``;

const SectionTitle = styled.h3`
  font-size: 13px;
  color: ${props => props.$heading || '#000'};
  margin-bottom: 6px;
  font-weight: 600;
  letter-spacing: 0.5px;
`;

const ContactList = styled.ul`
  list-style: none;
  padding: 0;
  font-size: 11px;
  li { margin-bottom: 5px; }
  a {
    color: #333;
    text-decoration: none;
  }
`;

const SkillWrap = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const FancySkill = styled.span`
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 10px;
  font-weight: 500;
`;

const Timeline = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

const TimelineSection = styled.div`
margin: 0;
`;

const TimelineTitle = styled.h3`
  font-size: 14px;
  color: ${props => props.$heading || '#000'};
  text-transform: uppercase;
  margin-bottom: 5px;
`;

const TimelineItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 15px;
  margin-bottom: 5px;
`;

const Dot = styled.div`
  width: 1px;
  height: 10px;
  background: ${props => props.$accent || '#000'};
  border-radius: 50%;
  margin-top: 5px;
`;

const ContentBox = styled.div`
  h4 {
    margin: 0;
    font-size: 13px;
    font-weight: 600;
  }
  i, span, small, a {
    font-size: 10px;
    color: #666;
    margin-top: 2px;
    display: block;
  }
`;
